#!/bin/bash
set -eu

if [ -z ${TEXT_TO_DIAGRAM_CLOUDFRONT_ID} ]; then
  echo "missing env var TEXT_TO_DIAGRAM_CLOUDFRONT_ID"
  exit 1
fi

yarn build
aws sts get-caller-identity
aws s3 sync ./out s3://text-to-diagram.com --delete
aws cloudfront create-invalidation --distribution-id ${TEXT_TO_DIAGRAM_CLOUDFRONT_ID} --paths "/*"
