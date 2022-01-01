# PIHOLE in Docker

This project contains optionated configuration of Pi-hole docker container.

Running `docker-compose up` starts up 3 containers:

* pi-hole
* dnscrypt proxy
* cloudflated

Pi-hole serves as local DNS resolver. Queries are forwarded over dns-over-https or dnscrypt
to the nearest server ([list of available servers](https://dnscrypt.info/public-servers/)).
Cloudflare's dns-over-https is used as a fallback.

## Configuration

Defaults can be found in the `.env` file. Override those when running docker-compose.
See [how to use env variables in docker-compose](https://docs.docker.com/compose/environment-variables/).

## See also:

* [Pi-hole project](https://pi-hole.net/)
* [DNSCRYPT project](https://www.dnscrypt.info/) for encrypted/anonymized DNS communication
* [Cloudflare tunnel clinet](https://github.com/cloudflare/cloudflared)
