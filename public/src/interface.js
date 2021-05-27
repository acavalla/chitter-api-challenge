let allPeeps = document.querySelector('#peeps-all');
let peepButton = document.getElementById('peep')
let newPeep = document.querySelector('#stupidnote')
let signUpButton = document.getElementById('signup')

document.addEventListener('DOMContentLoaded', () => {
  getPeeps()

  peepButton.addEventListener("click", () => {
    postPeep(newPeep.value, 442)
  })

  signUpButton.addEventListener("click", () => {
    let handle = document.getElementById('signup-handle')
    let password = document.getElementById('signup-password')
    addNewUser(handle.value, password.value)
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
  })
  responseJson = await response.json()
  localStorage.setItem("userId", responseJson.user_id)
  localStorage.setItem("sessionKey", responseJson.session_key)
}

async function postPeep(newPeep, userId) {
  await fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
    method: 'POST',
    headers: {
      'Authorization': 'Token token=_2a_12_nuCcpqyh2UcUHUSgJQmSGe',
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
