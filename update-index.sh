#!/bin/bash

# Backup current index.html
cp index.html index-without-gradient.html

# Replace with the gradient version
cp index-with-gradient.html index.html

echo "✅ index.html now includes the gradient animation!"
echo "📄 Original backed up as index-without-gradient.html"