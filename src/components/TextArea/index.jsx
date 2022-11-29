import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = ({ value }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}><TextareaAutosize disabled={true} style={{ width: '800px' }} value={value} /></div>

  )
}

export default TextArea
