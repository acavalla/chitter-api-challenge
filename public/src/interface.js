let allPeeps = document.querySelector('#peeps-all');
let peepsButton = document.getElementById('peep')

// peepsButton.addEventListener("click", async () => {
// }

document.addEventListener('DOMContentLoaded', () => {
  getPeeps()
  function getPeeps() {
    var peepArray = []
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
          .then(
            function(response){
              if(response.status !== 200) {
                allPeeps.innerHTML += 'Sorry, the api is not responding'
              }
              response.json().then(x=>{
                x.forEach (peep => {
                  allPeeps.innerHTML += peep.body + `</br>`
                })
              })
          })
          .catch(function(err){
            allPeeps.innerHTML += ('Error :(')
          })
  }
})
