let allPeeps = document.querySelector('#peeps-all');
let peepButton = document.getElementById('peep')
let newPeep = document.querySelector('#stupidnote')
let signUpButton = document.getElementById('signup')
let signInButton = document.getElementById('signin')
let signOutButton = document.getElementById('signout')
let infoSpot = document.getElementById('info-spot')

document.addEventListener('DOMContentLoaded', () => {
  getPeeps()

  peepButton.addEventListener("click", () => {
    if(localStorage.userId) {
      infoSpot.innerHTML = ''
      postPeep(newPeep.value, localStorage.userId, localStorage.sessionKey)
    } else {
      infoSpot.innerHTML = 'Please sign in'
    }
  })

  signUpButton.addEventListener("click", () => {
    let handle = document.getElementById('signup-handle')
    let password = document.getElementById('signup-password')
    addNewUser(handle.value, password.value)
  })

  signInButton.addEventListener("click", () => {
    let handle = document.getElementById('signin-handle')
    let password = document.getElementById('signin-password')
    signInUser(handle.value, password.value)
  })

  signOutButton.addEventListener("click", () => {
    localStorage.clear()
  })
})

async function addNewUser(handle, password) {
  response = await fetch("https://chitter-backend-api-v2.herokuapp.com/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: {'handle':handle, 'password':password}})
  })
  responseJson = await response.json()
  signInUser(responseJson.handle, password)
}

async function signInUser(handle, password) {
  response = await fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({session: {'handle':handle, 'password':password}})
  }).then(
    function(response){
      if(response.status !== 200) {
        infoSpot.innerHTML = 'Incorrect username or password'
      }
      response.json().then(x=>{
        if(x.user_id){
          localStorage.clear()
          localStorage.setItem("userId", x.user_id)
          localStorage.setItem("sessionKey", x.session_key)
          infoSpot.innerHTML = `Welcome, ${handle}`
        }
      })
  })
  .catch(function(err){
    infoSpot.innerHTML = ('Error :(')
  })
}

async function postPeep(newPeep, userId, token) {
  await fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
    method: 'POST',
    headers: {
      'Authorization': `Token token=${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({peep: {'user_id':userId, 'body':newPeep}})
  })
  getPeeps()
}

function getPeeps() {
  fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
        .then(
          function(response){
            if(response.status !== 200) {
              allPeeps.innerHTML += 'Sorry, the api is not responding'
            }
            response.json().then(x=>{
              allPeeps.innerHTML = ''
              x.forEach (peep => {
                allPeeps.innerHTML += peep.body + `</br>`
              })
            })
        })
        .catch(function(err){
          allPeeps.innerHTML += ('Error :(')
        })
}
