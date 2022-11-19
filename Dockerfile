# --------------------------------------------------------------------------------
# Dockerfile for local installer
# --------------------------------------------------------------------------------
FROM twilio/twilio-cli:5.1.0
ARG GITHUB_SHA_ARG
ENV GITHUB_SHA=$GITHUB_SHA_ARG

RUN twilio plugins:install @twilio-labs/plugin-serverless
RUN twilio plugins:install @twilio-labs/plugin-flex@6.0.2
RUN apt install jq -y

# directory to copy/run application
WORKDIR /hls-installer

# copy github files needed for running locally
COPY Dockerfile package.json .env .twilioserverlessrc /hls-installer/
COPY assets    /hls-installer/assets
COPY functions /hls-installer/functions
# install dependencies in package.json
RUN npm install

# Website files need to be built
COPY website /hls-installer/website
WORKDIR /hls-installer/website
RUN npm install
RUN npm run build
RUN npm run export
RUN rm -rf /hls-installer/assets/_next
RUN mkdir /hls-installer/assets/_next/ 
RUN mv out/* /hls-installer/assets/
WORKDIR /hls-installer

WORKDIR /hls-installer

# expose default port for running locally
EXPOSE 3000

CMD ["twilio", "serverless:start", "--load-local-env"]
