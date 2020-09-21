#!/usr/bin/env bash

cd ../libreoffice-lambda-layer

rm -rf layer
unzip layer.tar.br.zip -d layer

cd layer
brotli -d lo.tar.br
tar -xvf lo.tar

cd ../../aws-lambda-libreoffice/

yarn build
docker run --rm \
  -e DOCKER_LAMBDA_STAY_OPEN=1 \
  -p 9001:9001 \
  -v "$PWD":/var/task \
  -v "$PWD"/../libreoffice-lambda-layer/layer:/opt \
  lambci/lambda:nodejs12.x app.handler
