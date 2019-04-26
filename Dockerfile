FROM node:10

ARG BRANCH
ENV BRANCH_ENV ${BRANCH}
ENV CONTAINER_NUMBER

WORKDIR /app

COPY package*.json ./
COPY *.js ./

RUN chown -R node:node /app
USER node



RUN npm install

COPY --chown=node:node . .

EXPOSE 9001

CMD node server.js 9001 ${BRANCH_ENV} ${CONTAINER_NUMBER}
