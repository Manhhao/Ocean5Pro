# iReader Ocean5Pro
Collection of stuff applied to the iReader Ocean5Pro to get around firmware limitations

1. Download the repository, open in terminal/powershell and `cd` to the location
2. Enable USB Debugging on the device
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

## Bind buttons to PageUp/PageDown
This is optional and mainly useful for browsers where the iReader simulates swipes. Not necessary for apps that recognize volume keys.
### Installation
Bind short press functions to `None`:
```sh
adb shell settings put system up_key_function 7
adb shell settings put system down_key_function 7
```

Buttons send scan codes 59 and 63 when set to 'None', override keylayout to make them send PageUp and PageDown
```sh
adb push mtk-kpd.kl /data/system/devices/keylayout/mtk-kpd.kl
adb shell chmod 644 /data/system/devices/keylayout/mtk-kpd.kl
```

Restart shell
```sh
adb shell stop
adb shell start
```

### Revert
```sh
adb shell settings put system up_key_function 0
adb shell settings put system down_key_function 1
adb shell rm -f /data/system/devices/keylayout/mtk-kpd.kl
adb shell stop
adb shell start
```
