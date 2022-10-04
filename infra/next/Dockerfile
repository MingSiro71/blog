FROM node:latest
RUN mkdir -p /usr/node/app/blog && chown -R node:node /usr/node/app
WORKDIR /usr/node/app/blog
USER node
RUN sh -c "npm i -y || exit 0"
