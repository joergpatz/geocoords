# Geocoords
Example Service for searching geo coordinates

A simple introduction to Geospatial feature of MongoDB 2.6+  
It will focus on the [2d Sphere index](https://docs.mongodb.com/manual/core/2dsphere/) with [GeoJSON](http://geojson.org/) format to query documents

## Dependencies

1. Install [Node.js](https://nodejs.org)
2. Ensure that [Docker](https://www.docker.com/) is installed on the system

## Install & Run

```bash
$ npm install
$ docker-compose up
$ npm start
$ open http://localhost:3000/
```

If MongoDB Host different as `localhost` then set `MONGO_HOST` ENV, e.g.:

```
$ MONGO_HOST=192.168.99.100 npm start
```