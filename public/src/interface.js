// let peep = new Peep
let allPeeps = document.querySelector('#peeps-all');
let peepsButton = document.getElementById('peep')

peepsButton.addEventListener("click", async () => {
  getPeepsfromPeeps()
})

function getPeeps() {
  return fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
        .then(x => x.json()).then(x=> {
              for(var i = 0; i < x.length; i++) {
                allPeeps.innerHTML += x[i]['body'] + `</br>`
              }
          })
}
// getPeeps()

async function getPeepsfromPeeps() {
  // var peeps = []
  // peeps.push(Peep.getText())
  // return peeps
  for (var i = 0; i < 51; i ++) {
    Peep.getText(i).then((x) => allPeeps.innerHTML += x.text)
  }
}
