#!/bin/bash

# Log directory and file


DIR_FILE="/home/prajwol/Cloco/Cloco-nepal-internship-2025/2025-01-21/Crontab"
ps -eo pid,comm,%cpu,%mem --sort=-%cpu | head -n6 >> "$DIR_FILE"

echo "" >>  "$DIR_FILE"



