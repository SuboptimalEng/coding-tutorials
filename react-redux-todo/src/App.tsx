import './App.css';
import React, { useState } from 'react';
// import AppWithReactHooks from './AppWithReactHooks';

// NOTE: State management
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { reduxAddToDo, reduxToggleToDo } from './redux/reduxToDosSlice';

export interface IToDo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { reduxToDos } = useSelector((state: RootState) => state.reduxToDos);

  console.log(reduxToDos);

  const [toDo, setToDo] = useState('');

  const maybeAddToDo = () => {
    if (toDo.length > 0) {
      dispatch(reduxAddToDo(toDo));
    }
  };

  // NOTE: Check how app is done with hooks
  // return <AppWithReactHooks></AppWithReactHooks>;
  return (
    <div className="App ">
      <header className="App-header">
        <div className="text-6xl flex flex-col place-items-center space-y-4">
          <div className="w-80 flex flex-col">
            {/* Display ToDos */}
            {reduxToDos.map((toDo) => {
              return (
                <div key={toDo.id}>
                  <div className="flex space-x-8 items-end justify-between">
                    <div
                      className={
                        toDo.completed ? 'line-through text-gray-400' : ''
                      }
                    >
                      {toDo.text}
                    </div>

                    {toDo.completed ? (
                      <div
                        className="border mb-2 p-4 bg-green-500 rounded"
                        onClick={() => dispatch(reduxToggleToDo(toDo))}
                      ></div>
                    ) : (
                      <div
                        className="border mb-2 p-4 bg-white rounded"
                        onClick={() => dispatch(reduxToggleToDo(toDo))}
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Add ToDos */}
            <div className="w-full mt-4 flex place-items-center justify-between">
              <input
                type="text"
                value={toDo}
                onChange={(e) => setToDo(e.target.value)}
                className="w-60 h-20 rounded-lg text-black p-2"
              />
              <div className="text-4xl" onClick={maybeAddToDo}>
                ✅
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
