import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { remove } from './api-user'
import auth from '../auth/auth-helper'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Card from '@material-ui/core/Card'

const DeleteUser = (props) => {
	const [open, setOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const openDialog = () => setOpen(true);
	const closeDialog = () => setOpen(false);
	const deleteAccount = () => {
		const userId = props.userId;
		const jwt = auth.isAuthenticated();

		remove({userId}, {t: jwt.token})
		  .then(data => {
		  	if(data && data.error) console.log(data.error);
		  	else {
		  		auth.clearJWT(() => console.log('deleted'))
		  		setRedirect(true)
		  	}
		  })
		}

	if(redirect) return (<Navigate to="/" replace={true}/>);

	return (
		<span>
	      <IconButton aria-label="Delete" onClick={openDialog} color="secondary">
	        <DeleteIcon/>
	      </IconButton>

	      <Dialog open={open} onClose={closeDialog}>
	        <DialogTitle>{"Delete Account"}</DialogTitle>
	        <DialogContent>
	          <DialogContentText>
	            Confirm to delete your account.
	          </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={closeDialog} color="primary">
	            Cancel
	          </Button>
	          <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
	            Confirm
	          </Button>
	        </DialogActions>
	      </Dialog>
	   	</span>
	)
}

DeleteUser.propTypes = {
 userId: PropTypes.string.isRequired
}

export default DeleteUser;