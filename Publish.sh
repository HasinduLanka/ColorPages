#!/bin/sh

rm -rf publish
mkdir publish

cd publish
# ./publish/

git clone --single-branch --depth 1  https://github.com/rainbowkids/colorbook.git

mv colorbook/.git .git

rm -rf colorbook

cd ..
# ./

npm run build

cp -r public publish/colorbook

cd publish
# ./publish/

mv .git colorbook/.git

cd colorbook

git add .
git commit -m "V $(date '+%Y-%m-%d')"
git push