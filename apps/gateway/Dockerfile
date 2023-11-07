
FROM node:latest
RUN npm install -g pnpm
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN pnpm install
CMD pnpm build && pnpm start:prod