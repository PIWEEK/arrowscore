We have localstorage and store

store is persistent across usages in a smartphone

store contains:
- lastsyncdatetime
- user/pass? possibily localstorage/session
- session objects
- scoresystem objects
- friends objects
- tournament objects

Any store object can be created fully but has no APIID. It has APPID, though.

On a SYNC event (triggered by the webapp):

## SEND DATA TO API

we set currentsyncdate to now

- webapp identifies all store objects modified later than lastsyncdate and authored by the user
- of all these objects, a group will have APIID and the rest won't. The ones with APIID are previously synced but changed afterwards. The ones without APIID have never been synced.

Sessions with no APIID
- createSession() returns OK/APIID

Sessions with APIID
- putSession() returns OK/APIID

ScoreSystems with no APIID (also, CODE=null) 
- createScoreSystem() returns OK/(APIID,CODE)

ScoreSystems with APIID (CODE!=null)
- putScoreSystem() returns OK/APIID


## GET DATA FROM API

- webapp needs to fetch filtered objects between lastsyncdate and currentsyncdate to avoid fetching recently sent data to the API

- getSession&filter_by$USER&modified_lt$lastsyncdate&modified_bt$currentsyncdate returns OK/ARRAY

- webapp creates two groups, new objects and modified objects (thanks to APIID check)

- webapp replaces existing objects with modified objects (the API overrides)

- webapp creates new objects

For a ScoreSystem, it is simply to fetch based on CODE

- getScoreSystem(CODE) returns OK/Object
If a local scoresystem already exists with such CODE, the webapp alerts the user