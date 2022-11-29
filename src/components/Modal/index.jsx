import React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
const state = {
    id: 0,
    title: '[Code] 10778 - Update CSS, Text, Image For Brighteon TV',
    link: 'https://app.shortcut.com/webseed-inc/story/10778/update-css-text-image-for-brighteon-tv',
    fields: ['6 hours', 'Local, PR', 'Feature: Place the error message under the field popup, update (new text, image, css),...'],
    isUpdate: true
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalSession = ({ open, openHandler }) => {
    return (
        <Modal
            open={open}
            onClose={openHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component="form"
                sx={style}
                noValidate
            >
                <div>
                    <TextField
                        fullWidth
                        required
                        label='Title'
                        value={state.title || ''}
                    />
                    <TextField
                        fullWidth
                        label="Link"
                        value={state.link || ''}
                    />
                    {Boolean(state.fields.length) && state.fields.map((item, index) => (
                        <div key={item.id}>
                            <div style={{ margin: '15px 0' }}>
                                <TextField
                                    fullWidth
                                    label={`Field ${index + 1}`}
                                    value={item || ''}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Box>
        </Modal>
    )
}

export default ModalSession