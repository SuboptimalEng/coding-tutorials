import React, { useState } from 'react';
import { IToDo } from './App';
import './App.css';

function AppWithReactHooks() {
  const [toDos, setToDos] = useState<Array<IToDo>>([
    {
      id: Math.floor(Math.random() * 1000),
      text: 'hi',
      completed: false,
    },
    {
      id: Math.floor(Math.random() * 1000),
      text: 'there',
      completed: false,
    },
    {
      id: Math.floor(Math.random() * 1000),
      text: 'hello',
      completed: true,
    },
    {
      id: Math.floor(Math.random() * 1000),
      text: 'world',
      completed: true,
    },
  ]);
  const [toDo, setToDo] = useState('');

  const toggleToDo = (toDoId: number) => {
    const i = toDos.findIndex((toDo) => toDo.id === toDoId);
    const newToDos = [...toDos];
    newToDos[i].completed = !newToDos[i].completed;
    setToDos(newToDos);
  };

  const addToDo = () => {
    setToDos([
      ...toDos,
      {
        id: Math.floor(Math.random() * 1000),
        text: toDo,
        completed: false,
      },
    ]);
    setToDo('');
  };

  return (
    <div className="App ">
      <header className="App-header">
        <div className="text-6xl flex flex-col place-items-center space-y-4">
          <div className="w-80 flex flex-col">
            {/* Display ToDos */}
            {toDos.map((toDo) => {
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
                        onClick={() => toggleToDo(toDo.id)}
                      ></div>
                    ) : (
                      <div
                        className="border mb-2 p-4 bg-white rounded"
                        onClick={() => toggleToDo(toDo.id)}
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
              <div className="text-4xl" onClick={() => addToDo()}>
                ✅
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppWithReactHooks;
