import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const dcm = `
Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Possimus dolorum nobis, ipsa dicta temporibus 
consequuntur, quod officiis officia hic alias quasi! Est, quasi dicta eveniet do
loremque iusto voluptatibus minima distinctio.

Thuan be de
`
const TextArea = () => {
  return (
    <TextareaAutosize  defaultValue={dcm}/>

  )
}

export default TextArea
