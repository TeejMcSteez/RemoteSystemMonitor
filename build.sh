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
    # Looking for CPU Thermal Sensor
    if [[ "$content" == "coretemp" ]]; then # Intel Thermal sensor
        echo "CPU_TEMPERATURE_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" == "k10temp" ]]; then # Old AMD Thermal sensor
        echo "CPU_TEMPERATURE_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" == "zenpopwer" ]]; then # Modern AMD Thermal sensor
        echo "CPU_TEMPERATURE_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    # Looking for Motherboard Super I/O Chip Sensorcd
    if [[ "$content" =~ nct[0-9]+ ]]; then # Nuvoton
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" =~ IT[0-9]+ ]]; then # ITE
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" =~ F[0-9]+ ]]; then # Fintek
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" =~ SMSC[0-9]+ ]]; then # SMSC
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" =~ CX[0-9]+ ]]; then # Chips and Technologies
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" =~ w837[0-9]+ ]]; then # Winbond
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
    if [[ "$content" =~ rt[0-9]+ ]]; then # Realtek
        echo "MOTHERBOARD_DIRECTORY=$dir" >> "$env_file"
        echo "Appended $content to $env_file"
    fi
done

echo "Adding hostname and port to env variables"
echo "HOSTNAME=$HOSTNAME" >> "$env_file"
echo "PORT=$PORT" >> "$env_file"

echo "Starting git clone . . ."
# Creating src dir for files
mkdir src
cd src
#getting files from repo
git init 
git clone https://github.com/TeejMcSteez/RemoteSystemMonitor
# returning to root dir
cd ..

echo "Repo pulled successfully, Ready for deployment!"