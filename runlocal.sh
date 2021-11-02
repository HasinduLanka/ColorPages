#!/bin/sh

npm run build

cd public

python -m http.server 37290
