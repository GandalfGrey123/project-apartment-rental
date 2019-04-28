import React, { Component } from 'react';
import { withStyles, FormControlLabel } from '@material-ui/core';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import ValidateTextField from '../registration/field-with-validation';
import { Link } from 'react-router-dom';

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
  static propTypes = {
    onRegister: PropTypes.func,
    registerFailed: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      admin: false
    }
    this._handleCheck = this._handleCheck.bind(this);
  }

  _handleCheck = () => {
    const { admin } = this.state;
    this.setState({ admin: !admin })
  }

  render() {

    const { classes, registerFailed } = this.props;
    const { canSubmit, admin } = this.state;

    return (
      <div className={classes.root}>
        <Formsy className={classes.form}
          onValid={this.enableSubmit} onInvalid={this.disableSubmit}
          onValidSubmit={this.submit}>

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
                checked={admin}
                onChange={this._handleCheck}
                value="admin"
                color="primary"

              />
            }
            label="Remember Me"
          />
          
         <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>

          <div className={classes.actions}>
            <Button type="submit"
              fullWidth
              component={Link}
              to={'/profile'}
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

  submit = model => {
    if (this.props.onRegister) {
      this.props.onRegister(model);
    }
  }

}

export default withStyles(styles)(LoginForm);