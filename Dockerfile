FROM node:18.10.0-alpine

USER node
WORKDIR /home/node
ENV NODE_ENV production
COPY package.json yarn.lock ./
COPY ./prisma prisma

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
