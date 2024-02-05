######
### BUILD STAGE
######
FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

# Coping yarn files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Install 'sharp' in standalone mode
#RUN yarn add sharp

COPY . .

# Build app
RUN yarn build

######
### PRODUCTION STAGE
######
FROM node:18-alpine

# Setting up the production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000


WORKDIR /app

# disable next telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# args
ARG KEYSTATIC_GITHUB_CLIENT_ID
ARG KEYSTATIC_GITHUB_CLIENT_SECRET
ARG KEYSTATIC_SECRET
ARG NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG

# vars
ENV KEYSTATIC_GITHUB_CLIENT_ID=${KEYSTATIC_GITHUB_CLIENT_ID}
ENV KEYSTATIC_GITHUB_CLIENT_SECRET=${KEYSTATIC_GITHUB_CLIENT_SECRET}
ENV KEYSTATIC_SECRET=${KEYSTATIC_SECRET}
ENV NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=${NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG}

#STANDALONE BUILD

# Copying standalone project
COPY --from=BUILD_IMAGE --chown=node:node /app/.next/standalone .
COPY --from=BUILD_IMAGE --chown=node:node /app/.next/static ./.next/static

# Copying public folder
COPY --from=BUILD_IMAGE --chown=node:node /app/public/ /app/public/

RUN chown -R node /app/

USER node

EXPOSE 3000

CMD [ "node", "server.js" ]
