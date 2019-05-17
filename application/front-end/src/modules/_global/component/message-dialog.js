import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent,
    DialogContentText, DialogTitle
} from '@material-ui/core';

/**
 * A dialog which is show when the user pressed
 * "Contact Landloard buttton"
 */
class LandLoardContactDialog extends React.Component {

  constructor(props){
      super(props);
  }

  render() {

    const { open, onClose } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Contact Landloard</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please a enter a message to send to landloard. The message history is 
              going to appear in your profile inbox.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Enter Message"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onClose} color="primary">
              Send Message
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

LandLoardContactDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default LandLoardContactDialog;