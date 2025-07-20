#!/bin/bash

# Process New Photos for Aroice Gallery
# Converts and optimizes new photos, then moves them to album

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Processing New Photos for Aroice Gallery${NC}"
echo -e "${BLUE}============================================${NC}"

# Navigate to photos directory
cd "$(dirname "$0")" || {
    echo -e "${RED}❌ Error: Could not find photos directory${NC}"
    exit 1
}

# Check if new folder exists
if [ ! -d "new" ]; then
    echo -e "${RED}❌ Error: 'new' folder not found${NC}"
    exit 1
fi

# Create backup directory for originals
mkdir -p new-backup

echo -e "${YELLOW}📁 Processing photos in: $(pwd)/new${NC}"
echo -e "${YELLOW}💾 Backup directory: new-backup${NC}"
echo -e "${YELLOW}📂 Target directory: album${NC}"
echo ""

# Counter variables
processed_files=0
total_files=$(find new -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | wc -l)

echo -e "${BLUE}📊 Found $total_files new photos to process${NC}"
echo ""

# Function to get file size in bytes
get_file_size() {
    stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null || echo 0
}

# Function to format file size
format_size() {
    local size=$1
    if [ $size -gt 1048576 ]; then
        echo "$(echo "scale=1; $size/1048576" | bc)MB"
    elif [ $size -gt 1024 ]; then
        echo "$(echo "scale=1; $size/1024" | bc)KB"
    else
        echo "${size}B"
    fi
}

# Process each new photo
for img in $(find new -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \)); do
    
    processed_files=$((processed_files + 1))
    
    # Get original file info
    original_size=$(get_file_size "$img")
    filename=$(basename "$img")
    name="${filename%.*}"
    optimized_name="${name}.webp"
    
    echo -e "${YELLOW}[$processed_files/$total_files]${NC} Processing: ${BLUE}$filename${NC}"
    echo -e "   📏 Original size: $(format_size $original_size)"
    
    # Backup original
    cp "$img" "new-backup/"
    
    # Convert and optimize to WebP
    if [ $original_size -gt 5242880 ]; then
        # Files > 5MB: More aggressive compression
        echo -e "   🔧 Large file detected - applying aggressive optimization..."
        magick "$img" -strip -interlace Plane -quality 85 -resize 1200x1200\> "album/$optimized_name"
    elif [ $original_size -gt 2097152 ]; then
        # Files > 2MB: Medium compression
        echo -e "   🔧 Medium file - applying standard optimization..."
        magick "$img" -strip -interlace Plane -quality 90 -resize 1400x1400\> "album/$optimized_name"
    else
        # Files < 2MB: Light compression
        echo -e "   🔧 Small file - applying light optimization..."
        magick "$img" -strip -interlace Plane -quality 92 "album/$optimized_name"
    fi
    
    # Check if conversion was successful
    if [ -f "album/$optimized_name" ]; then
        optimized_size=$(get_file_size "album/$optimized_name")
        
        if [ $original_size -gt 0 ]; then
            compression_ratio=$(echo "scale=1; (1 - $optimized_size/$original_size) * 100" | bc)
            echo -e "   ✅ Optimized: $(format_size $optimized_size) (${compression_ratio}% smaller)"
        fi
        
        echo -e "   ✅ Moved to album as: ${GREEN}$optimized_name${NC}"
    else
        echo -e "   ${RED}❌ Failed to process${NC}"
    fi
    
    echo ""
done

echo -e "${GREEN}🎉 Processing Complete!${NC}"
echo -e "${GREEN}=====================${NC}"
echo -e "📊 Total files processed: $processed_files"
echo -e "📁 New photos available in: album/"
echo -e "💾 Originals backed up in: new-backup/"
echo ""
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo -e "   1. Update collage-script.js with new photo entries"
echo -e "   2. Test the gallery to ensure all photos load correctly"
echo -e "   3. Update sitemap.xml if needed"
