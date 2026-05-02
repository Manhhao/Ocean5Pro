# iReader Ocean5Pro
Collection of stuff applied to the iReader Ocean5Pro to get around firmware limitations

1. Download the repository, open in terminal/powershell and `cd` to the location
2. Enable USB Debugging on the device
## Bind buttons to PageUp/PageDown 
### Installation
Bind short press functions to 'None' (hidden in settings)
```sh
adb shell settings put system up_key_function 7
adb shell settings put system down_key_function 7
```

Buttons send scan codes 59 and 63 if set to 'None', override keylayout to prevent Android from translating those into F1 and F5.
```sh
adb push mtk-kpd.kl /data/system/devices/keylayout/mtk-kpd.kl
adb shell chmod 644 /data/system/devices/keylayout/mtk-kpd.kl
```

Restart shell to apply layout
```sh
adb shell stop
adb shell start
```
Re-enable USB Debugging

Push script to listen for raw F1/F5 hardware events and send PageUp/PageDown
```sh
adb push ireader-page-keys.sh /data/local/tmp/ireader-page-keys.sh
adb shell chmod 755 /data/local/tmp/ireader-page-keys.sh
```

Start script, needs to be done every time the device reboots
```sh
adb shell 'nohup sh /data/local/tmp/ireader-page-keys.sh >/dev/null 2>&1 </dev/null &'
```

### Revert
```sh
adb shell 'pkill -f "[i]reader-page-keys.sh" 2>/dev/null || true'
adb shell settings put system up_key_function 0
adb shell settings put system down_key_function 1
adb shell rm -f /data/system/devices/keylayout/mtk-kpd.kl
adb shell rm -f /data/local/tmp/ireader-page-keys.sh
adb shell stop
adb shell start
```

## Update Android System WebView
`SystemWebView.apk` can be downloaded [here](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=AndroidDesktop_arm64/)

Push apk to device
```sh
adb push SystemWebView.apk /data/local/tmp/webview.apk

adb shell "chmod 0644 /data/local/tmp/webview.apk"
adb shell "chown root:root /data/local/tmp/webview.apk"
adb shell "chcon u:object_r:system_file:s0 /data/local/tmp/webview.apk 2>/dev/null"

adb shell "mount --bind /data/local/tmp/webview.apk /product/app/webview/webview.apk"
```

Restart shell
```sh
adb shell stop
adb shell start
```
Re-enable USB Debugging

Apply update
```sh
adb shell "pm install -r /product/app/webview/webview.apk"
adb shell "umount /product/app/webview/webview.apk"
adb shell "rm -f /data/local/tmp/webview.apk"
```

Check installed version
```sh
adb shell dumpsys webviewupdate
```
