FROM liquibase/liquibase:4.3.2 AS liquibase
FROM postgres:13.2-alpine AS builder

RUN apk add openjdk11-jre-headless

EXPOSE 5432

COPY --from=liquibase /liquibase /liquibase
COPY entrypoint.sh /usr/local/bin
COPY run-liquibase.sh /usr/local/bin

WORKDIR /liquibase/changelog
COPY default.properties .

ENV PATH $PATH:/liquibase
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV LIQUIBASE_DEFAULTS=default.properties
ENV LIQUIBASE_CONTEXTS=schema,template
ENV LIQUIBASE_LABELS=clean

FROM builder AS builder1

ENV POSTGRES_DB=cruddb

# Copy project to locally execute it
COPY ./build ./build

# use the following to use a custom defaults file
# Postgres credentials in the file must match env variables
#
# COPY {myCustomDefaults.properties} .
# ENV LIQUIBASE_DEFAULTS {myCustomDefaults.properties}

ENTRYPOINT ["entrypoint.sh"]
