#!/bin/bash

npm i --only=prod
npm run build

#cp -R node_modules build/

zip -r node-pdf.zip build node_modules