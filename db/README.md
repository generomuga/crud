
## Build an image
docker build --force-rm=true -t crud-db .

## Run a container
docker run --detach --name crud-db -h crud-db -p 5434:5432 --health-cmd="pg_isready -U postgres || exit 1" -e "db_name=cruddb" -e "db_user=admin" -e "lq_contexts=schema,template,fixture" -e "lq_labels=clean,develop" -v postgres_etc:/etc/postgresql -v postgres_log:/var/log/postgresql -v postgres_lib:/var/lib/postgresql -it crud-db:latest