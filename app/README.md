
## Build an image
```
docker build --force-rm=true -t crud-app .
```

### Or just simply pull the docker image 
```
docker pull generomuga/crud-app:dev
```

## Run a container
```
docker run -dit --rm --name crud-app -p 8080:8080 crud-app
```

or

```
docker run -dit --rm --name crud-app -p 8080:8080 generomuga/crud-app:dev
```
