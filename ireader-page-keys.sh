#!/system/bin/sh

while true; do
  getevent -l /dev/input/event1 2>/dev/null | while IFS= read -r line; do
    case "$line" in
      *"KEY_F5"*"DOWN"*)
        sendevent /dev/input/event1 1 109 1
        sendevent /dev/input/event1 0 0 0
        sendevent /dev/input/event1 1 109 0
        sendevent /dev/input/event1 0 0 0
        ;;
      *"KEY_F1"*"DOWN"*)
        sendevent /dev/input/event1 1 104 1
        sendevent /dev/input/event1 0 0 0
        sendevent /dev/input/event1 1 104 0
        sendevent /dev/input/event1 0 0 0
        ;;
    esac
  done
  sleep 1
done
