import React from 'react';
import IntlCurrencyInput from "react-intl-currency-input";
import './style.css';

function InputMoney({ label, currency, locale, value, onChange }) {

  const getConfig = (locale) => {
    return {
      locale: locale,
      formats: {
        number: {
          BRL: {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          USD: {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          EUR: {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        },
      },
    };
  }

  return(
    <div className='wrapper'>
      <label>{label}</label>
        <IntlCurrencyInput 
        currency={currency} 
        config={getConfig(locale)}
        placeholder='Digite o valor'
        value={value} 
        onChange={onChange} 
      />
    </div>
  )
}

export default InputMoney;