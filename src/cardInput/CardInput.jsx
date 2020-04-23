import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
import StringMask from 'string-mask';
const cardPattern = new StringMask('0000 0000 0000 0000 000');

  function validateCard(_, value, callback){
    if (value && value.length >= 13){
      if (!handleValidateBandeira(value)){
        callback("null");
      }
      else {
        callback();
      }
    }
  }

  function handleValidateBandeira(cartao) { 
    let bandeira = null;
    if (cartao.length >= 13){
      if (cartao.match(/^(636368|636369|438935|504175|451416|636297|636296|506699|5067|4576|4011|36297|5067|4576|4011|650|509)/gi))
        bandeira = 'ELO';

      if (cartao.match(/^(606282|3841)/gi) && bandeira == null) 
        bandeira = 'Hipercard'; 

      if (cartao.match(/^6(?:011|5[0-9]{2})[0-9]{12}$/gi) && bandeira == null) 
        bandeira = 'DISCOVER'; 

      if (cartao.match(/^(301|305|36|38|30)/gi) && bandeira == null)  
        bandeira = 'Diners'; 

      if (cartao.match(/^(34|37)/gi) && bandeira == null) 
        bandeira = 'AMEX'; 

      if (cartao.match(/^(50)/gi) && bandeira == null) 
        bandeira = 'AURA'; 

      if (cartao.match(/^(?:2131|1800|35\d{3})\d{11}$/gi) && bandeira == null)
        bandeira = 'JCB'; 

      if (cartao.match(/^(60)/gi) && bandeira == null) 
        bandeira = 'hipercard'; 

      if (cartao.match(/^(4)/gi) && bandeira == null) 
        bandeira = 'VISA'; 

      if (cartao.match(/^(5)/gi) && bandeira == null) 
        bandeira = 'MASTERCARD'; 
    }
    return bandeira;
  }

class CardInput extends Component {
  render() {
    const {
      format,
      clearValue,
      ...rest
    } = this.props;

    return (
      <MaskInput 
        {...rest}
        clearValue={(rawValue) => rawValue.replace(/[^\d]/g, '').slice(0, 19)}
        format={(cleanValue) => (cardPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '')}/>
    );
  }
}

export default CardInput;
 export {validateCard, handleValidateBandeira};