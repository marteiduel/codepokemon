import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/pikachu"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className='App'>
      <div className='tarjeta'>
        <div className='nombre'>{data.name}</div>
        <div className='linea'></div>
        <div className='areaPokemon'>
          <img
            alt='pokemon'
            src={data.sprites.back_female}
            className='imagen'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
