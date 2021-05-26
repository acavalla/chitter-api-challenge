let allPeeps = document.querySelector('#peeps-all');
let peepButton = document.getElementById('peep')
let newPeep = document.querySelector('#stupidnote')

document.addEventListener('DOMContentLoaded', () => {
  getPeeps()

  peepButton.addEventListener("click", () => {
    postPeep(newPeep.value)
  })
})

async function postPeep(newPeep) {
  await fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
    method: 'POST',
    headers: {
      'Authorization': 'Token token=_2a_12_nuCcpqyh2UcUHUSgJQmSGe',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({peep: {'user_id':442, 'body':`${newPeep}`}})
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
