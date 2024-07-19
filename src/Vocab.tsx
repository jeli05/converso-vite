import React, { useState } from 'react';
import './Vocab.css';
import vocabularyData from './es_vocab';

// Sample data, to be replaced with actual vocab later
// const data = `
// la manzana	apple
// el libro	book
// el coche	car
// la casa	house
// el perro	dog
// `.trim().split('\n').map((line, index) => {
//   const [spanish, english] = line.split('\t'); // file is tab-separated
//   return { id: index, spanish, english, seen: false };
// });

function getRandomInt() {
    return Math.floor((Math.random() * (vocabularyData.length - 4))); // account for only showing 5 words
}

const startIndex = getRandomInt();
const endIndex = startIndex + 5;
console.log(startIndex, endIndex);

const VocabularyList: React.FC = () => { // FC not the best practice
  const [vocabList, setVocabList] = useState(vocabularyData); // use hook

  const toggleSeen = (id: number) => {
    setVocabList(vocabList.map(item =>
      item.id === id ? { ...item, seen: !item.seen } : item // copying via spread operator if id matches to update
    ));
  };

  return (
    <div>
        {vocabList.slice(startIndex, endIndex).map(item => ( // only display 5 to not overwhelm user
          <li key={item.id} className={item.seen ? 'seen' : 'unseen' }>
            <button // use button to mark word as seen/used
              onClick={() => toggleSeen(item.id)}
              className="vocab-button"
              title={item.english}
            >
              {item.spanish}
            </button>
          </li> // will need to allow for hovering to show english translation
        ))}
    </div>
  );
};

export default VocabularyList;
