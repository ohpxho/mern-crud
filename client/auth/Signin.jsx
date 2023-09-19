import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { redirect } from 'react-router';
import { useLocation, Navigate } from 'react-router-dom';
import auth from './auth-helper';
import { signin } from './api-auth';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
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

const Signin = () => {
	const classes = useStyles();
	const location = useLocation();

	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		redirectToReferrer: false
	})

	const onChange = (event, name) => {
		setValues({...values, [name]: event.target.value});
	}

	const onSubmit = () => {
		const user = {
			email: values.email || undefined,
			password: values.password || undefined
		}

		signin(user).then((data) => {
		  	if(data.error) setValues({...values, error: data.error});
		  	else auth.authenticate(data, () => {
		  		setValues({...values, error: '', redirectToReferrer: true})
		  	});
		})
	}

	const { from } = location.states || { from: { pathname: '/' } }
	const { redirectToReferrer } = values

	if(redirectToReferrer) return (<Navigate to={from} replace={true} />); 
	
	return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={(event) => onChange(event, 'email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={(event) => onChange(event, 'password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={onSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
} 

export default Signin;