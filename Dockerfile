FROM node:6.5.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install scrypt; exit 0
RUN npm install scrypt
RUN npm install secp256k1; exit 0
RUN npm install secp256k1

# Bundle app source
COPY . /usr/src/app

EXPOSE 3002
CMD npm start
