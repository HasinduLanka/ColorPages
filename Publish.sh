#!/bin/sh

rm -rf published
mkdir published

cd published
# ./published/

git clone --single-branch --depth 1  https://github.com/rainbowkids/colorbook.git

mv colorbook/.git .git

rm -rf colorbook

cd ..
# ./

npm run build

cp -r public published/colorbook
cp README.md published/colorbook/README.md

cd published
# ./published/

mv .git colorbook/.git

cd colorbook

git add .
git commit -m "V $(date '+%Y-%m-%d')"
git push

cd ../..
# ./

rm -rf published
