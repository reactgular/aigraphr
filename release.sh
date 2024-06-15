#!/usr/bin/env bash

nx run-many -t build
nx release --skip-publish --first-release
nx run-many -t build
nx release publish --first-release --yes
