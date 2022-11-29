import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList'
import TextArea from './components/TextArea';

function App() {
  const [value, setValue] = useState('')

  const updateText = (text) => {
    setValue(text)
  }
  return (
    <>
      <TaskList updateText={updateText} />
      <TextArea value={value} />
    </>
  );
}

export default App;
