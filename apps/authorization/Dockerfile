
FROM node:latest
RUN npm install -g pnpm
RUN mkdir -p /var/www/authentication
WORKDIR /var/www/authentication
ADD . /var/www/authentication
RUN pnpm install
CMD pnpm build && pnpm start:prod