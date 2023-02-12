import React from 'react';
import { useState } from 'react';
import $ from 'jquery';

const EntryListView = ({ entries, editWord, deleteWord }) => {
  // const [currentWord, setCurrentWord] = useState('');
  // const [currentDefinition, setCurrentDefinition] = useState('');

  // const editEntry = () => {
  //   editWord();
  // }
  // const deleteEntry = (value) => {
  //   console.log('this is big value entrylistview:', element.target.closest('.word').innerText)
  //   deleteWord();
  // }
  const entryList = entries.map((entry) => {
    return (
      <div>
        <div className='word'>
          {entry.word + ':'}
        </div>
        <div className='definition'>
          {entry.definition}
        </div>
        <button type='button' className='editButton'> Edit </button>
        <button type='button' className='deleteButton'> Delete </button>
      </div>
    )
  })

  return(
    <div>
      {entryList}
    </div>
  )
}

export { EntryListView };