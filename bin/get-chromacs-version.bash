#!/usr/bin/env bash

# extract the version from the manifest file

if [ ! -f "manifest.json" ]; then
  echo "No manifest file in this directory." >&2
  exit 1
fi

grep '"version"' manifest.json \
  | perl -nle '/:\s*"(.+)"/ and print $1'
