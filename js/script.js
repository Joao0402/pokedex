const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const pokemonname = document.querySelector('.pokemon_name');
const pokemonnumber = document.querySelector('.pokemo_number');
const pokemonimage = document.querySelector('.pokemon_image');

const fetchPokemon = async (pokemon) => {
    const APIResponse =  await fetch('https://pokeapi.co/api/v2/pokemon/${pokemon}');
    
    const data = await APIResponse.json();

    return data;
}

const renderPokemon = async (pokemon)=> {
    const data = await fetchPokemon(pokemon);
    pokemonname.innerHTML= data.name;
    pokemonname.innerHTML= data.id;
    pokemonimage.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}

form.addEventListener('submit', (event)=>{
event.preventDefault()
renderPokemon(input.valu);
});