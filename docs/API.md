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

### createScoreSystem

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
    "apiid": null,
    "localcreatedAt": "2022-07-20T11:55:16.518Z",
    "localupdatedAt": "2022-07-20T11:55:16.518Z",
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

### getScoreSystem

We need to ask for $CODE in the webapp

GET http://localhost:1337/api/score-systems?filters[code][$eq]=$CODE

headers
    - Content-Type: 'application/json'
    - Accept: 'application/json'
    - Authorization: "Bearer " + jwt

body

{
    "data": [
        {
            "id": 2,
            "attributes": {
                "name": "IFAA 3D STD",
                "code": "I3DS",
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
                    ],
                    [
                        10,
                        8,
                        5,
                        0
                    ]
                ],
                "createdAt": "2022-07-19T11:00:03.268Z",
                "updatedAt": "2022-07-20T08:43:56.596Z",
                "publishedAt": "2022-07-19T11:50:14.129Z",
                "apiid": "123456",
                "author": {
                    "data": {
                        "id": 1,
                        "attributes": {
                            "username": "diacritica",
                            "email": "p@p.es",
                            "provider": "local",
                            "confirmed": true,
                            "blocked": false,
                            "createdAt": "2022-07-18T17:32:39.824Z",
                            "updatedAt": "2022-07-20T08:42:23.831Z",
                            "Name": null
                        }
                    }
                },
                "sessions": {
                    "data": []
                }
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 25,
            "pageCount": 1,
            "total": 1
        }
    }
}

### createSession

POST http://localhost:1337/api/sessions

headers
    - Content-Type: 'application/json'
    - Accept: 'application/json'
    - Authorization: "Bearer " + jwt

body

{
  "data": {
    "name": "a simple string",
    "place": "a simple string",
    "when": "2022-07-18T17:32:39.824Z",
    "users": [1,2],
    "score_system": [1],
    "scores": JSON with an entry per user,
    "finished": true #we don't actually sync unfinished sessions, they are kept unsynced
    "apiid": null
    }
}

### getSessions (only the ones we're listed as users)


GET http://localhost:1337/api/sessions?filters\[users\][username][$eq]=$username&populate=*

$username is the one for this user in the API