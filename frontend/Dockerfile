# pull official base image
FROM node:14.15.1-alpine

# Set the working directory
ENV BASE_DIR=/usr/src/app
ENV APP_DIR=$BASE_DIR/frontend
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH $APP_DIR/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm i

# Copies everything over to Docker environment
COPY . .

# Finally runs the application
CMD npm start
