FROM node:18.10.0-alpine

USER node
WORKDIR /home/node
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
