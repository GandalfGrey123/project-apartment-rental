import React from 'react';
import { 
    TextField,
    withStyles,
    Button,
    FormGroup
} from '@material-ui/core';
import { getUserProfile } from '../../../api/user.actions';

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
            profile: {}
        }
    }

    componentDidMount(){
        getUserProfile((res) => this.setState({ profile: res.data }));
    }

    handleChange = name => event => {
        let { profile } = this.state;
        profile[name] = event.target.value
        this.setState({ profile });
    };

    render(){
        const { profile } = this.state;
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete={"off"} >
                <FormGroup>
                    <TextField
                        id="standard-name"
                        autoFocus
                        label="First Name"
                        className={classes.textField}
                        value={profile.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-name"
                        label="Last Name"
                        autoFocus
                        className={classes.textField}
                        value={profile.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-name"
                        label="Email"
                        autoFocus
                        className={classes.textField}
                        value={profile.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-password"
                        label="Password"
                        className={classes.textField}
                        value={profile.password || '**********'}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
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