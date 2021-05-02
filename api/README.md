
## Build an image
```
docker build --force-rm=true -t crud-api .
```

### Or just simply pull the docker image 
```
docker pull generomuga/crud-api:dev
```

## Run a container
```
docker run -dit --rm --name crud-api -p 3000:3000 crud-api 
```

or

```
docker run -dit --rm --name crud-api -p 3000:3000 generomuga/crud-api:dev
```
