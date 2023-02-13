import React from 'react';
import $ from 'jquery';

const F1 = ({ currentPage, setCurrentPage, accountHandler}) => {
  var accountInfo = {};
  var styleSettings;
  if (currentPage === 'F1') {
    styleSettings = {
      'display': 'block'
    }
  } else {
    styleSettings = {
      'display': 'none'
    }
  }
  const buttonClick = (element) => {
    console.log('account info: ', accountInfo);
    accountHandler(accountInfo.name, accountInfo.email, accountInfo.password);
  }
  return (
    <div style={styleSettings} >
      <div>
        <label>Full Name:</label>
        <input type='text' id='nameInput' placeholder='Full Name' onChange={(element) => {
          accountInfo['name'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>Email Address:</label>
        <input type='text' id='emailInput' placeholder='Email Address' onChange={(element) => {
          accountInfo['email'] = element.target.value;
        }}></input>
      </div>
      <div>
        <label>Create Password:</label>
        <input type='text' id='passwordInput' placeholder='Create Password' onChange={(element) => {
          accountInfo['password'] = element.target.value;
        }}></input>
      </div>
      <button type='button' id='F1NextButton' onClick={(element) => {
        buttonClick(element);
      }}>Next</button>
    </div>
  )
}

export { F1 };