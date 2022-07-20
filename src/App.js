import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FAAppletClient } from "./Util";

function App() {
  const [data, setData] = useState(null);
  const [poke, setPoke] = useState("pikachu");

  let faAppletService = new FAAppletClient({
    appletId: "aHR0cHM6Ly9nZW51aW5lLXB1ZmZwdWZmLTY2YjA2ZS5uZXRsaWZ5LmFwcA==",
  });

  const crearPokemon = () => {
    console.log(data.name, "pokemonAEnviar");
    faAppletService.createEntity({
      entity: "pokemon",
      field_values: {
        description: data.name,
      },
    });
  };

  const onChangeHandler = (e) => {
    setPoke(e.target.value);
  };
  function Cambios() {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [poke]);

  if (!data) {
    return null;
  }

  return (
    <div className='App'>
      <div className='tarjeta'>
        <div>
          <input
            placeholder='Busca tu pokemon'
            type='text'
            id='pokename'
            onChange={onChangeHandler}
          />
          <button onClick={Cambios}>Buscar Pokemon</button>
        </div>
        <div className='nombre'>{data.name}</div>
        <div className='linea'></div>
        <div className='areaPokemon'>
          <img
            alt='pokemon'
            src={data.sprites.front_default}
            className='imagen'
          />
        </div>
        <button onClick={crearPokemon()}>Create Pokemon</button>
        <div>
          **pokemons to try**
          <p>bulbasaur</p>
          <p>ivysaur</p>
          <p>venusaur</p>
          <p>charmander</p>
          <p>charmeleon</p>
          <p>charizard</p>
          <p>squirtle</p>
          <p>wartortle</p>
          <p>blastoise</p>
          <p>caterpie</p>
          <p>metapod</p>
          <p>kakuna</p>
          <p>weedle</p>
        </div>
      </div>
    </div>
  );
}

export default App;
