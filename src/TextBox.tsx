// TextBox.js

import React, { useState, useEffect } from 'react';
import './TextBox.css'; // Import the CSS file for styling
import { Sapling } from "@saplingai/sapling-js/observer";

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

// initialize responses item in local storage
// responses is array of dict
// let responses: { date: string { lang: string : { response: string } } }[] = [];
// [ "01-01-2024": { "de", { "postContent":"Hallo" } }, "01-02-2024": { "it", { "postContent":"Ciao" } } ]
// let responses: { [key: string]: { language: string; postContent: string } }[] = [];
// if (localStorage.getItem('my_responses') === null) {
//     localStorage.setItem('my_responses', "");
// } else {
//     if (localStorage.getItem('my_responses')) {
//         responses = JSON.parse(localStorage.getItem('my_responses') || "");
//     }
// }

const TextBox: React.FC = () => {
    // state to make text box uneditable after submit
  const [isEditable, setIsEditable] = useState(true);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };  
  
  useEffect(() => {
    Sapling.init({
        key: 'AR46FO1Z1P4KMK17RZ6XVO6ZAUFPW9SG',
        endpointHostname: 'https://api.sapling.ai',
        editPathname: '/api/v1/edits',
        statusBadge: true,
        mode: 'dev',
    });
    // Sapling.init({
    //     // endpointHostname: 'http://127.0.0.1:5000',
    //     // saplingPathPrefix: '/sapling',
    //     lang: JSON.parse(localStorage.getItem("currLang") || ""), // change to selected language
    // });
  });

  const isInputValid = userInput.length >= 70 && userInput.length <= 130; // set length constraints
  const disableSubmit = (!isInputValid || !isEditable) ? true : false; // disable submit if not meeting length constraints or response submitted

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.currentTarget //.target as HTMLFormElement;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    
    // make text box uneditable
    setIsEditable(false);

    const todayDate: string = getDate();
    const currentLang: string | null = localStorage.getItem('currLang');
    const entry: { [key: string]: { [key: string]: any } } = {};
    const subentry: { [key: string]: any } = {};
    subentry[currentLang as string] = formJson;
    entry[todayDate] = subentry;
    console.log(entry);

    const storedResponses = localStorage.getItem('my_responses');
    let responses: Array<{ [key: string]: { [key: string]: any } }> = [];
    if (storedResponses) {
      responses = JSON.parse(storedResponses);
    }

    responses.push(entry);
    localStorage.setItem('my_responses', JSON.stringify(responses));
    console.log("responses: ", responses);

    // use Sapling
    const editor = document.getElementById('editor');
    if (editor) {
        Sapling.observe(editor);
      }
}

  return (
    <div className="textbox-container">
        <form method="post" onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
        <label>
            <textarea
            name="postContent"
            value={userInput}
            onChange={handleInputChange}
            rows={4}
            cols={60}
            style={{resize: "none", borderRadius: "8px", marginBottom: '20px'}}
            placeholder='Type your response'
            disabled={!isEditable}
            id="editor"
            />
            <div className="char-display" id="inputCharCount" style={{ color: isInputValid ? 'black' : 'red'}}>
                {userInput.length}
            </div>
            <p>70-130 characters</p>
        </label>
        </div>
        <hr />
        <button className="submit-button" type="submit" disabled={disableSubmit}>Check grammar</button>
        </form>
    </div>
  );
};

export default TextBox;