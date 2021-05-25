let allPeeps = document.querySelector('#peeps-all');
let peepButton = document.getElementById('peep')


document.addEventListener('DOMContentLoaded', () => {
  getPeeps()



  peepButton.addEventListener("click", () => {
    console.log("Iyaaaa")
  })
})

function postPeep() {

}
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
