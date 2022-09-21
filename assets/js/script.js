let pokemonName = document.querySelector(".pokedex__data--name");
let pokemonNumber = document.querySelector(".pokedex__data--number");
let pokemonImage = document.querySelector(".pokedex__pokemon");

let form = document.querySelector(".pokedex__form");
let input = document.querySelector(".pokedex__form--input");
let buttonPrev = document.querySelector(".btn-prev");
let buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

let fetchPokemon = async (pokemon) => {
  let APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIresponse.status === 200) {
    let data = await APIresponse.json();
    return data;
  }

  let data = await APIresponse.json();

  return data;
};

let renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  let data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Pokemon não encontrado";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
