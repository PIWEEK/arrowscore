## webapp to API

### Login

login

POST
http://localhost:1337/api/auth/local
headers:
    - identifier: email
    - password: password
    - Content-Type: 'application/json'
    - Accept: 'application/json'

returns
{
    "jwt": "sdfsdfsdfsdfsdfsdfsdfsdfd",
    "user": {
        "id": 1,
        "username": "diacritica",
        "email": "p@p.es",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2022-07-18T17:32:39.824Z",
        "updatedAt": "2022-07-20T08:42:23.831Z",
        "Name": "Pablo"
    }
}

## createScoreSystem

POST http://localhost:1337/api/score-systems

headers
    - Content-Type: 'application/json'
    - Accept: 'application/json'
    - Authorization: "Bearer " + jwt
body

{
  "data": {
    "name": "a simple string",
    "code": null,
    "targets": [
  [
    10,
    8,
    5,
    0
  ],
  [
    10,
    8,
    5,
    0
  ],
  [
    10,
    8,
    5,
    0
  ]
],
    "author": 2
    }
}

returns:

{
    "data": {
        "id": 26,
        "attributes": {
            "name": "a simple string",
            "code": "FRVV",
            "targets": [
                [
                    10,
                    8,
                    5,
                    0
                ],
                [
                    10,
                    8,
                    5,
                    0
                ],
                [
                    10,
                    8,
                    5,
                    0
                ]
                ],
            "createdAt": "2022-07-20T11:55:16.518Z",
            "updatedAt": "2022-07-20T11:55:16.518Z",
            "publishedAt": "2022-07-20T11:55:16.514Z",
            "apiid": "FRVV"
        }
    },
    "meta": {}
}