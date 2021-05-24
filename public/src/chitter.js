class Peep {
  constructor(text) {
    this.text = text
  }
}

Peep.getText = () => {
  fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
        .then(
          function(response){
            if(response.status !== 200) {
              allPeeps.innerHTML += 'Sorry, the api is not responding'
            }
            response.json().then(x=>{
              for(var i = 0; i < x.length; i++) {
                allPeeps.innerHTML += x[i]['body'] + `</br>`
              }
            })
        })
        .catch(function(err){
          allPeeps.innerHTML += ('Error :(')
        })
}
