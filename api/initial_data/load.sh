#!/bin/bash

#################
# LOAD CONFIG
#################
echo "Load API config and initial data"
read -p 'postgres db user [default: arrowscore]: ' dbuser
read -p 'postgres db name [default: arrowscore]: ' dbname
read -p 'postgres db host [default: localhost]: ' dbhost
read -p 'postgres db port [default: 5432]: ' dbport
dbuser=${dbuser:-arrowscore}
dbname=${dbname:-arrowscore}
dbhost=${dbhost:-localhost}
dbport=${dbport:-5432}
psql -U $dbuser -h $dbhost -p $dbport -d $dbname < initial_data/initial_data.sql
