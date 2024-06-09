ifneq ("$(wildcard .env)","")
	include .env
	export
endif

upload:
	curl localhost:9317/runOnDevice -X POST -H "Content-Type: application/json" \
		 --data-binar '{"id":"main","name":"main", \
			"script":"@/main.js"}' \
filecontent=$(cat /path/to/yourfile.txt | jq -Rs .)
jsonbody=$(jq -n --arg content "$filecontent" '{key: $content, otherKey: "otherValue"}')

copy-from-device:
	adb shell am  broadcast -a clipper.get

.PHONY: server

install:
	yarn
start:
	node server/server.js


upload-to-device:
	adb push ./src/main.js /sdcard/script/bible-youversion-autojs.js

#deploy:
	#$(call upload, src/server.js, APP/bible-youversion-autojs/)
	#$(call ssh, supervisorctl restart bible-youversion-autojs)

test-server:
	http POST localhost:41403/bible_pray @data/bible_pray_2024-06-01.json
