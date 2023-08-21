#!/bin/bash

# Get a list of all Node.js processes
node_processes=$(ps aux | grep '[n]ode')

# Loop through each process and extract the process ID
while read -r line; do
  process_id=$(echo "$line" | awk '{print $2}')
  echo "Killing Node.js process with PID: $process_id"
  kill -9 "$process_id"
done <<< "$node_processes"

