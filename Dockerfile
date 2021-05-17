FROM node:16.1.0-alpine3.13 as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:mainline
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
RUN chmod +x env.sh
# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]