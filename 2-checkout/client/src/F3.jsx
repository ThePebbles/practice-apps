import React from 'react';

const F3 = ({ currentPage, setCurrentPage, billingHandler}) => {
  var billingInfo = {};
  var styleSettings;
  if (currentPage === 'F3') {
    styleSettings = {
      'display': 'block'
    }
  } else {
    styleSettings = {
      'display': 'none'
    }
  }
  const buttonClick = (element) => {
    billingHandler(billingInfo.ccNum, billingInfo.exp, billingInfo.cvv, billingInfo.billingZip);
  }
  return (
    <div style={styleSettings} >
      <div>
        <label>Credit Card Number:</label>
        <input type='text' id='ccNumInput' placeholder='Credit Card Number' onChange={(element) => {
          billingInfo['ccNum'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>Expiration Date:</label>
        <input type='text' id='expInput' placeholder='Expiration Date' onChange={(element) => {
          billingInfo['exp'] = element.target.value;
        }}></input>
      </div>
      <div>
      <label>CVV:</label>
        <input type='text' id='cvvInput' placeholder='CVV' onChange={(element) => {
          billingInfo['cvv'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>Billing Zipcode:</label>
        <input type='text' id='billingZipInput' placeholder='Billing Zipcode' onChange={(element) => {
          billingInfo['billingZip'] = element.target.value;
        }}></input>
      </div>
      <button type='button' id='F3NextButton' onClick={(element) => {
        buttonClick(element);
      }}>Next</button>
    </div>
  )
}

export { F3 };