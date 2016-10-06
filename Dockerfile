FROM node:6.5.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install --save scrypt; exit 0
RUN npm install --save scrypt; exit 0
RUN npm install --save secp256k1; exit 0
RUN npm install --save secp256k1; exit 0

# Bundle app source
COPY . /usr/src/app

EXPOSE 3002
CMD npm start
