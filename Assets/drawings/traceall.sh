#!/bin/bash

rm -rf svgs
mkdir -p svgs

echo "export default {" >drawings.mjs

for filename in raw/*.*; do

    FILE=${filename%%.*}
    FILENAME=$(basename $FILE)

    # -monochrome
    convert -bordercolor black -border 1 $filename $FILE-tmp.bmp
    potrace $FILE-tmp.bmp -s --opaque -o svgs/$FILENAME.svg

    rm -f $FILE-tmp.bmp

    echo -e '\n"'$FILENAME'"' : >>drawings.mjs
    svgson svgs/$FILENAME.svg -p >>drawings.mjs
    echo "," >>drawings.mjs

    echo "Traced $FILE"

done

echo -e "\n}" >>drawings.mjs
