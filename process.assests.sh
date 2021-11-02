#!/bin/bash

cd Assets/drawings
bash traceall.sh

cd ../..

node refine.drawings.mjs

echo "Created drawings.js"
