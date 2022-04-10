#!/usr/bin/env bash
cd release
grep -v '^\/\/ ' canvas-collections.user.js > canvas-collections.js
terser canvas-collections.js --compress --output canvas-collections.min.js

