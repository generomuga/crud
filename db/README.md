
## Build an image
docker build --force-rm=true -t crud-db .

### Or just simply pull the docker image 
docker pull generomuga/crud-db:dev

## Run a container
docker run -dit --rm --name crud-db -p 5432:5432 crud-db
or
docker run -dit --rm --name crud-db -p 5432:5432 generomuga/crud-db:dev

## Run a container and persist the data
docker run -dit --rm --name crud-db -p 5432:5432 -v b4r-db:/var/lib/postgresql/data crud-db
or
docker run -dit --rm --name crud-db -p 5432:5432 -v b4r-db:/var/lib/postgresql/data generomuga/crud-db:dev

## Run a container and replace the default env variables
docker run -dit --rm --name crud-db -p 5432:5432 -e "POSTGRES_USER=crudb" -e "LIQUIBASE_CONTEXTS=schema,template" -e "LIQUIBASE_LABELS=clean" crud-db
or
docker run -dit --rm --name crud-db -p 5432:5432 -e "POSTGRES_USER=crudb" -e "LIQUIBASE_CONTEXTS=schema,template" -e "LIQUIBASE_LABELS=clean" generomuga/crud-db:dev