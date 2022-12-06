import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToDo } from '../App';
// import { RootState } from './store';

interface IInitialState {
  reduxToDos: Array<IToDo>;
}

const initialState: IInitialState = {
  reduxToDos: [
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
  ],
};

export const reduxToDosSlice = createSlice({
  name: 'reduxToDos',
  initialState,
  reducers: {
    reduxAddToDo: (state, action: PayloadAction<string>) => {
      state.reduxToDos.push({
        id: Math.floor(Math.random() * 1000),
        text: action.payload,
        completed: false,
      });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    reduxToggleToDo: (state, action: PayloadAction<IToDo>) => {
      const reduxToDoIndex = state.reduxToDos.findIndex(
        (reduxToDo) => reduxToDo.id === action.payload.id
      );
      const newToDos = [...state.reduxToDos];
      newToDos[reduxToDoIndex].completed = !newToDos[reduxToDoIndex].completed;
      state.reduxToDos = newToDos;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Other code such as selectors can use the imported `RootState` type
// export const reduxToDos = (state: RootState) => state.reduxToDos;
export const { reduxAddToDo, reduxToggleToDo } = reduxToDosSlice.actions;
export default reduxToDosSlice.reducer;
