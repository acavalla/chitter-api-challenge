class Peep {
  constructor(text) {
    this.text = text
  }
}

Peep.getText = () => {
  fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
        .then(x => x.json()).then(x=> {
              for(var i = 0; i < x.length; i++) {
                allPeeps.innerHTML += x[i]['body'] + `</br>`
              }
          })
}
