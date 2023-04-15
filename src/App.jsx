import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario";
import ImagenCripto from './img/imagen-criptos.png'
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px)   {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  /**Dibujar Linea */
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;

  }
`

function App() {  

  const [moneys, setMoneys] = useState({});
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if( Object.keys(moneys).length > 0 ) {
      // console.log(moneys);
      const quoteCripto= async () => {
        setLoading(true);
        setResult({});

        const {moneda, criptomoney} = moneys
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoney}&tsyms=${moneda}`;
        // console.log(url);

        const answer = await fetch( url );
        const result = await answer.json();
        // console.log(result.DISPLAY[criptomoney][moneda]);

        setResult(result.DISPLAY[criptomoney][moneda]);

        setLoading(false);
      }

      quoteCripto ();
    }
  }, [moneys])
  
  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt="imagenes  criptomonedas"
      />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMoneys= {setMoneys}
        />
        
        {loading && <p><Spinner/></p>}
        {result.PRICE && <Result
                          result={result}
                        />}
      </div>
    </Contenedor>
    
  )
}

export default App
