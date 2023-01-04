FROM node:16.15.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY --chown=node . ./

USER 1000
CMD ["npm", "start"]