import React from 'react';
import { useState } from 'react';
import $ from 'jquery';

const EntryListView = ({ entries, editWord, deleteWord }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentDefinition, setCurrentDefinition] = useState('');
  const [oldWord, setOldWord] = useState('');
  const [oldDefinition, setOldDefinition] = useState('');

  const hiddenStyle = {
    display: 'none'
  }

  const visibleStyle = {
    display: 'block'
  }

  const editEntry = (element) => {
    var oldWord1 = $($(element.target).siblings()[0]).attr('word');
    var oldDefinition1 = $($(element.target).siblings()[1]).attr('definition');
    setOldWord(oldWord1);
    setOldDefinition(oldDefinition1);
    $(element.target).siblings()[0].style.display = 'none';
    $(element.target).siblings()[1].style.display = 'none';
    $(element.target).siblings()[5].style.display = 'none';
    element.target.style.display = 'none';
    $(element.target).siblings()[2].style = visibleStyle;
    $(element.target).siblings()[2].value = oldWord1;
    $(element.target).siblings()[3].style = visibleStyle;
    $(element.target).siblings()[3].value = oldDefinition1;
    $(element.target).siblings()[4].style = visibleStyle;
  }

  const submitChange = (element) => {
    var newWord = currentWord.length === 0 ? oldWord : currentWord;
    var newDefinition = currentDefinition.length === 0 ? oldDefinition : currentDefinition;
    var oldWord1 = oldWord;
    var oldDefinition1 = oldDefinition;
    $(element.target).siblings()[0].style.display = 'block';
    $(element.target).siblings()[1].style.display = 'block';
    $(element.target).siblings()[5].style.display = 'block';
    element.target.style.display = 'none';
    $(element.target).siblings()[2].style.display = 'none';
    $(element.target).siblings()[2].value = '';
    $(element.target).siblings()[3].style.display = 'none';
    $(element.target).siblings()[3].value = '';
    $(element.target).siblings()[4].style.display = 'block';
    editWord(oldWord1, oldDefinition1, newWord, newDefinition);
  }
  const deleteEntry = (element) => {
    var oldWord = $($(element.target).siblings()[0]).attr('word');
    var oldDefinition = $($(element.target).siblings()[1]).attr('definition');
    deleteWord(oldWord, oldDefinition);
  }
  const entryList = entries.map((entry) => {
    return (
      <div className='entry'>
        <div className='word' style={visibleStyle} word={entry.word}>
          {entry.word + ':'}
        </div>
        <div className='definition' style={visibleStyle} definition={entry.definition}>
          {entry.definition}
        </div>
        <input className='wordChange' style={hiddenStyle} onChange={(element) => {
          setCurrentWord(element.target.value)}}></input>
        <input className='definitionChange' style={hiddenStyle} onChange={(element) => {
          setCurrentDefinition(element.target.value)}}></input>
        <button type='button' value='Submit Changes' className='submitChanges' style={hiddenStyle} onClick={(element) => {
          submitChange(element);
        }}>Submit Changes</button>
        <button type='button' value='Edit' className='editButton' style={visibleStyle} onClick={(e) => {
          editEntry(e);
        }}> Edit </button>
        <button type='button' className='deleteButton' style={visibleStyle} onClick={(e) => {
          deleteEntry(e);
        }}> Delete </button>
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