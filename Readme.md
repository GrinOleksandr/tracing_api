### This  project is created as a test task to show my skills

### Tech stack:

1) Nest.js
2) @nestjs/mongoose
3) Jest

### Swagger url is http://localhost:8000/swagger

### Project setup:

1) get .env from the secret place and paste it to project's root or create it from .env.sample file
2) `npm install`
3) `npm run build`
4) `npm run dev` or `npm start` depends on your environment(development or production)

### The list of .env variables:

| Name              | is required | description                            | default                   |
|-------------------|-------------|----------------------------------------|---------------------------|
| `**** General`    |
| PORT              | True        | port where application will be running | 8000                      |
| `**** DB MONGO`   |
| MONGO_HOST        | True        | db host                                | localhost                 |
| MONGO_PORT        | True        | db port                                | 27017                     |
| MONGO_USERNAME    | True        | db password                            | dev_user                  |
| MONGO_PASSWORD    | True        | name of db                             | mkjr4vnhyVDSV5_SDFdsloki3234_0 |
| MONGO_DB_NAME     | True        | database name                          | dev_db                    |
| MONGO_AUTH_SOURCE | True        | auth source                            | admin                     | 