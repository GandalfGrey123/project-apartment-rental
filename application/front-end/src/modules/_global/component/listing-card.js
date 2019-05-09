import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardActionArea,
         CardContent, CardMedia, Badge, Typography
} from '@material-ui/core';
import _ from 'lodash';

const styles = theme => ({
  card: {
    margin: 10
  },
  media: {
    height: 200,
  },
  cardcontent: {
    height: 140,
  },
  badge: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
});

const ListingCard = (props) => {
  const { classes, listing, actions, onListingPress } = props;
  const image = _.isArray(listing.images) && listing.images.length > 0 ? 
      "data:image/png;base64," + listing.images[0] :
      null;
       
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => {
          if(onListingPress) onListingPress(listing.id);
        }}
      >
        <CardMedia
          className={classes.media}
          image={image}
          title={"Listing Image"}
        />
        <CardContent className={classes.cardcontent}>
          <Typography gutterBottom variant="h5" component="h2">
            {listing.title}
          </Typography>

          <Typography component="p">
            {listing.datePosted}
          </Typography>
          <Typography component="p">
            {listing.description}
          </Typography>
          <Badge
            className={classes.badge}
            badgeContent={listing.isApproved ? 'Approved': 'Not Approved'}
            color={listing.isApproved ? 'primary' : 'secondary'}
          />
        </CardContent>
      </CardActionArea>
      {actions}
    </Card>
  );
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  listing: PropTypes.object.isRequired,
  actions: PropTypes.any
};

export default withStyles(styles, { withTheme: true })(ListingCard);