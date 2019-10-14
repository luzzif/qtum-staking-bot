FROM node:10-alpine

RUN mkdir /qtum-staking-bot
WORKDIR /qtum-staking-bot
ADD . /qtum-staking-bot

RUN yarn install --frozen-lockfile
RUN yarn lint:ci
RUN yarn test
RUN yarn build
RUN yarn install --production

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

ENV NODE_PATH build
CMD [ "node", "--max-http-header-size=1048576", "build/index.js" ]
