import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/moneda'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
    }
`

const Formulario = ({setMoneys}) => {

  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);

  const [criptomoney, SelectCriptoMonedy] = useSelectMonedas('Elige tu Criptomoneda', criptos);

  useEffect(() => {
    const consultarApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const respuesta = await fetch(url);
      // console.log('Respuesta ', respuesta);
      const resultado = await respuesta.json();
      // console.log(resultado);
      // console.log(resultado.Data);

      const arrayCriptos = resultado.Data.map(cripto => {
        // console.log(cripto.CoinInfo.Name);
        // console.log(cripto.CoinInfo.FullName);

        const object = {
          id: cripto.CoinInfo.Name,
          name: cripto.CoinInfo.FullName,
        }
        // console.log(object);
        return object
      });

      // console.log(arrayCriptos);
      setCriptos(arrayCriptos);
    }
    consultarApi();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if ([moneda, criptomoney].includes('')) {
      setError(true);
      return;
    }

    setError(false);
    setMoneys({
      moneda,
      criptomoney,
    })

  }


  return (
    <>
      {error && <Error>Todos los Campos son Obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >

        < SelectMonedas />
        < SelectCriptoMonedy />

        <InputSubmit type="submit"
          value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario