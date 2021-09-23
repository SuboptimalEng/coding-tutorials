import { useState } from 'react';
import './App.css';
import axios from 'axios';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import CodeMirror from '@uiw/react-codemirror';

function App() {
  const [code, setCode] = useState('');
  const [testCaseResults, setTestCaseResults] = useState([]);

  const checkCode = () => {
    axios
      .post('http://localhost:80/python', { code })
      .then(({ data }) => {
        setTestCaseResults(data.testCaseResults);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-20 bottom-40 left-20 right-20 text-left">
          <div>Create a function to add two numbers.</div>
          <div className="flex space-x-2">
            {testCaseResults.map((res, i) => {
              return (
                <div key={i}>
                  <div>{res === 'True' ? '✅ passed' : '❌ failed'}</div>
                </div>
              );
            })}
          </div>
          <CodeMirror
            value={code}
            options={{
              theme: 'dracula',
              keyMap: 'sublime',
              mode: 'python',
            }}
            onChange={(editor, data, value) => {
              setCode(editor.getValue());
            }}
            className="w-96 h-80"
          />
          <div
            onClick={() => checkCode()}
            className="border-2 p-2 bg-green-600"
          >
            Submit Code
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
