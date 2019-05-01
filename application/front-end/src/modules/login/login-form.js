import React, { Component } from 'react';
import { withStyles, FormControlLabel } from '@material-ui/core';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import ValidateTextField from '../registration/field-with-validation';

import {userLogin} from '../../api/user.actions';


const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit*10,
    marginRight: theme.spacing.unit*10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    marginTop: theme.spacing.unit,
    width: theme.spacing.unit*50
  },
  actions: {
    marginTop: theme.spacing.unit * 2
  }
});


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      remember: false,

      loginCredentials:{
        email:'',
        password:'',
      }
    }
    this._handleCheck = this._handleCheck.bind(this);
  }

  _handleCheck = () => {
    const { remember } = this.state;
    this.setState({ remember: !remember })
  }


  submitLogin = (model) =>{
    userLogin(model,(response) => {
       alert(response);
    }); 
  }

  render() {

    const { classes } = this.props;
    const { canSubmit, remember } = this.state;

    return (
      <div className={classes.root}>
        <Formsy className={classes.form}
          onValid={this.enableSubmit} 
          onInvalid={this.disableSubmit}

          onValidSubmit={this.submitLogin}>

          <ValidateTextField
            name="email"
            autoComplete="email"
            validations="minLength:3"
            validationErrors={{
              minLength: "Invalid Email"
            }}            
            required
            className={classes.field}
            label="Email"
          />

          <ValidateTextField
            name="password"
            autoComplete="password"
            validations="minLength:3"
            validationErrors={{
              minLength: "Invalid Password"
            }}            
            required
            className={classes.field}
            label="Password"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={this._handleCheck}
                color="primary"
              />
            }
            label="Remember Me"
          />
          
         <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>

          <div className={classes.actions}>
            <Button 
              type="submit"
              fullWidth 
              variant="contained" color="primary"
              disabled={!canSubmit}>Log In</Button>
          </div>

        </Formsy>
      </div>
    );
  }

  disableSubmit = () => {
    this.setState({ canSubmit: false })
  };

  enableSubmit = () => {
    this.setState({ canSubmit: true })
  };

}

export default withStyles(styles)(LoginForm);