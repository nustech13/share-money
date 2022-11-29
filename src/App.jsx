import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList'
import TextArea from './components/TextArea';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [value, setValue] = useState('')

  const updateText = (text) => {
    setValue(text)
  }

  return (
    <>
      <TaskList updateText={updateText} />
      <TextArea value={value} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
