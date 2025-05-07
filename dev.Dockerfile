FROM node:20-alpine
WORKDIR /service

COPY package.json package-lock.json ./
RUN npm clean-install

COPY . .

EXPOSE ${PORT}
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port ${PORT}"]