FROM node:20-alpine

RUN npm install -g @angular/cli@17.1.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4200

CMD ["sh", "-c", "ng serve --host 0.0.0.0"]