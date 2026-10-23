<?php

namespace App\Extraction;

use RuntimeException;
use ZipArchive;

/**
 * Minimal .xlsx writer (one sheet, header row + data rows) built on ZipArchive, so no extra package is needed.
 */
class XlsxWriter
{
    /**
     * Build the file and return its path (a temporary file the caller must delete).
     *
     * @param  list<string>  $headers
     * @param  iterable<list<scalar|null>>  $rows
     */
    public function write(string $sheetName, array $headers, iterable $rows): string
    {
        $path = tempnam(sys_get_temp_dir(), 'xlsx');
        $zip = new ZipArchive;

        if ($zip->open($path, ZipArchive::OVERWRITE) !== true) {
            throw new RuntimeException('Could not create the spreadsheet.');
        }

        $zip->addFromString('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>');
        $zip->addFromString('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
        $zip->addFromString('xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="'.$this->escape($this->sheetName($sheetName)).'" sheetId="1" r:id="rId1"/></sheets></workbook>');
        $zip->addFromString('xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>');

        $sheet = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>';
        $sheet .= $this->row(1, $headers);

        $number = 2;
        foreach ($rows as $row) {
            $sheet .= $this->row($number++, $row);
        }

        $zip->addFromString('xl/worksheets/sheet1.xml', $sheet.'</sheetData></worksheet>');
        $zip->close();

        return $path;
    }

    /**
     * @param  list<scalar|null>  $values
     */
    private function row(int $number, array $values): string
    {
        $cells = '';

        foreach (array_values($values) as $index => $value) {
            $reference = $this->column($index).$number;

            if ($value === null || $value === '') {
                continue;
            }

            $cells .= is_int($value) || is_float($value)
                ? "<c r=\"{$reference}\"><v>{$value}</v></c>"
                : "<c r=\"{$reference}\" t=\"inlineStr\"><is><t xml:space=\"preserve\">".$this->escape((string) $value).'</t></is></c>';
        }

        return "<row r=\"{$number}\">{$cells}</row>";
    }

    /**
     * Spreadsheet column letters: 0 -> A, 25 -> Z, 26 -> AA.
     */
    private function column(int $index): string
    {
        $letters = '';

        for ($index++; $index > 0; $index = intdiv($index - 1, 26)) {
            $letters = chr(65 + ($index - 1) % 26).$letters;
        }

        return $letters;
    }

    private function sheetName(string $name): string
    {
        return substr(preg_replace('/[\\\\\/?*\[\]:]/', ' ', $name) ?: 'Data', 0, 31);
    }

    /**
     * XML-escape and drop characters that are not allowed in XML 1.0.
     */
    private function escape(string $value): string
    {
        return htmlspecialchars(preg_replace('/[^\x{9}\x{A}\x{D}\x{20}-\x{D7FF}\x{E000}-\x{FFFD}\x{10000}-\x{10FFFF}]/u', '', $value) ?? '', ENT_XML1 | ENT_QUOTES, 'UTF-8');
    }
}
