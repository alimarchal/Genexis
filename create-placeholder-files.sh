#!/bin/bash

# Script to create placeholder files for development/testing
# This ensures all seeded file references have actual files to prevent 404 errors

echo "Creating placeholder files for Bank AJK application..."

# Get the directory where the script is located and go to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BASE_DIR="storage/app/public"

# Create directories
mkdir -p "$BASE_DIR/financial-reports"
mkdir -p "$BASE_DIR/annual-reports"
mkdir -p "$BASE_DIR/financial-highlights"
mkdir -p "$BASE_DIR/downloads"
mkdir -p "$BASE_DIR/services"
mkdir -p "$BASE_DIR/schedule-of-charges"

echo "Created directory structure"

# Function to create a minimal PDF
create_pdf() {
    local filepath="$1"
    local title="$2"
    
    if [ -f "$filepath" ]; then
        echo "Skipping $filepath (already exists)"
        return
    fi
    
    cat > "$filepath" << 'PDFEOF'
%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>>>>>endobj
4 0 obj<</Length 88>>stream
BT
/F1 24 Tf
50 700 Td
(Placeholder Document) Tj
0 -30 Td
/F1 12 Tf
(This is a test file) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000115 00000 n 
0000000289 00000 n 
trailer<</Size 5/Root 1 0 R>>
startxref
425
%%EOF
PDFEOF
    
    echo "Created: $filepath"
}

# Function to create a minimal image (using ImageMagick if available, otherwise create a basic file)
create_image() {
    local filepath="$1"
    local format="${2:-png}"
    
    if [ -f "$filepath" ]; then
        echo "Skipping $filepath (already exists)"
        return
    fi
    
    # Check if ImageMagick convert is available
    if command -v convert &> /dev/null; then
        convert -size 800x600 xc:lightblue \
                -gravity center \
                -pointsize 24 \
                -annotate +0+0 "$(basename "$filepath")" \
                "$filepath"
        echo "Created: $filepath (with ImageMagick)"
    else
        # Create a minimal PNG header if it's a PNG
        if [ "$format" = "png" ]; then
            # This is a 1x1 transparent PNG
            printf '\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0a\x49\x44\x41\x54\x78\x9c\x62\x00\x01\x00\x00\x05\x00\x01\x0d\x0a\x2d\xb4\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82' > "$filepath"
        else
            # For JPEG, create a minimal valid JPEG
            printf '\xff\xd8\xff\xe0\x00\x10\x4a\x46\x49\x46\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xff\xdb\x00\x43\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\x09\x09\x08\x0a\x0c\x14\x0d\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c\x20\x24\x2e\x27\x20\x22\x2c\x23\x1c\x1c\x28\x37\x29\x2c\x30\x31\x34\x34\x34\x1f\x27\x39\x3d\x38\x32\x3c\x2e\x33\x34\x32\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x14\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x09\xff\xc4\x00\x14\x10\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xda\x00\x08\x01\x01\x00\x00\x3f\x00\x7f\x80\xff\xd9' > "$filepath"
        fi
        echo "Created: $filepath (minimal binary)"
    fi
}

# Function to create XLS (actually a CSV that Excel can open)
create_xls() {
    local filepath="$1"
    
    if [ -f "$filepath" ]; then
        echo "Skipping $filepath (already exists)"
        return
    fi
    
    cat > "$filepath" << 'XLSEOF'
Fiscal Year	Q1	Q2	Q3	Q4
2024	1000	1200	1100	1300
2023	900	1100	1050	1250
XLSEOF
    
    echo "Created: $filepath"
}

# Create Financial Reports
echo ""
echo "Creating financial report files..."
for year in {2013..2024}; do
    create_pdf "$BASE_DIR/financial-reports/q1-$year.pdf" "Q1 Report $year"
    create_pdf "$BASE_DIR/financial-reports/half-yearly-$year.pdf" "Half-Yearly Report $year"
    create_pdf "$BASE_DIR/financial-reports/q3-$year.pdf" "Q3 Report $year"
    create_pdf "$BASE_DIR/financial-reports/annual-$year.pdf" "Annual Report $year"
done

# Create some XLS files for years that need them
for year in 2013 2015 2016; do
    create_xls "$BASE_DIR/financial-reports/q1-$year.xls"
    create_xls "$BASE_DIR/financial-reports/q3-$year.xls"
done
create_xls "$BASE_DIR/financial-reports/half-yearly-2013.xls"

# Create Annual Reports
echo ""
echo "Creating annual report files..."
for year in {2016..2023}; do
    create_pdf "$BASE_DIR/annual-reports/Annual-Report-$year.pdf" "Annual Report $year"
done

# Create Financial Highlights
echo ""
echo "Creating financial highlight files..."
# Create a minimal PPTX (actually just a placeholder file)
if [ ! -f "$BASE_DIR/financial-highlights/Financial-Highlight-2022.pptx" ]; then
    printf 'PK\x03\x04' > "$BASE_DIR/financial-highlights/Financial-Highlight-2022.pptx"
    echo "000000" >> "$BASE_DIR/financial-highlights/Financial-Highlight-2022.pptx"
    echo "Created: $BASE_DIR/financial-highlights/Financial-Highlight-2022.pptx"
fi

# Create Download Files
echo ""
echo "Creating download files..."
create_pdf "$BASE_DIR/downloads/tendor1.pdf" "Tender 1"
create_pdf "$BASE_DIR/downloads/tender2.pdf" "Tender 2"
create_pdf "$BASE_DIR/downloads/internship1.pdf" "Internship"
create_pdf "$BASE_DIR/downloads/corrigendum 11-06-2024.pdf" "Corrigendum"
create_pdf "$BASE_DIR/downloads/5-6-2024 tender for services.pdf" "Tender for Services"
create_image "$BASE_DIR/downloads/chichian.jpeg" "jpg"

# Create Service Images
echo ""
echo "Creating service images..."
create_image "$BASE_DIR/services/lockers.png" "png"
create_image "$BASE_DIR/services/utility-bill.png" "png"
create_image "$BASE_DIR/services/psc.jpg" "jpg"
create_image "$BASE_DIR/services/home-remittances.png" "png"

# Create Schedule of Charges
echo ""
echo "Creating schedule of charges files..."
create_pdf "$BASE_DIR/schedule-of-charges/soc_from_jan_to_jun_2025.pdf" "Schedule of Charges 2025"

echo ""
echo "✅ All placeholder files created successfully!"
echo ""
echo "Note: These are minimal placeholder files for development/testing."
echo "Replace them with actual content files in production."
