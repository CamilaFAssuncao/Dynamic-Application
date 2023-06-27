//API KEY 628264ed54b530f5de1fdea83ee1377d
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={628264ed54b530f5de1fdea83ee1377d}


let output = document.querySelector(".output");
let cityInput = document.getElementById('cityInput');
const submitButton = document.querySelector(".submit");


submitButton.addEventListener("click", predictTemp);
cityInput.addEventListener("keydown", pressEnter);
function pressEnter(event) {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
        let city = cityInput.value;
      // Code to execute when Enter key is pressed
      console.log(city);
    }
  }

function predictTemp() {
    let city = cityInput.value;
    console.log(city)

//   if (name !== '') {
//     fetch('https://api.agify.io?name=${nameInput.value}')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         output.innerHTML = "I guess your age is " + data.age;
//         previousAnswers.push(name + " is " + data.age  + " years old"); // Add the answer to previousAnswers array
//         displayPreviousAnswers(); 
//         console.log(data.age);
//       })
//       .catch(err => console.log(err));
//   } else {
//     output.style.display = 'none';
//   }
}
