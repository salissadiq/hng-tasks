# Use an official lightweight Node.js image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn install --ignore-engines

COPY . ./

ARG PORT
ENV PORT=${PORT}
ARG DB
ENV DB=${DB}

# Expose port 3000 for the app
EXPOSE ${PORT}

# Start the app
CMD ["yarn", "start"]
