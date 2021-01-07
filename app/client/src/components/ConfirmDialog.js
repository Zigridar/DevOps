import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ConfirmDialog(props) {

    const { title, textContent, onOk, onCancel, isOpen } = props

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {textContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onOk} color="primary">
                    ОК
                </Button>
                <Button onClick={onCancel} color="primary" autoFocus>
                    ОТМЕНА
                </Button>
            </DialogActions>
        </Dialog>
    )
}
