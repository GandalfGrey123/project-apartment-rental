import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import ValidateTextField from './field-with-validation';
import LoginRegisterError from "./registration-error";

const styles = theme => ({
  root: {},
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    marginTop: theme.spacing.unit
  },
  actions: {
    marginTop: theme.spacing.unit * 2
  }
});


class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func,
    registerFailed: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    }
  }

  render() {
    const {
      classes,
      registerFailed
    } = this.props;
    const {canSubmit} = this.state;
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
                  minLength: "Too short"
                }}
                required
                className={classes.field}
                label="Desired email"
                style = {{width: 100}}
            />

            <ValidateTextField
                type="password"
                name="password"
                autoComplete="new-password"
                validations="minLength:2"
                validationErrors={{
                  minLength: "Too short"
                }}
                required
                className={classes.field}
                label="Create a password"
                style = {{width: 100}}
            />

            <ValidateTextField
                type="password"
                name="repeated_password"
                autoComplete="new-password"
                validations="equalsField:password"
                validationErrors={{
                  equalsField: "Needs to be the same password as above"
                }}
                required
                className={classes.field}
                label="Enter password again"
                style = {{width: 100}}
            />
            <Checkbox
            checked={this.state.checkedB}
             onChange={this.handleChange('checkedB')}
              value="checkedB"
               color="primary"
        />
            {
              registerFailed && <LoginRegisterError message={registerFailed}/>
            }

            <div className={classes.actions}>
              <Button type="submit"
                      fullWidth
                      variant="contained" color="primary"
                      disabled={!canSubmit}>Register</Button>
            </div>

          </Formsy>
          <Checkbox defaultChecked color="default" value="checkedG" />
        </div>
    );
  }

  disableSubmit = () => {
    this.setState({canSubmit: false})
  };

  enableSubmit = () => {
    this.setState({canSubmit: true})
  };

  submit = model => {
    if (this.props.onRegister) {
      this.props.onRegister(model);
    }
  }

}

export default withStyles(styles)(Register);