import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,Dialog, AppBar,
    Toolbar, IconButton, Typography,
    Slide, Grid, Button
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';
import MapView from '../../googlemaps/maps';
import LandloardContactDialog from '../../_global/component/message-dialog';
import { checkSession } from '../../../api/user.actions';
import { getListing } from '../../../api/listings.actions';
// import ReactImages from 'react-images'; // doesn't work for some reason

/**
 * A dialog which pops up to display the listing information
 */
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
        width: '100%',
        height: theme.spacing.unit * 50,
    },
    map: {
        padding: 10,
        width: '200px',
        height: '200px',
    },
    infoContainer: {
        padding: 10
    },
    txtContainer: {
        paddingLeft: 5
    },
    contactButton: {
        padding: theme.spacing.unit*1,
    }
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
            },
            isLoggedIn: false,
            contactDialogOpen: false
        }
        this._contactLandloard = this._contactLandloard.bind(this);
        this._checkAuthentication = this._checkAuthentication.bind(this);
        this._updateImgContainerState = this._updateImgContainerState.bind(this);
    }

    componentDidMount(){
        this._checkAuthentication()
    }

    componentDidUpdate(prevProps){
        if(prevProps.listingId !== this.props.listingId
            && this.props.listingId !== -1){
            getListing(this.props.listingId, (data) => {
                this.setState({ listing: data });
            });
        }
    }

    _checkAuthentication = () => {
        const session = sessionStorage.getItem('session')
            if(session && JSON.parse(session).token){
                // validate session
                const token = JSON.parse(session).token;
          checkSession(token, 
            (_) => this.setState({ isLoggedIn: true }),
            () => this.setState({ isLoggedIn: false }));
            }else{
                this.setState({ isLoggedIn: false });
            }
      }

    _updateImgContainerState = (key, value) => {
        let { imageContainer } = this.state;
        imageContainer[key] = value;
        this.setState({ imageContainer });
    }

    _contactLandloard = () => {
        const { isLoggedIn, contactDialogOpen } = this.state;
        if(isLoggedIn){
            this.setState({ contactDialogOpen: !contactDialogOpen })
        }else{
            alert('You need to log in order to contact landloard.')
        }
    }

    render(){
        
        const { listing, contactDialogOpen } = this.state;
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
                    <Grid
                        container
                        direction={'row'}
                        justify={'flex-end'}
                    >
                        <Toolbar>
                            <IconButton
                                color={'inherit'}
                                onClick={onClose}
                                aria-label={'Close'}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </Grid>
                </AppBar>
                <div className={classes.content} >
                    <Grid container style={{ width: '100%' }} >
                        <Grid item lg={6} md={6} sm={6} >
                            <img
                                className={classes.image}
                                alt="img"
                                src={images.length > 0 ? images[0].src : null}
                            />
                            <MapView
                                mapContainer={classes.map}
                                address={`${listing.line1} ${listing.city} ${listing.state} ${listing.zipCode}`}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} >
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
                                    <Grid item xs={12}>
                                        <Grid 
                                            container
                                            direction={'row'}
                                            justify={'flex-start'}
                                        >
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="contained"
                                                className={classes.contactButton}
                                                onClick={() => this._contactLandloard()}
                                            >
                                                Contact Landloard
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <LandloardContactDialog
                    open={contactDialogOpen}
                    listingId={this.state.listing.id}
                    onClose={() => this.setState({ contactDialogOpen: !contactDialogOpen })}
                />
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