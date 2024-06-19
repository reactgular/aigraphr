#!/usr/bin/env bash

# Join all arguments with a comma
args=$(IFS=,; echo "$*")

# Execute the command with the modified arguments
yarn nx run server:serve --args="$args,--plugins-path=./dist/plugins"
