we first stop docker and remove volume

docker stop arrowscore-db && docker rm arrowscore-db && docker volume rm arrowscore-db-data

we then recreate the docker environment

docker run -d --name arrowscore-db -v arrowscore-db-data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=arrowscore -e POSTGRES_DB=arrowscore -e POSTGRES_PASSWORD=arrowscore postgres:14.4

## Init environment

Create a super-admin (change with your data):

```
npm run strapi -- admin:create-user --firstname=Super --lastname=Admin --email=admin@email.com --password=Admin1234
```

## Load config and initial data
```
./initial_data/load.sh