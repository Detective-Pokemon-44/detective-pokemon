import crimeObject from "./crimeObject"

async function gameLogic(pokemon, crime) {

    const types = pokemon.types.map(({ type }) => type.name);
    const crimeValues = Object.getOwnPropertyDescriptor(crimeObject, crime.category);
    const solved = types.filter(type => {
        return crimeValues.value.includes(type)
    })
    if (solved.length > 0) {
        alert("YOU DID IT!")
        return true
    }
    else {
        alert("AWWWW TIME TO GO HOME!")
        return false
    }

}
export default gameLogic;