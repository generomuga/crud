#!/bin/bash

# Launches liquibase scripts once postgres is ready
for COUNTER in {1..10}
do
  echo "Waiting DB engine..."
  sleep 0.5s
  pg_isready -U $POSTGRES_USER
  if [ $? -eq 0 ]
  then
    echo "Database ready, executing liquibase for $POSTGRES_DB ..."
    sed -i "s/{env_user}/$POSTGRES_USER/;s/{env_pass}/$POSTGRES_PASSWORD/;s/{env_db}/$POSTGRES_DB/;s/{env_contexts}/$LIQUIBASE_CONTEXTS/;s/{env_labels}/$LIQUIBASE_LABELS/" $LIQUIBASE_DEFAULTS
    liquibase --defaultsFile=$LIQUIBASE_DEFAULTS update
    echo "$POSTGRES_DB initialized successfully"
    break
  fi
done
