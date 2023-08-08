// Select the elements
const basicUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const toDisplay = document.querySelector(".toDisplay");
const sound = document.querySelector("#sound");
const searchBtn = document.querySelector("#search-btn");

//
searchBtn.addEventListener("click", () => {
  // Get the word I am looking for
  let inputWord = document.querySelector("#word-input").value;
  // fetch the word I am looking for
  fetch(`${basicUrl}${inputWord}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      toDisplay.innerHTML = `
      
        <div class="word-and-audio">
          <h2>${inputWord}</h2>
          <button onclick = "playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="type-and-phonetic">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>
        <p class="meaning">
          <span>MEANING: ${
            data[0].meanings[0].definitions[0].definition || ""
          }</span>
        </p>
        <p class="origin">
        <span>Origin: ${data[0].origin || ""}</span>
        </p>
        <p class="example">
          <span>EXAMPLE: <br> ${
            data[0].meanings[0].definitions[0].example || ""
          }</span>
        </p>
        <p class="synonymes">
        <span>Synonyms: ${
          data[0].meanings[0].definitions[0].synonyms || ""
        }</span>
        </p>
        <p class="antonyms">
        <span>Antonyms: ${
          data[0].meanings[0].definitions[0].antonyms || ""
        }</span>
        </p>`;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      toDisplay.innerHTML = `<h3 class='not-found'>Couldn't Find The Word</h3>`;
    });
});

function playSound() {
  sound.play();
}
