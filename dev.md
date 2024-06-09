```bash
curl localhost:9317/runOnDevice -X POST -H "Content-Type: application/json" \
     --data-binar '{"id":"main","name":"main",
        "script":"@./main.js"}'
```


adb -s R9JN60JQB3J tcpip 5555
adb connect 192.168.50.100:5555
export ANDROID_SERIAL=192.168.50.100:5555


adb push ./src/main.js /sdcard/script

## docker
```bash
-v /home/ubuntu/APP/Minecraft/:/mnt/Minecraft/ 
```
