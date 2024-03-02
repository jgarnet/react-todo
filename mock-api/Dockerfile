FROM node:20-alpine
WORKDIR /api
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3001
CMD ["yarn", "run", "run"]