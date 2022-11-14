import { useState, useEffect } from "react";
import crimeObject from "../utils/crimeObject";
import gameLogic from "../utils/logic";
import Score from "./Score";



export default function CrimeSceneModal({
  pokemon,
  crimeSelected,
  handleLocation,
  username,
  score,
  setScore,
  toggleModal
}) {
  const [pokemonSelectionID, setPokemonSelectionID] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [crimeSolved, setCrimeSolved] = useState(null);

  const handleButtonSwitch = (e) => {
    setPokemonSelectionID(parseInt(e.target.value));
  };

  const handleFormSubmit = (e, pokemonId) => {
    e.preventDefault();
    if (pokemonId) {
      const pokemonFoundById = pokemon.find(
        (pokemon) => pokemon.id === pokemonId
      );
      console.log(pokemonFoundById);
      setSelectedPokemon(pokemonFoundById);
    } else {
      alert("PICK SOMETHING");
    }
  };

  // call game logic on pokemon selection from modal
  useEffect(() => {
    if (selectedPokemon !== null) {
      const trueOrFalse = gameLogic(selectedPokemon, crimeSelected, setScore);
      setCrimeSolved(trueOrFalse);
    }
  }, [selectedPokemon]);


  return (
    <>
      {!selectedPokemon && !crimeSolved ? (
        <>
          <div className="CrimeSceneModal-close-button-container" onClick={() => toggleModal(false)}>
            <img src={require("../assets/images/closebutton.svg")} alt="Close Modal" />
          </div>
          <form onSubmit={(e) => handleFormSubmit(e, pokemonSelectionID)}>
            <div className="CrimeSceneModal-textContainer">
              <h4>{crimeObject[crimeSelected.category].alternate}</h4>
              <p>{crimeObject[crimeSelected.category].backstory}</p>
              <p><b>Crime's location:</b>
                {
                  crimeSelected.location.street.name.length <= 11 ?
                    ` Sorry got nothing for ya ${username}` :
                    ' ' + (crimeSelected.location.street.name).substring(11)
                }
              </p>
            </div>
            <fieldset
              onChange={handleButtonSwitch}
              className="CrimeSceneModal-fieldset"
            >
              <legend>Which Pokemon Detective can solve this mystery?</legend>

              {pokemon.map((pokemonInfo) => {
                return (
                  <div
                    className="CrimeSceneModal-container"
                    key={pokemonInfo.id}
                  >
                    <label htmlFor={pokemonInfo.name}>
                      <img
                        className="CrimeSceneModal-image"
                        src={require(`../assets/svgPokemon/${pokemonInfo.id}.svg`)}
                        alt={pokemonInfo.name}
                      />
                    </label>
                    <input
                      type="radio"
                      id={pokemonInfo.name}
                      name="pokemon"
                      value={pokemonInfo.id}
                      className="CrimeSceneModal-input"
                    ></input>
                  </div>
                );
              })}
            </fieldset>
            <div className="CrimeSceneModal-container-button">
              <button type="submit">Select Pokemon</button>
            </div>
          </form>
        </>
      ) : crimeSolved === true ? (
        <div className="CrimeSceneModal-resultsContainer">
          <div className="CrimeSceneModal-textContainer">
            <h4>You solved the case</h4>
            <p>{crimeObject[crimeSelected.category].solved}</p>
          </div>
          <button onClick={() => handleLocation(null)}> Take me Home</button>
          <Score username={username} score={score} />
        </div>
      ) : (

        <div className="CrimeSceneModal-resultsContainer">
          <div className="CrimeSceneModal-textContainer">
            <h4>You failed the case!</h4>
            <h5>{crimeObject[crimeSelected.category].alternate}</h5>
            <p>{crimeObject[crimeSelected.category].failed}</p>
          </div>
          <button onClick={() => handleLocation(null)}> Take me Home</button>
          <Score username={username} score={score} />
        </div>

      )}

    </>
  );
}
