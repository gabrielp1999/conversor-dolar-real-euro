import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { mask, unMask } from 'remask';

function Converter() {
  const [dolar, setDolar] = useState();
  const [resultDolar, setResultDolar] = useState();
  const [euro, setEuro] = useState();
  const [resultEuro, setResultEuro] = useState();
  const [resultReal, setResultReal] = useState();

  useEffect(() => {
    axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL').then((response) => {
      if(response.data){
        setDolar(response.data.USDBRL.ask);
        setEuro(response.data.EURBRL.ask);
      }
    });
  },[]);


  const calculateReal = e => {
    setResultReal(e.target.value);
    setResultDolar(e.target.value / dolar);
    setResultEuro(e.target.value / euro);
  }

  const calculateDolar = e => {
    setResultReal(e.target.value * dolar);
    setResultEuro(e.target.value * euro);
    setResultDolar(e.target.value)
  }

  const calculateEuro = e => {
    setResultEuro(e.target.value);
    setResultReal(e.target.value / dolar);
    setResultDolar(e.target.value * dolar);
  }

  return (
    <section className='converter'>
      <h2>Conversor de Moedas</h2>
      <div className='coin-container'>
        <label>US$</label>
        <input 
          type='text'
          onChange={calculateDolar}
          value={resultDolar}
        />
      </div>

      <div className='coin-container'>
        <label>R$</label>
        <input 
          type='text'
          onChange={calculateReal}
          value={resultReal}
        />
      </div>

      <div className='coin-container'>
        <label>Є</label>
        <input 
          type='text'
          onChange={calculateEuro}
          value={resultEuro}
        />
      </div>
    </section>
  )
}

export default Converter;