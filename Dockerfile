FROM node:26.8.1-slim AS builder

# install git to install plugins
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
COPY .npmrc* .
COPY quartz/ ./quartz/
COPY quartz.config.yaml .
COPY local-plugins/ ./local-plugins/
COPY external-plugins/ ./external-plugins/
RUN npm install --global npm@12.0.2 && npm ci
RUN npm run install-plugins

FROM node:26.8.1-slim
WORKDIR /usr/src/app
RUN npm install --global npm@12.0.2
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
CMD ["npx", "quartz", "build", "--serve"]
