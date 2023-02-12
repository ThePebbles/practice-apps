import React from 'react';
import { useState } from 'react';

const FilterView = ({ filterEntries, getEntries }) => {
  const [filter, setFilter] = useState('');
  const filterWords = () => {
    filterEntries(filter);
  }
  const styleSettings = {
    width: '270px'
  }
  return (
    <div>
      <input type='text' style={styleSettings} className='filterText' placeholder='Only show me words/definitions that include:' onChange={(element) => {
        setFilter(element.target.value);
      }}></input>
      <button type='button' className='searchFilterButton' onClick={(element) => {
        filterWords();
      }}>Show Filtered Results</button>
      <button type='button' className='clearFilterButton' onClick={() => {
        getEntries();
      }} >Clear Filters</button>
    </div>
  )
}

export { FilterView };