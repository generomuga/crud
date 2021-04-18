FROM ubuntu:18.04

# Update and install utility packages
RUN apt-get update -y && apt-get install -y \
    sudo \
    make \
    curl \
    git \
    tree \
    openssh-client \
    openssh-server \
    openssl \
    gnupg2 \
    software-properties-common \
    vim

EXPOSE 22 5432

# Create default user and group
RUN useradd admin -s /bin/bash -m --password $(echo @dm1n123 | openssl passwd -1 -stdin) && adduser admin sudo
RUN groupadd crudgrp
RUN usermod -aG crudgrp admin && usermod -g crudgrp admin

# Allow password-based SSH
RUN sed -i "s/#PasswordAuthentication yes/PasswordAuthentication yes/" /etc/ssh/sshd_config
RUN service ssh restart

# Copy the entrypoint/config file and make sure it can execute
COPY config.sh /root
RUN chmod 755 /root/config.sh

# Install Java so we can run liquibase
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 0xB1998361219BD9C9
RUN apt-add-repository 'deb http://repos.azulsystems.com/ubuntu stable main'
RUN apt install -y zulu-13

# Create the file repository configuration
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Import the repository signing key
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Update the package lists
RUN apt-get -y update

#Install Postgresql13
RUN apt-get -y update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    postgresql-13 \
    postgresql-server-dev-13 \
    postgresql-client-13 \
    postgresql-plpython3-13

# Make sure the postgres user is part of the ebsgrp group to avoid permission issues
RUN usermod -aG crudgrp postgres

# Set all environment variables needed to initialize the database - these can all be overriden during container run
ENV postgres_local_auth_method=trust
ENV postgres_host_auth_method=trust
ENV postgres_listen_address=*
ENV db_user=admin
ENV db_pass=@dm1n123
ENV db_name=cruddb
ENV pg_driver=postgresql-42.2.10.jar
ENV lq_contexts=schema,template,fixture
ENV lq_labels=clean,develop

# Copy build folder
COPY build build

# Pass the entry
ENTRYPOINT ["/root/config.sh"]
