import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormTask from '../FormTask'
import './TaskList.css'
import { Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const initSession = (id) => ({
  id: id,
  title: '',
  link: '',
  fields: [],
  isUpdate: false
})

const AccordionItem = ({ title, session, updateSessionList, indexItem, DeleteSession }) => (
  <Accordion className='item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography><b>{title}</b> {session.isUpdate && <CheckCircleOutlineIcon color='success' />}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormTask session={session} updateSessionList={updateSessionList} indexItem={indexItem} DeleteSession={DeleteSession} />
    </AccordionDetails>
  </Accordion>
)


const SimpleAccordion = () => {
  const [state, setState] = React.useState([])

  const addSession = () => {
    setState([...state, initSession(state.length + 1)])
  }

  const updateSessionList = (index, sessionItem) => {
    let a = [...state]
    a[index] = { ...sessionItem, isUpdate: true }
    setState(a)
    localStorage.setItem('list', JSON.stringify(state))
  }

  const DeleteSession = (id) => {
    setState(state.filter(item => item.id !== id))
    localStorage.setItem('list', JSON.stringify(state.filter(item => item.id !== id)))
  }

  const renderReport = () => {
    const report = state.map(item => {
      const fields = item.fields.filter(field => field.value)
      return `- ${item.title} ${item.link ? `(${item.link})` : ''}\n${fields.length && fields.map(field => {
        return `  + ${field.value}\n`
      }).join('')}`
    }).join('')
    localStorage.setItem('list', JSON.stringify(state))
    return navigator.clipboard.writeText(report)
  }

  useEffect(() => {
    if (localStorage.getItem('list')) {
      setState(JSON.parse(localStorage.getItem('list')))
    } else {
      setState([initSession(1)])
    }
  }, [])

  return (
    <div className='tasklist'>
      <div className='listItem'>
        <div>
          <Button onClick={addSession} style={{ marginBottom: '20px', marginRight: '10px' }} variant="contained" color='success'>Add Session</Button>
          <Button onClick={renderReport} style={{ marginBottom: '20px' }} variant="contained" color='warning'>Copy</Button>
        </div>
        {state.map((item, index) =>
          <AccordionItem
            key={item.id}
            title={`Session ${item.id}`}
            session={item}
            updateSessionList={updateSessionList}
            DeleteSession={DeleteSession}
            indexItem={index}
          />)}
      </div>
    </div>
  );
}

export default SimpleAccordion
