# crud

Just a simple CRUD Todo application developed using Express for the API, PostgreSQL 13 for the database and Vue for the app. This app has been fully containerized. 

### Prerequisite
Just install the docker engine (https://docs.docker.com/engine/install/) on your local machine.

### Run the whole infrastructure by just simply running this code
```
docker-compose up -d
```

<b>Note</b>: Please make sure that there are no conflicting ports running on your local machine. This app uses ports 5432 for DB, 3000 for api and 8080 for vue app. If you want to change the default ports, you can update <b>ports</b> section in the docker-compose.yaml.
```
  ports:
      - "5432:5432" # You can change the value to this "5433:5432"
```

### Then terminate the whole infrastructure by executing this code
```
docker-compose down
```

### Test the app
```
  http://localhost:8080/
```

### Test the API
```
  GET http://localhost:3000/todos
  
  POST http://localhost:3000/todos 
  {
      "task": "task 1",
      "comment": "Not yet done I'm lazy"
  }
  
  DELETE http://localhost:3000/todos/<id>
  
  PUT http://localhost:3000/todos/<id>
  {
      "task": "task 1",
      "comment": "Ohh it's done, give me a vacation"
  }
```

### Test the database
```
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_NAME=cruddb
  DB_USERNAME=postgres
  DB_PASSWORD=postgres
```
