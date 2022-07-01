import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

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

  return (
    <div className='App'>
      <div className='tarjeta'>
        <div className='nombre'>{data.name}</div>
        <div className='linea'></div>
        <img alt='pokemon' src={data.sprites.back_default} className='imagen' />
      </div>
    </div>
  );
}

export default App;
