```bash
curl localhost:9317/runOnDevice -X POST -H "Content-Type: application/json" \
     --data-binar '{"id":"main","name":"main",
        "script_file":"autojs/bible-youversion-autojs.js"}'
```


adb -s R9JN60JQB3J tcpip 5555
adb connect 192.168.50.100:5555
export ANDROID_SERIAL=192.168.50.100:5555


adb push ./autojs/bible-youversion-autojs.js /sdcard/script/bible-youversion-autojs.js

## docker
```bash
```
