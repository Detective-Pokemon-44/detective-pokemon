import crimeObject from "./crimeObject"
import { compareValue } from "./functions"

// async function gameLogic(pokemon, crime, crimeSolved, setCrimeSolved) {
//   // 0: "normal"
//   // 1: "flying"
//   
//   console.log(types)
//   let temp = []
//   crimeObject.forEach(async (individual) => {
//     const checkValue = Object.getOwnPropertyDescriptor(
//       individual,
//       crime.category
//     )
//     checkValue.configurable && temp.push(checkValue.value)
//     return temp
//   })
//   // show us the strength of 3 types
//   console.log(temp[0])
//   compareValue(temp[0], types) ? setCrimeSolved(true) : setCrimeSolved(false)

//   // const checkValue = Object.getOwnPropertyDescriptor(object1, "property1")
//   // console.log(pokemon);
//   // console.log(crime);
// }

async function gameLogic(pokemon, crime) {

    const types = pokemon.types.map(({ type }) => type.name);
    console.log(crime.category);
    const crimeValues = Object.getOwnPropertyDescriptor(crimeObject, crime.category);
    console.log('crime values=', crimeValues.value);
    console.log('types=', types)
    const solved = types.filter(type => {
        return crimeValues.value.includes(type)
    })
    console.log("solved array", solved, "and the length is", solved.length);
    if (solved.length > 0) {
        alert("YOU DID IT!")
    }
    else {
        alert("AWWWW TIME TO GO HOME!")
    }

}
export default gameLogic;