import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [poke, setPoke] = useState("pikachu");

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
          <button onClick={Cambios}>Buscar</button>
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
      </div>
    </div>
  );
}

export default App;
