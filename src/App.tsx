import React, { useState } from 'react'
import './App.css'
import TextBox from './TextBox';
import { fr_prompts, es_prompts, it_prompts, pt_prompts, de_prompts } from './Prompts';
import './Vocab.css';
import { vocabularyDataES, vocabularyDataDE, vocabularyDataFR, vocabularyDataIT, vocabularyDataPT } from './vocab';

type Languages = {
  [key: string]: string;
};

// get today's date so that a new prompt can be generated
function getDate(): string {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

// supported languages
const languages: Languages = {
  'en': 'Select language', 
  'fr': 'French', 
  'es': 'Spanish', 
  'it': 'Italian', 
  'de': 'German', 
  'pt': 'Portuguese'
};

// put all prompts in local storage for retrieval in future sessions
function setPrompts(): void {
  localStorage.setItem('fr_prompts', JSON.stringify(fr_prompts));
  localStorage.setItem('es_prompts', JSON.stringify(es_prompts));
  localStorage.setItem('it_prompts', JSON.stringify(it_prompts));
  localStorage.setItem('pt_prompts', JSON.stringify(pt_prompts));
  localStorage.setItem('de_prompts', JSON.stringify(de_prompts));
}

// select prompt based on day of year
function displayPrompt(lang: string): string {
  console.log("display lang: ", lang);

  var now: Date = new Date();
  var start: Date = new Date(now.getFullYear(), 0, 0);
  console.log(start);
  var diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  console.log('Day of year: ' + day);

  if (lang === 'fr') {
    return fr_prompts[day];
  } else if (lang === 'es') {
    return es_prompts[day];
  } else if (lang === 'it') {
    return it_prompts[day];
  } else if (lang === 'pt') {
    return pt_prompts[day];
  } else if (lang === 'de') {
    return de_prompts[day];
  } else {
    return "No prompt available";
  }
}

function displayVocab(lang: string): any {
  let vocabularyData = [{}];
  if (lang === 'fr') {
    vocabularyData = vocabularyDataFR;
  } else if (lang === 'es') {
    vocabularyData = vocabularyDataES;
  } else if (lang === 'it') {
    vocabularyData = vocabularyDataIT;
  } else if (lang === 'pt') {
    vocabularyData = vocabularyDataPT;
  } else if (lang === 'de') {
    vocabularyData = vocabularyDataDE;
  }
  if (vocabularyData != null ) console.log("Vocab selected:", vocabularyData.length);
  return vocabularyData;
};

interface VocabItem {
  id: number;
  original: string;
  english: string;
  seen: boolean;
}

interface VocabularyListProps {
  vocabList: VocabItem[];
  toggleSeen: (id: number) => void;
}

function getRandomInt(vocab_length: number) {
  return Math.floor((Math.random() * (vocab_length - 4))); // account for only showing 5 words
}

const startIndex = getRandomInt(vocabularyDataES.length);
const endIndex = startIndex + 5;

function VocabularyList({ vocabList, toggleSeen }: VocabularyListProps) {
  return (
    <div>
        {vocabList.slice(startIndex, endIndex).map(item => ( // only display 5 to not overwhelm user
          <li key={item.id} className={item.seen ? 'seen' : 'unseen' }>
            <button // use button to mark word as seen/used
              onClick={() => toggleSeen(item.id)}
              className="vocab-button"
              title={item.english}
            >
              {item.original}
            </button>
          </li> // will need to allow for hovering to show english translation
        ))}
    </div>
  );
}

if (localStorage.getItem('currLang') === null) {
  localStorage.setItem('currLang', JSON.stringify('en'));
}

// initialize and display prompt in default or selected language
setPrompts() // just for local storage
console.log("Initial currLang: ", localStorage.getItem('currLang'));
let today_prompt = displayPrompt(JSON.parse(localStorage.getItem('currLang') || 'en'));
let today_vocab = displayVocab(JSON.parse(localStorage.getItem('currLang') || 'en'));
// console.log(today_vocab);

function App(): JSX.Element {
  const [currentDate] = useState(getDate());
  const [currentLang, setLang] = useState<string>(JSON.parse(localStorage.getItem('currLang') || 'en'));

  let currLang = currentLang;
  console.log("Refreshed currLang: ", currLang);

  // change languages via dropdown
  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>): void {
    setLang(event.target.value);
    currLang = event.target.value;
    localStorage.setItem('currLang', JSON.stringify(event.target.value));
    console.log("Switched to " + JSON.stringify(event.target.value) + ": " + languages[currLang]);
    today_prompt = displayPrompt(event.target.value);
    today_vocab = displayVocab(event.target.value); // can still have the function
    setVocabList(today_vocab);
  }

  const [vocabList, setVocabList] = useState(today_vocab); // use hook

  const toggleSeen = (id: number) => {
    setVocabList(vocabList.map(item =>
      item.id === id ? { ...item, seen: !item.seen } : item // copying via spread operator if id matches to update
    ));
  };

  return (
    <div className='prompt'>
      <h1>Converso: Daily Language Prompts</h1>
      <h2>{currentDate}</h2>
      <h3>Language: {languages[currentLang]}</h3>
      <select value={currLang} onChange={changeLanguage}>
        {Object.keys(languages).map(lang => (
          <option key={lang} value={lang}>{languages[lang]}</option>
        ))}
      </select>
      <p>{today_prompt}</p>
      <VocabularyList vocabList={vocabList} toggleSeen={toggleSeen} />
      <br></br>
      <TextBox />
    </div>
  );
}

export default App