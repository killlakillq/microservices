
FROM node:latest
RUN npm install -g pnpm
RUN mkdir -p /var/www/account
WORKDIR /var/www/account
ADD . /var/www/account
RUN pnpm install
CMD pnpm build && pnpm start:prod