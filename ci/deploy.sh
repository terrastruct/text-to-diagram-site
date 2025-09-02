#!/bin/bash
set -eu

# GCP deployment configuration - from terraform outputs
GCP_PROJECT="t2d-t2d-0e3c93ae"
GCS_BUCKET="gs://t2d-site-ac4ececd"
CDN_URL_MAP="t2d-https-map-df18"

yarn build

echo "Uploading to GCS bucket: ${GCS_BUCKET}/"
gsutil -m rsync -r -d ./out ${GCS_BUCKET}

echo "Setting optimal cache headers for different content types..."

# Long-lived assets (CSS, JS, images with versioned names) - 1 year cache
if gsutil ls "${GCS_BUCKET}/_next/" >/dev/null 2>&1; then
  gsutil -m setmeta -h "Cache-Control:public,max-age=31536000,immutable" "${GCS_BUCKET}/_next/**"
fi

# HTML files - 5 minute cache for content updates  
gsutil -m setmeta -h "Cache-Control:public,max-age=300" "${GCS_BUCKET}/*.html"

# Fonts and images (medium-term caching) - 1 day
if gsutil ls "${GCS_BUCKET}/fonts/" >/dev/null 2>&1; then
  gsutil -m setmeta -h "Cache-Control:public,max-age=86400" "${GCS_BUCKET}/fonts/**"
fi

if gsutil ls "${GCS_BUCKET}/images/" >/dev/null 2>&1; then
  gsutil -m setmeta -h "Cache-Control:public,max-age=86400" "${GCS_BUCKET}/images/**"
fi

if gsutil ls "${GCS_BUCKET}/favicon/" >/dev/null 2>&1; then
  gsutil -m setmeta -h "Cache-Control:public,max-age=86400" "${GCS_BUCKET}/favicon/**"
fi

echo "Invalidating CDN cache..."
gcloud compute url-maps invalidate-cdn-cache ${CDN_URL_MAP} \
  --path "/*" --project ${GCP_PROJECT}

echo "Deployment complete!"
