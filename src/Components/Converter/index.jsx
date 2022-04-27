import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlCurrencyInput from "react-intl-currency-input";
import InputMoney from '../InputMoney';

function Converter() {
  const [dolar, setDolar] = useState();
  const [euro, setEuro] = useState();
  const [coin, setCoin] = useState('USD');
  const [resultReal, setResultReal] = useState();
  const [valueCoin, setValueCoin] = useState();

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

  const calculateCoin = (_e, value, maskedValue) => {
    _e.preventDefault();
    if(value && coin === 'USD'){
      setResultReal(parseFloat(value) * parseFloat(dolar));
    }else{
      setResultReal(parseFloat(value) * parseFloat(euro));
    }
    setValueCoin(maskedValue);
  }  

  return (
    <section className='converter'>
      <h2>Conversor de Moedas</h2>

    <div className='container'>
        <InputMoney 
          currency="BRL" 
          label="Real" 
          locale="pt-BR"
          onChange={calculateReal}
          value={resultReal} 
        />
        <div className='card'>
          <label>Moeda</label>
          <select 
            className='styleSelect'
            onChange={getValueSelect}>
            <option value='USD'>Dolar</option>
            <option value='€'>Euro</option>
          </select>
        </div>
      </div>
      {coin === 'USD' && 
      <InputMoney 
        currency="USD" 
        label="Dolar" 
        locale="USD"
        onChange={calculateCoin}
        value={valueCoin} 
      />}
      {coin === '€'&&
        <InputMoney 
          currency="EUR" 
          label="Euro" 
          locale="EUR"
          onChange={calculateCoin}
          value={valueCoin} 
        />}
    </section>
  )
}

export default Converter;