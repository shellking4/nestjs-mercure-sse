# NESTJS MERCURE SSE

The following resources have been used to figure out how to setup a SSE server using NESTJS and MERCURE. Since most of the implementations out there are using Symfony Framework or Laravel, I decided to create this NestJS implementation in order to showcase how to setup mercure with NestJS.

[text](https://blog.eleven-labs.com/fr/a-la-decouverte-de-mercure/)

[text](https://www.youtube.com/watch?v=kYNC47V7R_0&list=LL&index=1)

MERCURE should be setup before running this project

Here is the docker-compose.yaml file to setup mercure

```yaml
version: '3.7'

services:
    mercure:
        image: dunglas/mercure
        environment:
            DEBUG: "debug"
            SERVER_NAME: ':80'
            MERCURE_PUBLISHER_JWT_KEY: '!ChangeThisMercureHubJWTSecretKey!'
            MERCURE_SUBSCRIBER_JWT_KEY: '!ChangeThisMercureHubJWTSecretKey!'
            MERCURE_EXTRA_DIRECTIVES: |-
                cors_origins "*"
                anonymous
        ports:
            - "9090:80"
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The endpoint that is used to send events is:

POST http://localhost:3008/events

The body of the request should be:

```json
{
    "topic": "/events",
    "data": {
        "message": "Hello world!"
    }
}
```

To connect to the SSE server from the client, you can use the following code:

```typescript
const url = new URL("http://127.0.0.1:9090/.well-known/mercure")
url.searchParams.append("topic", "/events")
const eventSource = new EventSource(url)
eventSource.onmessage = (event) => { console.log(JSON.parse(event.data)) }
```
