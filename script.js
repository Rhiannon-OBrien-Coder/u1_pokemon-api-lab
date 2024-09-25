const button = document.querySelector('#btn')
const pokeInput = document.querySelector('#searchbar')
const imageContainer = document.querySelector('#imgContainer')
const finalName = document.querySelector('#name')
const finalEvolutions = document.querySelector('#evolutions')
const finalTypes = document.querySelector('#types')
const finalWeight = document.querySelector('#weight')
const finalHeight = document.querySelector('#height')
const finalFT = document.querySelector('#flavorText')
const pokedexImg = document.querySelector('.pokedexImg')
const pokedexContent = document.querySelector('.pokedexContent')

button.addEventListener('click', async () => {
    pokedexContent.style.opacity = 1
    pokedexImg.style.opacity = 1

    let pokemon = pokeInput.value.toLowerCase()

    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )
    console.log(response)

    let pokeImg = response.data.sprites.front_default
    imageContainer.setAttribute('src', `${pokeImg}`)

    let weight = response.data.weight
    weight = weight /10
    finalWeight.innerText = `Weight: ${weight}kg`

    let height = response.data.height
    height = height /10
    finalHeight.innerText = `Height: ${height}m`

    let typesArray = response.data.types
    finalTypes.textContent = 'Type(s): '
    for (typeObject of typesArray) {
        finalTypes.append(`${typeObject.type.name} `)
    }

    let speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
    )
    console.log(speciesResponse)

    let name = speciesResponse.data.name
    finalName.innerText = `Species: ${name}`

    let flavorTextArray = speciesResponse.data.flavor_text_entries
    let flavorText = ""
    for (i=0; i<flavorTextArray.length; i++) {
        if (i === 1) {
            flavorText = flavorTextArray[i].flavor_text
        }
    }
    finalFT.innerText = flavorText
    console.log(flavorTextArray)
    
    let evolve = speciesResponse.data.evolves_from_species
    console.log(evolve)
    if (evolve === null) {
        finalEvolutions.innerText = `Baby!`
    }else{
    finalEvolutions.innerText = `Evolves from: ${evolve.name}`
    }
})