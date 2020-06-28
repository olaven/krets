FROM node:12.17.0


WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn cache clean && yarn --update-checksums
COPY . ./
RUN yarn && yarn build
CMD [ "yarn", "start" ]


