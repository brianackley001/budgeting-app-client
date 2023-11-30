FROM node:lts-alpine

WORKDIR /opt/app
RUN chown -R node:node /opt/app
COPY --chown=node:node ./package*.json /opt/app/

USER node
RUN npm ci

# COPY --chown=node:node ./index.js ./
# COPY --chown=node:node ./.env ./
COPY --chown=node:node . .

EXPOSE 8000
ENTRYPOINT ["node"]
CMD ["app.js"]
