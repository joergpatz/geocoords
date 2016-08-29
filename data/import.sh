#!/usr/bin/env bash
tar -zxvf geo.tar.gz
mongorestore --host mongodb geo
mongo geo --host mongodb --eval "db.airports.ensureIndex({'loc':'2dsphere'})"
