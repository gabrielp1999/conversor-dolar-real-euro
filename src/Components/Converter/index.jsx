import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlCurrencyInput from "react-intl-currency-input";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

function Converter() {
  const [dolar, setDolar] = useState();
  const [euro, setEuro] = useState();
  const [coin, setCoin] = useState('USD');
  const [resultReal, setResultReal] = useState();
  const [valueCoin, setValueCoin] = useState();
  const maskCoin = new RegExp("^(([\\d]{1,7})(\\,([\\d]{0,2}))?)$");

  useEffect(() => {
    axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL').then((response) => {
      if(response.data){
        setDolar(response.data.USDBRL.ask);
        setEuro(response.data.EURBRL.ask);
      }
    });
  },[]);
  
    const getValueSelect = e => {
      setCoin(e.target.value);
    }


  const calculateReal = (_e, value, maskedValue) => {
    _e.preventDefault();
    if(maskedValue && coin === 'USD'){
      setValueCoin(value / parseFloat(dolar));
    }else{
      setValueCoin(value / parseFloat(euro));
    }
    setResultReal(maskedValue);
  }

  const calculateCoin = e => {
    if(e.target.value && coin === 'USD'){
      setResultReal(parseFloat(e.target.value) * parseFloat(dolar));
    }else{
      setResultReal(parseFloat(e.target.value) * parseFloat(euro));
    }
    setValueCoin(parseFloat(e.target.value));
  }
  
  return (
    <section className='converter'>
      <h2>Conversor de Moedas</h2>

      <div className='coin-container'>
        <label>R$</label>
        {/* <input
          placeholder='Digite o valor'
          onChange={calculateReal}
          value={resultReal} 
        /> */}
         <IntlCurrencyInput 
          currency="BRL" 
          config={currencyConfig}
          onChange={calculateReal} />
      </div>
      <div className='coin-container'>
        <label>Moeda</label>
        <select 
          className='styleSelect'
          onChange={getValueSelect}>
          <option value='USD'>Dolar</option>
          <option value='€'>Euro</option>
        </select>
      </div>
       <div className='coin-container'>
        <label>{coin === "USD" ? "USD": "€"}</label>
        <inpIntlCurrencyInputut 
          placeholder='Digite o valor'
          onChange={calculateCoin}
          value={valueCoin}
        />
      </div>
    </section>
  )
}

export default Converter;