#!/bin/bash
for filename in raw/*.*; do
    sh trace.sh $filename
#     echo $filename
done
