# Storage Files Setup

This document explains how to set up the required placeholder files for the application to work properly.

## Problem

The application seeders reference various files (PDFs, images, Excel files) that should exist in the `storage/app/public` directory. Without these files, users will encounter 404 errors when:
- Viewing financial statements
- Downloading annual reports
- Downloading financial highlights
- Downloading schedule of charges
- Viewing service images
- Accessing general downloads

## Solution

We provide two methods to create placeholder files:

### Method 1: Bash Script (Recommended)

Run the provided bash script to create all necessary placeholder files:

```bash
chmod +x create-placeholder-files.sh
./create-placeholder-files.sh
```

This will create:
- 48 financial report PDFs (2013-2024: Q1, Q2, Q3, Annual for each year)
- 7 financial report XLS files for older years
- 8 annual report PDFs (2016-2023)
- 1 financial highlights PPTX file
- 6 download PDFs (tenders, internship, corrigendum)
- 1 download image (JPEG)
- 4 service images (PNG/JPG)
- 1 schedule of charges PDF

**Total: 75 files**

### Method 2: Laravel Seeder

Alternatively, you can use the Laravel seeder approach (requires PHP and Composer):

```bash
php artisan db:seed --class=CreatePlaceholderFilesSeeder
```

## File Structure

The script creates the following directory structure:

```
storage/app/public/
├── financial-reports/
│   ├── q1-2013.pdf, q1-2014.pdf, ... q1-2024.pdf
│   ├── half-yearly-2013.pdf, ... half-yearly-2024.pdf  
│   ├── q3-2013.pdf, ... q3-2024.pdf
│   ├── annual-2013.pdf, ... annual-2024.pdf
│   └── [some .xls files for older years]
├── annual-reports/
│   └── Annual-Report-2016.pdf ... Annual-Report-2023.pdf
├── financial-highlights/
│   └── Financial-Highlight-2022.pptx
├── downloads/
│   ├── tendor1.pdf
│   ├── tender2.pdf
│   ├── internship1.pdf
│   ├── corrigendum 11-06-2024.pdf
│   ├── 5-6-2024 tender for services.pdf
│   └── chichian.jpeg
├── services/
│   ├── lockers.png
│   ├── utility-bill.png
│   ├── psc.jpg
│   └── home-remittances.png
└── schedule-of-charges/
    └── soc_from_jan_to_jun_2025.pdf
```

## Important Notes

1. **These are placeholder files** - They are minimal, valid files (PDFs, images) but contain no real content. Replace them with actual files in production.

2. **Git Ignore** - These files are excluded from Git by the `.gitignore` file in `storage/app/public/`. This is intentional to keep the repository clean.

3. **Storage Link** - Make sure to create the symbolic link from `public/storage` to `storage/app/public`:
   ```bash
   php artisan storage:link
   ```

4. **Production Setup** - In production, you should upload actual financial reports, images, and documents to replace these placeholders.

## Verification

To verify the files were created correctly:

```bash
# Count total files created
find storage/app/public -type f \( -name "*.pdf" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.xls" -o -name "*.pptx" \) | wc -l

# Should output: 75

# Verify specific file types
file storage/app/public/annual-reports/Annual-Report-2020.pdf
file storage/app/public/services/lockers.png
```

## Troubleshooting

### Files not visible in the browser

If files exist but return 404 in the browser, make sure the storage link is created:

```bash
php artisan storage:link
```

### Permission issues

If you get permission errors when creating files:

```bash
chmod -R 775 storage/app/public
chown -R www-data:www-data storage/app/public  # or your web server user
```

### Script doesn't create files

Make sure the script is executable and run it from the project root:

```bash
chmod +x create-placeholder-files.sh
./create-placeholder-files.sh
```
