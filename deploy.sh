#!/bin/bash

# 建置專案
echo "Building..."
npm run build

# 進入 dist 目錄
cd dist

# 初始化 git 並推送
git init
git add -A
git commit -m "deploy"
git push -f https://github.com/dylmd12/neurotrack-demo.git main
cd ..
echo "Done! Deployed to https://dylmd12.github.io/neurotrack-demo/"
