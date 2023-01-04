FROM node:16.17.0-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

RUN mkdir -p node_modules/.cache && chown -R node:node node_modules/.cache

COPY --chown=node . ./

USER 1000
CMD ["npm", "start"]