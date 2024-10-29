FROM node:18.16.0

WORKDIR /api
COPY package*.json .
COPY .npmrc .
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3008
CMD [ "node", "dist/main" ]