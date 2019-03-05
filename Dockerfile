FROM node:10

WORKDIR /app

COPY package*.json ./
COPY *.js ./

RUN chown -R node:node /app
USER node



RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "server.js", "8080" ]
