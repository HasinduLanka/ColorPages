#!/bin/bash

rm -rf svgs
mkdir -p svgs

echo "export default Drawings = {" >drawings.js

for filename in raw/*.*; do

    FILE=${filename%%.*}
    FILENAME=$(basename $FILE)

    # -monochrome
    convert -bordercolor black -border 1 $filename $FILE-tmp.bmp
    potrace $FILE-tmp.bmp -s --opaque -o svgs/$FILENAME.svg

    rm -f $FILE-tmp.bmp

    echo -e '\n"'$FILENAME'"' : >>drawings.js
    svgson svgs/$FILENAME.svg -p >>drawings.js
    echo "," >>drawings.js

    echo "Traced $FILE"

done

echo -e "\n}" >>drawings.js
