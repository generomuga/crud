#!/bin/bash
#configure postgres for access
sed -i "s/local all             all                                     peer/local   all             all                                     $postgres_local_auth_method/" /etc/postgresql/13/main/pg_hba.conf
sed -i "s/host    all             all             127\.0\.0\.1\/32            md5/host    all             all             0\.0\.0\.0\/0            	$postgres_host_auth_method/" /etc/postgresql/13/main/pg_hba.conf
sed -i "s/\#listen_addresses = 'localhost'/listen_addresses = '$postgres_listen_address'/" /etc/postgresql/13/main/postgresql.conf

#basic postgres tuning - add as needed depending on the server the database is on!
sed -i '$ a default_statistics_target = 100 \
random_page_cost = 1.1 \
effective_cache_size = 32GB \
default_statistics_target = 100 \
max_parallel_workers_per_gather = 4 \
max_parallel_workers = 10' /etc/postgresql/13/main/postgresql.conf

#restart for the config and tuning to take effect
service postgresql restart
service ssh restart

#wait added to ensure postgres is up
sleep 20

echo "Creating the default database user..."
sudo -u postgres psql -c "create user $db_user with superuser password '$db_pass' valid until 'infinity';"

#creates the database ONLY if doesn't exist
echo "Creating the database..."
echo "SELECT 'CREATE DATABASE $db_name OWNER $db_user' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db_name')\gexec" | sudo -u postgres psql

echo "Starting liquibase migration..."
cd build/liquibase
export PATH=$PATH:$PWD
echo liquibase --username=$db_user --password=$db_pass --url=jdbc:postgresql://localhost:5432/$db_name --driver=org.postgresql.Driver --classpath="bin/drivers/$pg_driver" --changeLogFile=changelogs/db-changelog-master.xml --contexts=$lq_contexts --labels=$lq_labels update;
liquibase --username=$db_user --password=$db_pass --url=jdbc:postgresql://localhost:5432/$db_name --driver=org.postgresql.Driver --classpath="bin/drivers/$pg_driver" --changeLogFile=changelogs/db-changelog-master.xml --contexts=$lq_contexts --labels=$lq_labels update;

/bin/bash
