# Specify the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle app source inside Docker image
COPY . .

# Build the application
RUN yarn run build

# Use serve to serve the static files
RUN yarn global add serve
EXPOSE 3001
CMD ["serve", "-s", "build", "-l", "3001"]
