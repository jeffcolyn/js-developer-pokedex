

let currentPokemonNumber = null;


function loadPreviousPokemon() {
    if (currentPokemonNumber > 1) {
        const previousPokemonNumber = currentPokemonNumber - 1;
        loadPokemonDetails(previousPokemonNumber);
    }
}


function loadNextPokemon() {
    if (currentPokemonNumber < 898) { // Ajuste esse número conforme a quantidade de Pokémon disponíveis
        const nextPokemonNumber = currentPokemonNumber + 1;
        loadPokemonDetails(nextPokemonNumber);
    }
}


document.getElementById('previous-button').addEventListener('click', loadPreviousPokemon);
document.getElementById('next-button').addEventListener('click', loadNextPokemon);


pokemonDetailedPage.getPokemonDetail = (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    return fetch(url)
        .then((response) => response.json())
        .then(pokemonDetailedPage.convertPokeApiDetailToPokemon)
        .then((pokemon) => {
            currentPokemonNumber = pokemon.number;
            loadPokemonDetails(currentPokemonNumber); 
        });
};
function loadPokemonDetails(pokemonNumber) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    const pokemonDataPromise = fetch(url)
        .then((response) => response.json())
        .then(pokemonDetailedPage.convertPokeApiDetailToPokemon)
        .then((pokemon) => {
           
            document.getElementById('background-color').classList.add(pokemon.types[0]);
            document.getElementById('number').innerHTML = `#${pokemon.number}`;
            document.getElementById('name').innerHTML = pokemon.name;
            document.getElementById('types').innerHTML = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
            document.getElementById('weight').innerHTML = pokemon.weight;
            document.getElementById('height').innerHTML = pokemon.height;
            document.getElementById('abilities').innerHTML = pokemon.abilities.map((ability) => `<div>${ability}</div>`).join('|');
            document.getElementById('picture').innerHTML = `<img src="${pokemon.photo2}">`;
            pokemonDetailedPage.getMorePokemonDetail(pokemon);
            pokemonDetailedPage.getNumberFormated(pokemon);
        });

    pokemonDataPromise.catch((error) => {
        window.location.href = "index.html";
    });
}









