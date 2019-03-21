
# BackEnd Database Work Flow

tool:
 * npm module Sequelize

tool details:

 * Sequelize is a promise-based ORM for Node.js

requirements:
 * must have MySQL installed
 * must have MySql service running
 * must be able to login as root 



Sequelize CLI (helps build/run SQL queries and models with your MySQL database)
CLI docs for Sequelize can be found here:

--> http://docs.sequelizejs.com/manual/migrations.html



## Getting started:

Setup a MySQL Database
-------------

make sure you can sign in to MySQL

Use the MySql command line prompt or database visual tool i.e. MySQL Workbench
to create a new database for the application to use.


next steps you will setup Sequelize to use MySQL...


SETUP THE CONFIG
-------------

generate the config file to edit

step I.

run command ->
	sequelize init


step II.

 edit config.json to use your database

 add your database info , credentials and etc.



CREATING MODELS
---------------

Step I.

creating a simple Model

 run command ->
	sequelize mode:generate --name <ModelName> --attributes <AttributeName>:<SQL DATATYPE> , ... 


Step II.

migrate database queries

 run command ->
	sequelize db:migrate
