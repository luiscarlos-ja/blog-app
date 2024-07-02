FROM node:20.12.0-alpine

WORKDIR /app

# Install PostgreSQL and create necessary directories with correct permissions
RUN apk update && \
    apk add --no-cache postgresql postgresql-contrib && \
    mkdir -p /run/postgresql && \
    chown -R postgres:postgres /run/postgresql && \
    mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql

# Install PostgreSQL client for pg_dump and other utilities
RUN apk add --no-cache postgresql-client

# Switch to the postgres user and initialize the database
USER postgres
RUN initdb /var/lib/postgresql/data

# Create a database
RUN pg_ctl -D /var/lib/postgresql/data start && \
    psql --command "CREATE USER luiscarlos_ja WITH SUPERUSER PASSWORD 'luiscarlos_ja';" && \
    createdb -O luiscarlos_ja luiscarlos_ja && \
    pg_ctl -D /var/lib/postgresql/data stop

USER root

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client 

COPY server/package*.json server/
RUN npm run install-server 

RUN npm install typescript

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/
RUN npm run build --prefix server

CMD su postgres -c 'pg_ctl -D /var/lib/postgresql/data start' && npm run sync-db --prefix server && npm start --prefix server

EXPOSE 8000