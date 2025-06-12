const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonTypesContainer = document.querySelector('.pokemon_types');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let currentPokemon = 1;

const typeIcons = {
  normal: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg',
  fire: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg',
  water: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg',
  electric: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg',
  grass: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg',
  ice: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg',
  fighting: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg',
  poison: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg',
  ground: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg',
  flying: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg',
  psychic: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg',
  bug: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg',
  rock: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg',
  ghost: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg',
  dragon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg',
  dark: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg',
  steel: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg',
  fairy: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg'
};

const fetchPokemon = async (pokemon) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
if (response.ok) {
  return await response.json();
}

  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
  }
  return null;
};

const renderPokemon = async (pokemon) => {
  pokemonName.textContent = 'Carregando...';
  pokemonNumber.textContent = '';
  pokemonImage.src = '';
  pokemonTypesContainer.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;
    pokemonImage.src =
      data.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
      data.sprites?.front_default ||
      '';

    data.types.forEach((typeInfo) => {
      const typeName = typeInfo.type.name;
      const typeDiv = document.createElement('div');
      typeDiv.classList.add('pokemon_type');

      const typeIcon = document.createElement('img');
      typeIcon.src = typeIcons[typeName] || '';
      typeIcon.alt = typeName;

      const typeLabel = document.createElement('span');
      typeLabel.textContent = typeName;

      typeDiv.appendChild(typeIcon);
      typeDiv.appendChild(typeLabel);
      pokemonTypesContainer.appendChild(typeDiv);
    });

    currentPokemon = data.id;
    input.value = '';
  } else {
    pokemonName.textContent = 'Não encontrado :(';
    pokemonNumber.textContent = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.trim());
});

buttonPrev.addEventListener('click', () => {
  if (currentPokemon > 1) {
    currentPokemon--;
    renderPokemon(currentPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  currentPokemon++;
  renderPokemon(currentPokemon);
});

renderPokemon(currentPokemon);