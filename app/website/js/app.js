document.querySelector("#generate").addEventListener("click", performAction);

function performAction(e){
  e.preventDefault()
  let d = new Date();
  let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();
  const ZIP = document.querySelector("#zip").value;
  const feeling = document.querySelector("#feelings").value;

  const BASE_URL = `/weather/${ZIP}`;
  fetch(`${BASE_URL}`)
  .then(RESPONSE => RESPONSE.json())
  .then(data => {
    changeUI(data,feeling,newDate)
    return data})
  .catch(error => checkInput(ZIP))
}

function checkInput(ZIP){
  if(ZIP.length === 0 || isNaN(ZIP)){
    document.querySelector("#content").innerHTML = "Please fill in with correct zip code number";
    document.querySelector("#date").innerHTML = "";
    return false
  }
}

function changeUI(data, feeling, newDate){
  let date = document.querySelector("#date").innerHTML = `Date: ${newDate}`;
  let temp = document.querySelector("#temp").innerHTML =  `Temperature: ${data.main.temp}&deg;`;
  let content = document.querySelector("#content").innerHTML = `Feeling: ${feeling}`;

  const postData = function(url = "", data){
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      
    })
  }
  postData(`/test`, {date: date, temp: temp, feeling: content})
}
