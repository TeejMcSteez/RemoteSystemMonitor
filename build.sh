#!/bin/bash 

# Clears or creates .env file
> .env 

echo "Starting build . . ."

echo "Please enter the hostname for the HTTP server . . ."
read HOSTNAME

echo "Building node server . . ."

npm init -y
npm i express
npm i dotenv

echo "Initialized npm and installed necessary packages"

# Network connection

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
    
    if [[ "$content" == "coretemp" ]]; then
        echo "CPU_TEMPERATURE_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" == "nct6793" ]]; then # My specific PC all round sensor need to do research on all possible values used by modern PC's
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi

    # Replacing conditionals with grep
    
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