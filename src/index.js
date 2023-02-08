//remove defer from html and ad DOM ContentLoaded

const imgDiv = document.getElementById("dog-image-container");
const breedList = document.getElementById("dog-breeds");
let breeds;

function appendImages(array) {
  array.forEach(image => {
    const newImg = document.createElement("img");
    newImg.src = image;
    imgDiv.append(newImg);    
  })
}

function makeBreedList(breeds) {
  //itterate over object
  for(let breed in breeds) {
    const li = document.createElement("li")
    li.innerText = breeds[breed];
    breedList.appendChild(li);
    li.addEventListener("click", e => {
      e.target.style.color = "red";
    })
  }
}

fetch("https://dog.ceo/api/breeds/image/random/4")
.then(resp => resp.json())
.then(data => {
  appendImages(data.message);
})

fetch("https://dog.ceo/api/breeds/list/all")
.then(resp => resp.json())
.then(data => {
  breeds = Object.keys(data.message);
  console.log(breeds)
  makeBreedList(breeds)
})

const dropdown = document.querySelector("select");

dropdown.addEventListener('change', e => {

  //filter breeds. assign dropdown letter a variable (letter) then check
  // to see if letter is equal to the first letter of each breed name

  let letter = e.target.value   
  let filteredBreeds = breeds.filter(breed => {
    return breed[0] === letter;
  }) 
  
  breedList.innerText = "";

  makeBreedList(filteredBreeds);

})
