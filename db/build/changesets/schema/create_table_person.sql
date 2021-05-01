--liquibase formatted sql

--changeset postgres:create_table_todo.sql context:schema splitStatements:false rollbackSplitStatements:false
--comment: Create table todo



CREATE SCHEMA master;

CREATE TABLE master.todo (
    id integer, 
    task varchar(100),
    comment varchar(100)
);



--rollback DROP TABLE master.todo;
--rollback DROP SCHEMA master;




