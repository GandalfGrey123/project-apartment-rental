import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Dialog,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    Grid
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';
import { getListing } from '../../../api/listings.actions';
// import ReactImages from 'react-images'; // doesn't work for some reason

const Transition = (props) => {
    return <Slide direction="up" {...props} />
}

const styles = theme => ({
    appBar: {
        position: 'relative'
    },
    content: {
        flex: 1
    },
    image: {
        padding: 10,
        width: theme.spacing.unit * 50,
        height: theme.spacing.unit * 50,
    },
    infoContainer: {
        padding: 10
    },
    txtContainer: {
        paddingLeft: 5
    },
});

class ListingDetailDialog extends Component{

    constructor(props){
        super(props);
        this.state = {
            listing: {
                images: []
            },
            imageContainer: {
                open: false
            }
        }
        this._updateImgContainerState = this._updateImgContainerState.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.listingId !== this.props.listingId
            && this.props.listingId !== -1){
            getListing(this.props.listingId, (data) => {
                this.setState({ listing: data });
            });
        }
    }

    _updateImgContainerState = (key, value) => {
        let { imageContainer } = this.state;
        imageContainer[key] = value;
        this.setState({ imageContainer });
    }

    render(){
        
        const { listing, imageContainer } = this.state;
        const { open, onClose, classes } = this.props;

        const images = listing
                .images
                .map((img) => ({ src: `data:image/png;base64,${img}` }));
        
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar} >
                    <Toolbar>
                        <IconButton
                            color={'inherit'}
                            onClick={onClose}
                            aria-label={'Close'}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>    
                </AppBar>
                <div className={classes.content} >
                    <Grid container >
                        <Grid item xs={3} >
                            <img
                                className={classes.image}
                                src={images.length > 0 ? images[0].src : null}
                            />
                        </Grid>
                        <Grid item xs={5} >
                            <div className={classes.infoContainer} >
                                <Grid
                                    container
                                    direction={'row'}
                                >   
                                    <Grid item xs={12}>
                                        <Grid container alignItems={'center'} >
                                            <div className={classes.txtContainer} >
                                                <Typography variant="h5" >Listing Info</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems={'center'} >
                                            <div className={classes.txtContainer} >
                                                <Typography variant="h6" >${listing.price}</Typography>
                                            </div>
                                            <div className={classes.txtContainer} >
                                                <Typography variant='subtitle2' >| {listing.bedrooms} bd</Typography>
                                            </div>
                                            <div className={classes.txtContainer} >
                                                <Typography variant="subtitle2" >| {listing.bathrooms} ba</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container >
                                            <div className={classes.txtContainer} >
                                                <Typography variant="h6" >
                                                    {`${listing.line1} ${listing.city} ${listing.state} ${listing.zipCode}`}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>  
                                    <Grid item xs={12}>
                                        <Grid container >
                                            <div className={classes.txtContainer} >
                                                <Typography variant="h6" >Date Posted: {listing.datePosted}</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>  
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        )
    } 
    
}

ListingDetailDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    listingId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
}

export default withStyles(styles, )(ListingDetailDialog);