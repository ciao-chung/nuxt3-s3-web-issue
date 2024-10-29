docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/site/cms" \
    -w /site/cms \
    node:20 \
    yarn install
