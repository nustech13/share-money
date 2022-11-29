import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList'
import TextArea from './components/TextArea';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalSession from './components/Modal';

function App() {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const updateText = (text) => {
    setValue(text)
  }

  const openHandler = () => {
    setOpen(!open)
  }

  return (
    <>
      <TaskList updateText={updateText} openHandler={openHandler} />
      <TextArea value={value} />
      <ModalSession open={open} openHandler={openHandler} />
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
