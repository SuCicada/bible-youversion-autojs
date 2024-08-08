ifneq ("$(wildcard .env)","")
	include .env
	export
endif

upload:
	curl localhost:9317/runOnDevice -X POST -H "Content-Type: application/json" \
		 --data-binar '{"id":"main","name":"main", \
			"script":"@autojs/bible-youversion-autojs.js"}'

filecontent=$(cat /path/to/yourfile.txt | jq -Rs .)
jsonbody=$(jq -n --arg content "$filecontent" '{key: $content, otherKey: "otherValue"}')

copy-from-device:
	adb shell am  broadcast -a clipper.get

.PHONY: server

install:
	yarn
start:
	node server/server.js


#upload-to-device:
	#adb push ./autojs/main.js /sdcard/script/bible-youversion-autojs.js

#lib_file = moment.js
lib_file = bible-youversion-autojs.js
upload-to-device-remote:
	$(call upload, autojs/$(lib_file), /tmp/$(lib_file) )
	$(call ssh, adb -s R9JN60JQB3J push /tmp/$(lib_file) /sdcard/script/$(lib_file) )

#deploy:
	#$(call upload, src/server.js, APP/bible-youversion-autojs/)
	#$(call ssh, supervisorctl restart bible-youversion-autojs)

test-server:
	http POST localhost:41403/bible_pray @data/bible_pray_2024-06-01.json


start-autojs-server:
	ts-node autojs-server/server.ts
