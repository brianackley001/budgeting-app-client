#Declare ARGS
# ARG VITE_API_URL
# ARG VITE_MSAL_CLIENT_ID
# ARG VITE_MSAL_AUTHORITY
# ARG VITE_MSFT_APP_INSIGHTS_KEY
# ARG VITE_MSFT_APP_INSIGHTS_CONN_STRING
# ARG VITE_TRANSACTION_PAGINATION_SET_SIZE

# build stage
FROM node:lts-alpine AS build-stage
# make the 'app' folder the current working directory
WORKDIR /app
# copy 'package.json' to install dependencies
COPY package*.json ./
# install dependencies
RUN npm install
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Use the ARGs as environment variables
# ENV VITE_API_URL=$VITE_API_URL
# ENV VITE_MSAL_CLIENT_ID=$VITE_MSAL_CLIENT_ID
# ENV VITE_MSAL_AUTHORITY=$VITE_MSAL_AUTHORITY
# ENV VITE_MSFT_APP_INSIGHTS_KEY=$VITE_MSFT_APP_INSIGHTS_KEY
# ENV VITE_MSFT_APP_INSIGHTS_CONN_STRING=$VITE_MSFT_APP_INSIGHTS_CONN_STRING
# ENV VITE_TRANSACTION_PAGINATION_SET_SIZE=$VITE_TRANSACTION_PAGINATION_SET_SIZE

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]