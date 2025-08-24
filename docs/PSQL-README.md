## Local PostgreSQL Setup

1) Install Postgres 16
   - macOS: `brew install postgresql@16 && brew services start postgresql@16`

2) Create role and database
   - `createuser --interactive --pwprompt awadh`
   - `createdb -O awadh dev_db`

3) Enable pg_stat_statements
   - Edit `postgresql.conf` -> `shared_preload_libraries = 'pg_stat_statements'`
   - Restart Postgres.
   - In dev_db: `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;`

4) Verify
   - `psql postgres -c "select version();"`
   - `psql "postgresql://awadh:<PASSWORD>@localhost:5432/dev_db" -c "SELECT * FROM pg_stat_statements LIMIT 1;"`

5) Environment
   - `.env`: `DATABASE_URL="postgresql://awadh:<PASSWORD>@localhost:5432/dev_db"`

6) Makefile
   - Start/stop: `make pg-start|pg-stop|pg-restart`
   - Create DB: `make db-create`
   - Enable extension: `make db-ext`
   - Verify: `make db-verify`
