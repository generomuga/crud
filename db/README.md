
## Build an image
docker build --force-rm=true -t crud-db .

## Run a container
docker run -dit --rm --name crud-db -p 5432:5432 b4r-db

## Run a container and persist the data
docker run -dit --rm --name crud-db -p 5432:5432 -v b4r-db:/var/lib/postgresql/data crud-db

## Run a container and replace the default env variables
docker run -dit --rm --name crud-db -p 5432:5432 -e "POSTGRES_USER=crudb" -e "LIQUIBASE_CONTEXTS=schema,template" -e "LIQUIBASE_LABELS=clean" b4r-db
