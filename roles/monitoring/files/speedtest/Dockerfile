FROM debian:10

RUN apt-get -y update \
    && apt-get -y install --no-install-recommends \
        nodejs \
        speedtest-cli \
        ca-certificates \
    && apt-get -y autoclean

ADD index.js /index.js

EXPOSE 9112

CMD [ "/usr/bin/nodejs", "/index.js" ]
