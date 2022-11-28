import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const initField = (id) => {
  return {
    id: `field-${id}`,
    value: ''
  }
}

const FormPropsTextFields = ({ session, updateSessionList, indexItem, DeleteSession }) => {
  const [state, setState] = useState(session)
  const { fields } = state

  const addField = () => {
    setState({ ...state, fields: [...fields, initField(fields.length + 1)] })
  }

  const fieldHandler = (index, value) => {
    let a = [...fields]
    a[index] = { ...a[index], value: value }
    setState(crr => ({ ...crr, fields: [...a] }))
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        maxWidth: '100%',
      }}
      noValidate
    >
      <div>
        <TextField
          fullWidth
          required
          label='Title'
          value={state.title || ''}
          onChange={(e) => {
            setState(crr => ({ ...crr, title: e.target.value }))
          }}
        />
        <TextField
          fullWidth
          label="Link"
          value={state.link || ''}
          onChange={(e) => {
            setState(crr => ({ ...crr, link: e.target.value }))
          }}
        />
        {Boolean(fields.length) && fields.map((item, index) => (
          <div key={item.id}>
            <div style={{ margin: '15px 0' }}>
              <TextField
                fullWidth
                label={`Field ${index + 1}`}
                value={item.value || ''}
                onChange={(e) => fieldHandler(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => updateSessionList(indexItem, state)} variant="contained" style={{ marginRight: '10px' }}>Update</Button>
      <Button onClick={addField} variant="contained" style={{ marginRight: '10px' }} color='success'>Add Field</Button>
      <Button onClick={() => DeleteSession(state.id)} variant="contained" color='error'>Delete</Button>
    </Box>
  );
}

export default FormPropsTextFields
