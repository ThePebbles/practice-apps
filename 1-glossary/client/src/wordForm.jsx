import React from 'react';
import { useState } from 'react';

const WordForm = ( { addWord }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentDefinition, setCurrentDefinition] = useState('');
  const submitWord = () => {
    var word = currentWord;
    var definition = currentDefinition;
    document.getElementById('addWord').value = '';
    document.getElementById('addDefinition').value = '';
    addWord(word, definition);
  }

  return (
    <div>
      <div>
        <input type='text' id='addWord' placeholder='Add New Word' onChange={(element) => {
          setCurrentWord(element.target.value);
        }}></input>
      </div>
      <div>
        <input type='text' id='addDefinition' placeholder='Add New Definition' onChange={(element) => {
          setCurrentDefinition(element.target.value);
        }}></input>
      </div>
      <button type='button' id='formButton' onClick={() => {
        submitWord();
      }}>Submit</button>
    </div>
  )
}

export { WordForm };