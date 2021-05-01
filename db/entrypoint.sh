#!/bin/bash

#run default liquibase command
bash run-liquibase.sh &
# normal run of postgres
bash docker-entrypoint.sh $POSTGRES_USER
