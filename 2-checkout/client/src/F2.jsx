import React from 'react';

const F2 = ({ currentPage, setCurrentPage, addressHandler}) => {
  var addressInfo = {};
  var styleSettings;
  if (currentPage === 'F2') {
    styleSettings = {
      'display': 'block'
    }
  } else {
    styleSettings = {
      'display': 'none'
    }
  }
  const buttonClick = (element) => {
    addressHandler(addressInfo.lineOne, addressInfo.lineTwo, addressInfo.city, addressInfo.state, addressInfo.zip);
  }
  return (
    <div style={styleSettings} >
      <div>
        <label>Address Line 1:</label>
        <input type='text' id='line1Input' placeholder='Address Line 1' onChange={(element) => {
          addressInfo['lineOne'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>Address Line 2:</label>
        <input type='text' id='line2Input' placeholder='Address Line 2' onChange={(element) => {
          addressInfo['lineTwo'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>City:</label>
        <input type='text' id='cityInput' placeholder='City' onChange={(element) => {
          addressInfo['city'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>State:</label>
        <input type='text' id='stateInput' placeholder='State' onChange={(element) => {
          addressInfo['state'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>Zipcode:</label>
        <input type='text' id='zipInput' placeholder='Zipcode' onChange={(element) => {
          addressInfo['zip'] = element.target.value;
        }}></input>
      </div>
      <button type='button' id='F2NextButton' onClick={(element) => {
        buttonClick(element);
      }}>Next</button>
    </div>
  )
}

export { F2 };