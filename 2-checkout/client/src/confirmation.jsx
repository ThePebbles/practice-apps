import React from 'react';

const Confirmation = ({ currentPage, setCurrentPage, confirmationHandler, summary}) => {
  var styleSettings;
  if (currentPage === 'confirmation') {
    styleSettings = {
      'display': 'block'
    }
  } else {
    styleSettings = {
      'display': 'none'
    }
  }
  if (summary.length !== 0) {
    return (
      <div style={styleSettings} >
        <h2>Account Summary:</h2>
        <div id='accountSummary' >
          <div id='nameSummary' >
            <h3>Full Name: {summary[0][0].name}</h3>
          </div>
          <div id='emailSummary' >
            <h3>Email Address: {summary[0][0].email}</h3>
          </div>
          <div id='passwordSummary' >
            <h3>Password: {summary[0][0].password}</h3>
          </div>
        </div>
        <h2>Address Summary:</h2>
        <div id='addressSummary' >
          <div id='line1Summary' >
            <h3>Address Line 1: {summary[0][0].lineOne}</h3>
          </div>
          <div id='line2Summary' >
            <h3>Address Line 2: {summary[0][0].lineTwo}</h3>
          </div>
          <div id='citySummary' >
            <h3>City: {summary[0][0].city}</h3>
          </div>
          <div id='stateSummary' >
            <h3>State: {summary[0][0].state}</h3>
          </div>
          <div id='zipSummary' >
            <h3>Zipcode: {summary[0][0].Zipcode}</h3>
          </div>
        </div>
        <h2>Billing Summary:</h2>
        <div id='billingSummary' >
          <div id='ccNumSummary' >
            <h3>Credit Card Number: {summary[0][0].creditCardNumber}</h3>
          </div>
          <div id='expSummary' >
            <h3>Expiration Date: {summary[0][0].expiration}</h3>
          </div>
          <div id='cvvSummary' >
            <h3>CVV: {summary[0][0].cvv}</h3>
          </div>
          <div id='billingZipSummary' >
            <h3>Billing Zipcode: {summary[0][0].billingZipcode}</h3>
          </div>
        </div>
        <button type='button' id='purchaseButton' onClick={() => {
          confirmationHandler();
        }}>Purchase</button>
      </div>
    )
  } else {
    return (
      <div style={styleSettings}> Hello </div>
    )
  }
}

export { Confirmation };