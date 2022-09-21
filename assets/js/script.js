let pokemonName = document.querySelector(".pokedex__data--name");
let pokemonNumber = document.querySelector(".pokedex__data--number");

let fetchPokemon = async (pokemon) => {
  let APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  let data = await APIresponse.json();

  return data;
};

let renderPokemon = async (pokemon) => {
  let data = await fetchPokemon(pokemon);

  pokemonName.innerHTML = data.name;
};

renderPokemon("1");
