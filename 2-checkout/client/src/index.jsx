import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { F1 } from './F1.jsx';
import { F2 } from './F2.jsx';
import { F3 } from './F3.jsx';
import { Confirmation } from './confirmation.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])

  const getStuff = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3030/',
      data: {},
      success: (data) => {
        console.log('success from get: ', JSON.stringify(document.cookie, undefined, "\t"));
      },
      error: (err) => {
        console.log('error from get: ', err);
      }
    })
  }

  const accountHandler =(name, email, password) => {
    console.log('ajax: ', name, email, password);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3030/account',
      data: {'name': name, 'email': email, 'password': password},
      success: (data) => {
        console.log('success from account post: ', data);
        setCurrentPage('F2')
      },
      error: (err) => {
        console.log('error from get: ', err);
      }
    })
  }

  const addressHandler =(line1, line2, city, state, zip) => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3030/address',
      data: {'line1': line1, 'line2': line2, 'city': city, 'state': state, 'zip': zip},
      success: (data) => {
        console.log('success from address post: ', data);
        setCurrentPage('F3')
      },
      error: (err) => {
        console.log('error from get: ', err);
      }
    })
  }

  const billingHandler =(ccNum, exp, cvv, billingZip) => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3030/billing',
      data: {'ccNum': ccNum, 'exp': exp, 'cvv': cvv, 'billingZip': billingZip},
      success: (data) => {
        console.log('success from billing post: ', data);
        getConfirmationData();
      },
      error: (err) => {
        console.log('error from billing post: ', err);
      }
    })
  }
  const getConfirmationData = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3030/confirmation',
      data: {},
      success: (data) => {
        console.log('success from getting data for confirmation page: ', data);
        setSummary(data);
        setCurrentPage('confirmation');
      },
      error: (err) => {
        console.log('error from get: ', err);
      }
    })
  }

  const confirmationHandler =() => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3030/confirmation',
      data: {'didPurchase': 1},
      success: (data) => {
        console.log('success from confirmation post: ', data);
        setCurrentPage('home');
        document.getElementById('checkout').style.display = 'block';
      },
      error: (err) => {
        console.log('error from get: ', err);
      }
    })
  }

  const idCheck = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3030/id',
      data: {},
      success: (data) => {
        if (data === 'home') {
          alert('You Purchase has been successful! Thank you!');
          document.getElementById('checkout').style.display = 'block';
        }
        setCurrentPage(data);
      },
      error: (err) => {
        console.log('error from get: ', err);
      }
    })
  }

  return (
    <div>
    <p>Welcome to Generic Shopping App Name!</p>
    <button id='checkout' onClick={(element) => {
      element.target.style.display = 'none';
      idCheck();
    }}>checkout</button>
    <F1 currentPage={currentPage} setCurrentPage={setCurrentPage} accountHandler={accountHandler} />
    <F2 currentPage={currentPage} setCurrentPage={setCurrentPage} addressHandler={addressHandler} />
    <F3 currentPage={currentPage} setCurrentPage={setCurrentPage} billingHandler={billingHandler} />
    <Confirmation currentPage={currentPage} setCurrentPage={setCurrentPage} confirmationHandler={confirmationHandler} summary={summary} />
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
