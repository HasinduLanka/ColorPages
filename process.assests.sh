#!/bin/bash

cd Assets/drawings
bash traceall.sh

cd ../..

cp Assets/drawings/drawings.js src/drawings.js

echo "Created drawings.js"
