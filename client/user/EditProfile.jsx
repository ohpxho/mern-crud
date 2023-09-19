import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/Styles'
import { Navigate, useMatch } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { read, update } from './api-user'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

const EditProfile = () => {
	const classes = useStyles();
	const match = useMatch('/user/edit/:userId');
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		open: false,
		redirectToProfile: false
	});

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const userId = match.params.userId;

		const jwt = auth.isAuthenticated();

		read({userId}, {t: jwt.token}, signal)
		  .then(data => {
		  	if(data && data.error) setUser({...user, error: data.error});
		  	else setUser({...user, name: data.name, email: data.email});
		  })

		return function cleanup() {
			return abortController.abort();
		}

	}, [match.params.userId])

	const onChange = (event, el) => {
		setUser({...user, [el]: event.target.value})
	}

	const onSubmit = () => {
		const val = {
			name: user.name || undefined,
			email: user.email || undefined,
			password: user.password || undefined
		}

		const jwt = auth.isAuthenticated();
		
		update({userId: match.params.userId}, {t: jwt.token}, val)
		  .then(data => {
		  	if(data & data.error) setUser({...user, error: data.error});
		  	else setUser({...user, userId: data._id, redirectToProfile: true});
		  });
	}

	if(user.redirectToProfile) return (<Navigate to={`/user/${user.userId}`} replace={true} />);

	return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={user.name} onChange={(event) => onChange(event, 'name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={user.email} onChange={(event) => onChange(event, 'email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={user.password} onChange={(event) => onChange(event, 'password')} margin="normal"/>
          <br/> {
            user.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {user.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={onSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}

export default EditProfile
