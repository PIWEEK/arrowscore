## User
- username
- password
- name
- email
- active (boolean)
- sessions (m-to-n session) [1]
- tournaments (m-to-n tournament)
- scoresystems (1-to-n scoresystem)
- friends (user)

## session
- name
- place
- date (auto)
- users (m-to-n user) [1]
- scoresystem (1-to-n scoresystem)
- tournament (1-to-n tournament)
- userscores

userscores is list of tuples user/score where score starts as a blank replica of the session's scoresystem

## tournament
- name
- description
- place
- GPScoord
- startdatetime
- enddatetime
- scoresystem (1-to-n scoresystem)

## scoresystem
- name
- targets (list of list)


A target under scoresystem is

- a list of targets where each target has
    - a list of arrows where each arrow has
       - a specific list of valid scores

EASY example
12 targets, 2 arrows each, 11-10-8-5-0 as valid scores would be

name = WA 3D 4zones half
[[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],]

ADVANCED example
3 targets, target 1 has 1 arrow and 10 or 0 for score, target 2 has 2 arrows and 10,5,0 for first arrow and 10 or 0 for second, target 3 has 3 arrows with -20,-10,0 for all three

name = Dragon challenge
[[[10,0]], [[10,5,0],[10,0]], [[-20.-10,0],[-20.-10,0],[-20.-10,0]]]

Alternatively, this can be a dictionary of targets instead of an ordered list of targets. Also, a dictionary of arrows pero target instead of an orderes list of arrows