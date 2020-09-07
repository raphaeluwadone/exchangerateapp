import React, { useState, useEffect }from 'react';
import './App.css';
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";

function App() {


  const [results, setResults] = useState([])
  const [rates, setRates] = useState([])
  const [converter, setConverter] = useState("")
  const [base, setBase] = useState('')
  const [finalvalue, setFinalvalue] = useState('0')


useEffect(() => {
  axios.get("https://api.exchangeratesapi.io/latest").then((res) => {
    setResults(res.data);
    console.log(res.data)
    let arr = Object.entries((res.data.rates))
    setRates(arr)
  });
}, [rates]);

const denominator = (e) => {
  e.preventDefault()
  setBase(e.target.value);
  //  axios.get(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`).then((res) => {
  //    let arr = Object.entries(res.data.rates);
     
     console.log(base);
  //  });
}

const computation = (e) => {
  let num = e.target.value
  num = num * converter
  setFinalvalue(num)
}

  return (
    <div>
      <nav className='navbar py-4'>
        <div className='container'>
          <a className='navbar-brand text-dark text-5'>
            <b>
              <span className='brand'>Bureau de'</span>
              <br />
              <span className='rate'>Rate</span>
            </b>
          </a>
          <button className='btn btn-dark'>Base Currency:</button>
        </div>
      </nav>
      <div className='drop'>
        <div className='row'>
          <div className=' col-md-4 '>
            <p className='display-4 text-light'>
              Live Exchange
              <br /> Rate
            </p>
            <button className='btn btn-outline-light bg-success text-light px-4 mb-5 mx-auto'>
              Select date
            </button>
          </div>
          <div className='rates col-md-6 ml-auto text-center'>
            {rates.map((result) => {
              return (
                <li key={uuidv4()} className='pair'>
                  <span className='code text-success'>{result[0]}</span>
                  {"    "}
                  <span className='val'>{result[1]}</span>
                </li>
              );
            })}
          </div>
        </div>
      </div>
      <section className=' bottom'>
        <p>
          <b>
            Currency
            <br /> Converter
          </b>
        </p>
        <div>
          <select className='from' onChange={denominator}>
            {rates.map((rate) => (
              <option key={uuidv4()} value={rate[1]}>
                {rate[0]}
              </option>
            ))}
          </select>
          <select className='to' onChange={(e) => setConverter(e.target.value)}>
            {rates.map((rate) => (
              <option key={uuidv4()} value={rate[1]}>
                {rate[0]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            className='input'
            type='text'
            placeholder='Enter amount...'
            value={0}
            onChange={computation}
          />
          <div>{finalvalue}</div>
        </div>
      </section>
    </div>
  );
}

export default App;
