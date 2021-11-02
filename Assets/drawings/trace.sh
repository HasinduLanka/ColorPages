#!/bin/sh

if [ -z "$1" ]
  then
    echo "Usage : trace.sh input-file-name.jpg"
fi

mkdir -p svgs
mkdir -p svgsons

FILE=${1%%.*}
FILENAME=$(basename $FILE)

# -monochrome
convert -bordercolor black -border 1 $1 $FILE-tmp.bmp
potrace $FILE-tmp.bmp -s --opaque -o svgs/$FILENAME.svg

rm -f $FILE-tmp.bmp


svgson svgs/$FILENAME.svg -p -o svgsons/$FILENAME.json


echo "Traced $FILE"
