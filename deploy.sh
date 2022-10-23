#!/bin/bash
set -eu

if [ -z ${TEXT_TO_DIAGRAM_CLOUDFRONT_ID} ]; then
  echo "missing env var TEXT_TO_DIAGRAM_CLOUDFRONT_ID"
  exit 1
fi

if [ -z ${TEXT_TO_DIAGRAM_S3_BUCKET} ]; then
  echo "missing env var TEXT_TO_DIAGRAM_S3_BUCKET"
  exit 1
fi

yarn build
aws sts get-caller-identity
aws s3 sync ./out ${TEXT_TO_DIAGRAM_S3_BUCKET} --delete
aws cloudfront create-invalidation --distribution-id ${TEXT_TO_DIAGRAM_CLOUDFRONT_ID} --paths "/*"
