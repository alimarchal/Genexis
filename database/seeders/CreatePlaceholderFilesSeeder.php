<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CreatePlaceholderFilesSeeder extends Seeder
{
    /**
     * Run the database seeds to create placeholder files.
     * This creates dummy files for all referenced files in the database seeders
     * to prevent 404 errors on download attempts.
     */
    public function run(): void
    {
        $this->command->info('Creating placeholder files for all seeded data...');

        // Create financial reports placeholder files
        $this->createFinancialReportFiles();

        // Create annual reports placeholder files
        $this->createAnnualReportFiles();

        // Create financial highlights placeholder files
        $this->createFinancialHighlightFiles();

        // Create download placeholder files
        $this->createDownloadFiles();

        // Create service placeholder images
        $this->createServiceImages();

        $this->command->info('All placeholder files created successfully!');
    }

    /**
     * Create placeholder files for financial reports
     */
    private function createFinancialReportFiles(): void
    {
        $this->command->info('Creating financial report files...');

        $years = range(2013, 2024);
        foreach ($years as $year) {
            // Q1 Reports
            $this->createPlaceholderPDF("financial-reports/q1-{$year}.pdf", "Q1 Financial Report FY{$year}");
            if ($year == 2013 || $year == 2015) {
                $this->createPlaceholderXLS("financial-reports/q1-{$year}.xls", "Q1 Financial Report FY{$year}");
            }

            // Half-yearly Reports
            if ($year == 2013) {
                $this->createPlaceholderXLS("financial-reports/half-yearly-{$year}.xls", "Half-Yearly Report FY{$year}");
            } else {
                $this->createPlaceholderPDF("financial-reports/half-yearly-{$year}.pdf", "Half-Yearly Report FY{$year}");
            }

            // Q3 Reports
            if (in_array($year, [2013, 2015, 2016])) {
                $this->createPlaceholderXLS("financial-reports/q3-{$year}.xls", "Q3 Financial Report FY{$year}");
            } else {
                $this->createPlaceholderPDF("financial-reports/q3-{$year}.pdf", "Q3 Financial Report FY{$year}");
            }

            // Annual Reports
            $this->createPlaceholderPDF("financial-reports/annual-{$year}.pdf", "Annual Financial Report FY{$year}");
        }
    }

    /**
     * Create placeholder files for annual reports
     */
    private function createAnnualReportFiles(): void
    {
        $this->command->info('Creating annual report files...');

        $years = range(2016, 2023);
        foreach ($years as $year) {
            $this->createPlaceholderPDF("annual-reports/Annual-Report-{$year}.pdf", "Annual Report FY{$year}");
        }
    }

    /**
     * Create placeholder files for financial highlights
     */
    private function createFinancialHighlightFiles(): void
    {
        $this->command->info('Creating financial highlight files...');

        $this->createPlaceholderPPTX("financial-highlights/Financial-Highlight-2022.pptx", "Financial Highlights 2022");
    }

    /**
     * Create placeholder files for downloads section
     */
    private function createDownloadFiles(): void
    {
        $this->command->info('Creating download files...');

        $downloadFiles = [
            'downloads/tendor1.pdf',
            'downloads/tender2.pdf',
            'downloads/internship1.pdf',
            'downloads/corrigendum 11-06-2024.pdf',
            'downloads/5-6-2024 tender for services.pdf',
        ];

        foreach ($downloadFiles as $file) {
            $title = pathinfo($file, PATHINFO_FILENAME);
            $this->createPlaceholderPDF($file, ucwords(str_replace(['-', '_'], ' ', $title)));
        }

        // Create the JPEG file for Chichian branch
        $this->createPlaceholderImage('downloads/chichian.jpeg', 800, 600);
    }

    /**
     * Create placeholder service images
     */
    private function createServiceImages(): void
    {
        $this->command->info('Creating service images...');

        $serviceImages = [
            'services/lockers.png',
            'services/utility-bill.png',
            'services/psc.jpg',
            'services/home-remittances.png',
        ];

        foreach ($serviceImages as $image) {
            if (str_ends_with($image, '.png')) {
                $this->createPlaceholderImage($image, 800, 600, 'png');
            } else {
                $this->createPlaceholderImage($image, 800, 600, 'jpg');
            }
        }
        
        // Create schedule of charges files
        $this->createPlaceholderPDF('schedule-of-charges/soc_from_jan_to_jun_2025.pdf', 'Schedule of Charges Jan-Jun 2025');
    }

    /**
     * Create a placeholder PDF file
     */
    private function createPlaceholderPDF(string $path, string $title): void
    {
        $fullPath = storage_path('app/public/' . $path);

        if (File::exists($fullPath)) {
            return; // Skip if file already exists
        }

        // Ensure directory exists
        File::ensureDirectoryExists(dirname($fullPath));

        // Create a simple placeholder PDF content
        $pdfContent = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R>>endobj\n4 0 obj<</Length 44>>stream\nBT /F1 12 Tf 100 700 Td ({$title}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000056 00000 n\n0000000115 00000 n\n0000000214 00000 n\ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n315\n%%EOF";

        File::put($fullPath, $pdfContent);
        $this->command->comment("Created: {$path}");
    }

    /**
     * Create a placeholder XLS file
     */
    private function createPlaceholderXLS(string $path, string $title): void
    {
        $fullPath = storage_path('app/public/' . $path);

        if (File::exists($fullPath)) {
            return;
        }

        File::ensureDirectoryExists(dirname($fullPath));

        // Simple tab-separated values that Excel can open
        $xlsContent = "{$title}\n\nFiscal Year\tQ1\tQ2\tQ3\tQ4\n2024\t1000\t1200\t1100\t1300\n";

        File::put($fullPath, $xlsContent);
        $this->command->comment("Created: {$path}");
    }

    /**
     * Create a placeholder PPTX file (actually a minimal Office Open XML structure)
     */
    private function createPlaceholderPPTX(string $path, string $title): void
    {
        $fullPath = storage_path('app/public/' . $path);

        if (File::exists($fullPath)) {
            return;
        }

        File::ensureDirectoryExists(dirname($fullPath));

        // Create a simple binary file as placeholder
        // In a real scenario, you'd create a proper PPTX structure
        $pptxContent = "PK\x03\x04"; // ZIP file header for PPTX
        $pptxContent .= str_repeat("\x00", 100); // Padding

        File::put($fullPath, $pptxContent);
        $this->command->comment("Created: {$path}");
    }

    /**
     * Create a placeholder image file
     */
    private function createPlaceholderImage(string $path, int $width = 800, int $height = 600, string $format = 'png'): void
    {
        $fullPath = storage_path('app/public/' . $path);

        if (File::exists($fullPath)) {
            return;
        }

        File::ensureDirectoryExists(dirname($fullPath));

        // Create a simple colored image
        $image = imagecreatetruecolor($width, $height);

        // Set background color (light blue)
        $bgColor = imagecolorallocate($image, 230, 240, 250);
        imagefill($image, 0, 0, $bgColor);

        // Add text
        $textColor = imagecolorallocate($image, 50, 50, 50);
        $text = basename($path, '.' . $format);
        $fontSize = 5;
        $textWidth = imagefontwidth($fontSize) * strlen($text);
        $textHeight = imagefontheight($fontSize);
        $x = ($width - $textWidth) / 2;
        $y = ($height - $textHeight) / 2;

        imagestring($image, $fontSize, $x, $y, $text, $textColor);

        // Save image
        if ($format === 'png') {
            imagepng($image, $fullPath);
        } elseif ($format === 'jpg' || $format === 'jpeg') {
            imagejpeg($image, $fullPath, 90);
        }

        imagedestroy($image);
        $this->command->comment("Created: {$path}");
    }
}
