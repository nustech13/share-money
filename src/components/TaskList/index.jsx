import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormTask from '../FormTask'
import './TaskList.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { toast } from 'react-toastify';


const initSession = (id) => ({
  id: id,
  title: '',
  link: '',
  hours: '',
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

const ownerData = ['ThuanNM', 'DucNNB', 'VuPTM']

const SimpleAccordion = ({ updateText, openHandler }) => {
  const [state, setState] = React.useState([])
  const [owner, setOwner] = React.useState(0)

  useEffect(() => {
    if (localStorage.getItem('list')) {
      setState(JSON.parse(localStorage.getItem('list')))
      updateTextArea(JSON.parse(localStorage.getItem('list')))
    } else {
      setState([initSession(1)])
    }
  }, [])

  const addSession = () => {
    const a = [...state, initSession(state.length + 1)]
    setState(a)
    localStorage.setItem('list', JSON.stringify(a))
    toast.success("Create Session Success!");
  }

  const updateSessionList = (index, sessionItem) => {
    let a = [...state]
    a[index] = { ...sessionItem, isUpdate: true }
    setState(a)
    localStorage.setItem('list', JSON.stringify(a))
    updateTextArea(a)
    toast.success("Update Session Success!");
  }

  const DeleteSession = (id) => {
    const a = state.filter(item => item.id !== id)
    setState(a)
    localStorage.setItem('list', JSON.stringify(a))
    updateTextArea(a)
    toast.success("Delete Session Success!");
  }

  const updateTextArea = (crr) => {
    const report = crr.map(item => {
      const fields = item.fields.filter(field => field.value)
      return `- ${item.title} ${item.link ? `(${item.link})` : ''}\n  + ${item.hours} hours\n${!Boolean(fields.length) ? '' : fields.map(field => {
        return `  + ${field.value}\n`
      }).join('')}`
    }).join('')

    updateText(report)
  }

  const renderReport = () => {
    const report = state.map(item => {
      const fields = item.fields.filter(field => field.value)
      return `- ${item.title} ${item.link ? `(${item.link})` : ''}\n  + ${item.hours} hours\n${!Boolean(fields.length) ? '' : fields.map(field => {
        return `  + ${field.value}\n`
      }).join('')}`
    }).join('')
    localStorage.setItem('list', JSON.stringify(state))
    toast.info("Copy Report Success!");
    return navigator.clipboard.writeText(report)
  }

  const ownerHandler = () => {
    switch (owner) {
      case 0: return setOwner(1)
      case 1: return setOwner(2)
      case 2: return setOwner(0)
      default:
        return setOwner(0)
    }
  }

  return (
    <div className='tasklist'>
      <div className='listItem'>
        <div>
          <Button onClick={addSession} style={{ marginBottom: '20px', marginRight: '10px' }} variant="contained" color='success'>Add Session</Button>
          <Button onClick={renderReport} style={{ marginBottom: '20px', marginRight: '10px' }} variant="contained" color='warning'>Copy</Button>
          <Button onClick={openHandler} style={{ marginBottom: '20px', marginRight: '10px' }} variant="contained" color='info'>Example</Button>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Reference</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell onClick={ownerHandler} style={{ cursor: 'pointer', fontWeight: '600' }} align="right">Owner</TableCell>
                <TableCell align="right">Actual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(state.length) && state.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Dev Done</TableCell>
                  <TableCell align="right">{ownerData[owner]}</TableCell>
                  <TableCell align="right">{row.hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default SimpleAccordion
