FROM node:18.17.1-alpine AS build
COPY . /app
WORKDIR /app
ENV VITE_API_URL=simple-retro.ephemeral.dev.br/api
RUN yarn install --frozen-lockfile && yarn build 

FROM alpine:3.19
RUN apk add --no-cache rsync
COPY --from=build /app/dist /app