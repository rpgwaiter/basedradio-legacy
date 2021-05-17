FROM node:16.1.0-alpine3.13 as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build


FROM nginx:mainline-alpine
# Add bash
RUN apk add --no-cache bash
# Get build from builder
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Make shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]