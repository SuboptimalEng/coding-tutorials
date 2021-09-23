import './App.css';
import 'codemirror/keymap/vim';
import 'codemirror/theme/dracula.css';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

function App() {
  const getNewCodingTest = () => {
    const lastLine = `                    `;
    const emptyLine = `                    \n`;
    const codeToRemove = `                   %\n`;
    let testCode = '';
    let randomLine = Math.floor(Math.random() * 9);
    for (let i = 0; i < 9; i++) {
      if (randomLine === i) {
        testCode += codeToRemove;
      } else {
        testCode += emptyLine;
      }
    }
    testCode += lastLine;
    return testCode;
  };

  const testCode = getNewCodingTest();
  const [code, setCode] = useState(testCode);
  const [numOfWins, setNumOfWins] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-20 bottom-40 left-20 right-20 text-left">
          <div>Move with 'h/j/k/w' and delete with 'x'</div>
          <div>Won {numOfWins} time(s)!</div>
          <CodeMirror
            value={code}
            options={{
              theme: 'dracula',
              keyMap: 'vim',
              mode: 'js',
            }}
            onChange={(editor, data) => {
              const editedCode = editor.getValue();
              if (!editedCode.includes('%')) {
                setCode(getNewCodingTest());
                setNumOfWins(numOfWins + 1);
              }
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
