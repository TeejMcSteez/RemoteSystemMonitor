#!/bin/bash 

# Clears or creates .env file
> .env 

echo "Starting build . . ."

npm init -y
npm i express
npm i dotenv

echo "Initialized npm and installed necessary packages"

# Network connection

# EDIT THIS!!
HOSTNAME="0.0.0.0" # OR yourdns.com
#--------------
PORT=3000

# hwmon
hwmon="/sys/class/hwmon"
env_file=".env"

echo "Starting file detection . . ."

for dir in "$hwmon"/*; do
    # Skips non-directory entries (e.g., files, links)
    if [[ ! -d "$dir" ]]; then
        continue
    fi

    # Read the "name" file inside the directory
    content=$(cat "$dir/name" 2>>buildErrors.log)

    if [[ "$content" == "name1" ]]; then
        echo "CPU_TEMPERATURE_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi

    if [[ "$content" == "name2" ]]; then
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
done

echo "Adding hostname and port to env variables"
echo "HOSTNAME=$HOSTNAME" >> "$env_file"
echo "PORT=$PORT" >> "$env_file"

echo "Starting git clone"

mkdir -p "src"

cd "src"

git init 
git remote add origin https://github.com/TeejMcSteez/RemoteSystemMonitor
git pull origin master

cd ..

echo "Build Successful"