FROM node:lts-alpine AS node
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ARG configuration=production
RUN npm install --production --configuration=$configuration --silent && mv node_modules ../
COPY . .
EXPOSE 8081
RUN chown -R node:node /usr/src/app
USER node
CMD ["npm", "start"]

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/santexchallenge/browser /usr/share/nginx/html
