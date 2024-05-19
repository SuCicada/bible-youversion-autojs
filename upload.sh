#!/bin/bash

#filecontent=$(cat main.js | jq -Rs .)
file=$1
jsonbody=$(jq -n --rawfile content "$file" '{id: "main", name: "main", script: $content}')
curl localhost:9317/runOnDevice -X POST -H "Content-Type: application/json" \
   -d "$jsonbody"
