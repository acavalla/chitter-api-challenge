# chitter-api-challenge

This is the chitter api challenge from [Makers Academy](https://github.com/Makers-Academy), in which the backend is hosted on Heroku [here](https://chitter-backend-api-v2.herokuapp.com/), and the task is to build an API connection and front end to interact with the backend with various http requests.

The main purpose of this for me is to get more familiar with fetch, promises, and async functions.

I'd like to work on posting peeps before I go into users and sessions. However, posting a peep requires a session key, so I'm going to create a new user and login via the terminal:

`curl "https://chitter-backend-api-v2.herokuapp.com/users" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user": {"handle":"acava", "password":"`redacted`"}}'`
