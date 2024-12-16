#!/bin/bash 
# hwmon
hwmon="/sys/class/hwmon"
env_file=".env"
# Clears or creates .env file
> .env 

echo "Starting build . . ."

echo "Please enter the hostname for the HTTP server . . ."
read HOSTNAME
echo "Please enter the port for the server to listen on . . ."
read PORT

echo "Building node server . . ."

npm init -y
echo "NPM initialized, Installing express"
npm i express
echo "Installed express successfully . . . Installing dotenv"
npm i dotenv
echo "Initialized npm and installed necessary packages"

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
    if [[ "$content" =~ nct[0-9]+ ]]; then # My specific PC all round sensor need to do research on all possible values used by modern PC's
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
done

echo "Adding hostname and port to env variables"
echo "HOSTNAME=$HOSTNAME" >> "$env_file"
echo "PORT=$PORT" >> "$env_file"

echo "Starting git pull"

git init 
git remote add origin https://github.com/TeejMcSteez/RemoteSystemMonitor
git pull origin master

cd ..

echo "Repo pulled successfully, build Successful would you like to start the server? (y/n)"
read choice 
if [["$choice" == "y"]]; then
    echo "Starting node . . ."
    node "src/index.js"
fi
if [["$choice" == "n"]]; then 
    echo "Exiting build script ready for deployement"
fi