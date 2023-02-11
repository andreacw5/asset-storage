FROM node:14-buster-slim

USER node
WORKDIR /home/node
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
