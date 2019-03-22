# Event Check-in
#### CMPT 218 Assignment 3

## Quickstart

### Download and Install Dependencies
`git clone https://github.com/vberezny/218-A3`  
`npm install`

### Run Server
`npm start`


## Description
A simple event check-in application. Event organizers can open "checkins" for attendees to sign-in.

## Details
There are two types of users:
#### Admin
Can sign-in to:
  * Initiate a checkin session
  * Close a checkin session
    * Upon closing, all attendees will be listed
  * View checkin history
  
#### Attendee
Can check-in to an open event
