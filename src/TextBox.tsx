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

interface TextBox {
  userInput: string;
  onUserInputChange: (value: string) => void;
  onToggleSheet: () => void; // New prop to handle sheet toggle
}

const TextBox: React.FC<TextBox> = ({ userInput, onUserInputChange, onToggleSheet }) => {
    // state to make text box uneditable after submit
  const [isEditable, setIsEditable] = useState(true);
  // const [isTextBoxDisabledFromUnsetLang, setIsTextBoxDisabledFromUnsetLang] = useState<boolean>(false);
  // const [userInput, setUserInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setUserInput(event.target.value);
    if (isEditable) {
      onUserInputChange(event.target.value);
    }
    // if submitted entry exists in one lang, set isInputValid to false and disableSubmit to false

  };  
  
  useEffect(() => {
    // console.log("in useEffect")
    // let temp=true
    // const currentLang = JSON.parse(localStorage.getItem('currLang')!);
    // if (currentLang === "en" && temp == true && isEditable == true) {
    //   temp = false
    //   setIsEditable(false)
    //   console.log("condition 1")
    //   // setIsTextBoxDisabledFromUnsetLang(true)
    // } else if (currentLang !== "en" && isEditable == true) {
    //   setIsEditable(true)
    //   console.log("condition 2")
    // } else { // if isEditable == false
    //   setIsEditable(false)
    //   console.log("condition 3")
    //   temp = false
    //   // setIsTextBoxDisabledFromUnsetLang(false)
    // }
    // console.log("state of isEditable: ", isEditable)


    Sapling.init({
        key: 'MM4PLIT9JJ2L6VPDAIDIYR4TXPN6XJUM',
        endpointHostname: 'https://api.sapling.ai',
        editPathname: '/api/v1/edits',
        statusBadge: true,
        mode: 'dev',
        lang: 'auto'
    });
  });

  let minCharLength = 70;
  const currentLang = localStorage.getItem('currLang');
  if (currentLang === "\"ko\"") minCharLength = 35;
  console.log(currentLang, "min char limit", minCharLength);
  const isInputValid = userInput.length >= minCharLength && userInput.length <= 130; // set length constraints
  const disableSubmit = (!isInputValid || !isEditable) ? true : false; // disable submit if not meeting length constraints or response submitted

  // disable textbox if no language selected (i.e. en)
  // const currentLang: string | null = localStorage.getItem('currLang');
  // console.log(currentLang)
  // console.log("en")
  // let temp=true
  // const currentLang = JSON.parse(localStorage.getItem('currLang')!);
  // if (currentLang === "en" && temp == true) {
  //   // setIsEditable(false)
  //   console.log("FALSE - after lang check")
  //   temp = false
  // }
  // console.log("after lang check")

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

    // create item for today's response
    const todayDate: string = getDate();
    const currentLang: string | null = localStorage.getItem('currLang');
    const entry: { [key: string]: { [key: string]: any } } = {};
    const subentry: { [key: string]: any } = {};
    subentry[currentLang as string] = formJson;
    entry[todayDate] = subentry;
    console.log(entry);

    // initialize responses array in local storage
    // [ "01-01-2024": { "de", { "postContent":"Hallo" } }, "01-02-2024": { "it", { "postContent":"Ciao" } } ]
    const storedResponses = localStorage.getItem('my_responses');
    let responses: Array<{ [key: string]: { [key: string]: any } }> = [];
    if (storedResponses) {
      responses = JSON.parse(storedResponses);
    }

    // save responses in updated localStorage item
    responses.push(entry);
    localStorage.setItem('my_responses', JSON.stringify(responses));
    console.log("responses: ", responses);

    // store list of languages for which there are submitted responses for current day
    // this enables prompts for multiple languages to be answered
    

    // use Sapling
    const editor = document.getElementById('editor');
    if (editor) {
        Sapling.observe(editor);
      }
    console.log(editor)
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
            style={{resize: "none", borderRadius: "8px"}}
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
        <button onClick={onToggleSheet} className="submit-button" type="submit" disabled={disableSubmit}>Check grammar</button>
        </form>
    </div>
  );
};

export default TextBox;