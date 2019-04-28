import React from 'react';
import { 
    TextField,
    withStyles,
    Button,
    FormGroup
} from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit * 5
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    dense: {
        marginTop: 19,
    },
})

class ProfileForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            password: '*********'
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render(){

        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete={"off"} >
                <FormGroup>
                    <TextField
                        id="standard-name"
                        label="First Name"
                        className={classes.textField}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Last Name"
                        className={classes.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-password"
                        label="Password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <div>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Update
					</Button>
                    </div>
                </FormGroup>
            </form>
        )
    }
}

export default withStyles(styles)(ProfileForm);