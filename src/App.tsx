import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import React, { useState } from 'react';
import TextBox from './TextBox';
import { fr_prompts, es_prompts, it_prompts, pt_prompts, de_prompts } from './Prompts';

type Languages = {
  [key: string]: string;
};

type Prompts = {
  [key: string]: string;
};

function getDate(): string {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const currLang: string = 'en'; // use default of English
const languages: Languages = {
  'en': 'English', 
  'fr': 'French', 
  'es': 'Spanish', 
  'it': 'Italian', 
  'de': 'German', 
  'pt': 'Portuguese'
};

function setPrompts(): void {
  localStorage.setItem('fr_prompts', JSON.stringify(fr_prompts));
  localStorage.setItem('es_prompts', JSON.stringify(es_prompts));
  localStorage.setItem('it_prompts', JSON.stringify(it_prompts));
  localStorage.setItem('pt_prompts', JSON.stringify(pt_prompts));
  localStorage.setItem('de_prompts', JSON.stringify(de_prompts));
}

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

if (localStorage.getItem('currLang') === null) {
  localStorage.setItem('currLang', JSON.stringify('en'));
}

console.log("Initial currLang: ", localStorage.getItem('currLang'));
let today_prompt = displayPrompt(JSON.parse(localStorage.getItem('currLang') || 'en'));

function App(): JSX.Element {
  const [currentDate] = useState(getDate());
  const [currentLang, setLang] = useState<string>(JSON.parse(localStorage.getItem('currLang') || 'en'));

  let currLang = currentLang;
  console.log("Refreshed currLang: ", currLang);

  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>): void {
    setLang(event.target.value);
    currLang = event.target.value;
    localStorage.setItem('currLang', JSON.stringify(event.target.value));
    console.log("Switched to " + JSON.stringify(event.target.value) + ": " + languages[currLang]);
    today_prompt = displayPrompt(event.target.value);
  }

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
      <TextBox />
    </div>
  );

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
