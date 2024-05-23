upload:
	curl localhost:9317/runOnDevice -X POST -H "Content-Type: application/json" \
		 --data-binar '{"id":"main","name":"main", \
			"script":"@/main.js"}' \
filecontent=$(cat /path/to/yourfile.txt | jq -Rs .)
jsonbody=$(jq -n --arg content "$filecontent" '{key: $content, otherKey: "otherValue"}')

copy-from-device:
	adb shell am  broadcast -a clipper.get

.PHONY: server

server:
	node src/server.js
