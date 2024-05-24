include .env
export

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


upload-to-device:
	adb push ./src/main.js /sdcard/script/bible-youversion-autojs.js

deploy:
	$(call upload, src/server.js, APP/bible-youversion-autojs/)
	$(call ssh, supervisorctl restart bible-youversion-autojs)
