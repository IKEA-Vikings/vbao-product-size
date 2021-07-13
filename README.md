# Vikea

A clone of Ikea's item details page. This repo is a module of the "Product Size" section, functioning as a service. It contains its own server and database.

![Screenshot of the Product Size service](https://vbao-readme-screenshots.s3.us-west-1.amazonaws.com/fec_product-size_screenshot.png)

## Related Projects

- [About Service](https://github.com/IKEA-Vikings/kim-service-1)
- [Images Service](https://github.com/IKEA-Vikings/phucci-service-1)
- [Others Also Viewed Service](https://github.com/IKEA-Vikings/vbao-others-also-viewed)
- [Proxy](https://github.com/IKEA-Vikings/vbao-proxy)
- [Reviews Service](https://github.com/IKEA-Vikings/josh-service-reviews)

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [API](#api)
1. [Database](#database)
1. [Development](#development)
1. [Deployment](#deployment)

## Usage

This repo provides front-end components for the Product Size module of Ikea's item detail page. Provides API to the Product Size service, and makes a GET request to the Images service to populate images. And it is used by the About service. A placeholder database is in place using MongoDB.

This app can be run locally and can also be deployed via Docker. A Docker-compose file is provided to deploy with a Docker image of MongoDB.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node
- Webpack/Webpack-CLI
- MongoDB `mongodb-community@4.4`
- Docker

## API

API                  | Description
---------------------|---------------------------
`GET /api/sizes/:id` | Retrieves product's sizes.

### Request/Response

```javascript
/* Sample Request */
$.get('api/sizes/1', (data) => { ... });

/* Sample Response */
{
  id: 1,
  title: '45x25"'
  sizes: [
    {
      name: 'Height',
      size: '45',
      unit: 'in'
    },
    {
      name: 'Width',
      size: '25',
      unit: 'in'
    },
    {
      name: 'Max. load',
      size: '200',
      unit: 'lb'
    }
  ]
}
```

## Database

Schema utilizing mongoDB via Mongoose

```javascript

const singleSize = new Schema({
  name: String,
  size: String,
  unit: String
});

const productSizes = new Schema({
  id: Number,
  title: String,
  sizes: {
    type: [singleSize],
    default: undefined
  }
});
```

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Seed Database

From within the root directory:

```sh
npm run seed
```

This script will run a seeding script to insert 100 records into a new Mongo database called `ikea` within a collection called `productsizes`.

Prior to running the seeding script locally, be sure the Mongo server is started.

```sh
brew services start mongodb-community@4.4
```

### Transpile React

From within the root directory in its own terminal:

```sh
npm run build
```

This script will transpile updates made to files within the `./client` folder to the `./public` folder. This script will continually watch for changes.

### Run Tests

Test scripts will test the database, API, client, and seeding script via Jest and will show coverage of the tests in the terminal.

Prior to running the test be sure the local Mongo server is started. And that the API server is started as well.

```sh
brew services start mongodb-community@4.4
```

From within the root directory:

```sh
npm start
```

In a separate terminal window, from within the root directory:

```sh
npm run test
```

## Deployment

The repo can be deployed directly using Node within an AWS EC2 instance, or deployed via Docker.

### Docker Deployment

Navigate to the folder that contains the `Dockerfile`. Build the docker image:

`docker build -t <app_name> .`

View existing Docker images to check the image creation was successful:

`docker images`

Then we run the app.

`docker run -p <port>:3003 -d <app_name>`

Running containers can be viewed:

`docker ps`

And containers can be stopped:

`docker stop <container id>`

### Docker-compose Deployment

Navigate to the folder with `docker-compose.yaml` file.

```bash
docker-compose build --no-cache
docker-compose up
```

This will read the `docker-compose.yaml` file and build the app. Both the app (client + server) and the MongoDB image (database). `--no-cache` should help with updating the docker-compose file. Otherwise, subsequent updates may not be reflected in what is served via Docker.

Alternatively, `docker-compose up -d` with start and run the containers in the background.

Use `docker-compose ps` to check what containers are currently running.

`docker-compose stop` will stop the container, while `docker-compose down -v` will stop the container and also remove the container and its volumes.
