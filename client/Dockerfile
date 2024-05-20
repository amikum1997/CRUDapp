FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
RUN npm install -g serve
RUN rm tsconfig.json || true
CMD ["serve", "-s", "dist", "-p", "5173"]
