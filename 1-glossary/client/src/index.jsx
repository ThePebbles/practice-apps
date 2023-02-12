import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { useState } from 'react';
import { useEffect } from 'react';
import { EntryListView } from './entryListView.jsx';
import { WordForm } from './wordForm.jsx';
import {FilterView } from './filterView.jsx';

const App = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries();
  }, [])

  const getEntries = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:4000/word',
      data: {},
      success: (data) => {
        console.log('success get')
        setEntries(data);
      },
      error: (err) => {
        console.log('This is err from index.jsx GET /words', err);
      }
    })
  }

  const addWord = (word, definition) => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:4000/word',
      data: {'word': word, 'definition': definition},
      success: (data) => {
        console.log('success post')
        getEntries();
      },
      error: (err) => {
        console.log('This is err from index.jsx POST /words', err);
      }
    })
  }

  const editWord = (word1, definition1, word2, definition2) => {
    $.ajax({
      method: 'PUT',
      url: 'http://localhost:4000/word',
      data: {'word': {'old': word1, 'new': word2}, 'definition': {'old': definition1, 'new': definition2}},
      success: (data) => {
        console.log('success put')
        getEntries();
      },
      error: (err) => {
        console.log('This is err from index.jsx PUT /words', err);
      }
    })
  }

  const deleteWord = (word, definition) => {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:4000/word',
      data: {'word': word, 'definition': definition},
      success: (data) => {
        console.log('success delete')
        getEntries();
      },
      error: (err) => {
        console.log('This is err from index.jsx DELETE /words', err);
      }
    })
  }

  const filterEntries = (query) => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:4000/filter',
      data: {'query': query},
      success: (data) => {
        console.log('success get filter')
        setEntries(data);
      },
      error: (err) => {
        console.log('This is err from index.jsx GET /filter', err);
      }
    })
  }

  return (
   <div>
    <FilterView filterEntries={filterEntries} getEntries={getEntries} />
    <EntryListView entries={entries} editWord={editWord} deleteWord={deleteWord} />
    <WordForm addWord={addWord} />
   </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
