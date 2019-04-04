import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

const styles = {
  card: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 200,
  },
  cardcontent: {
    height: 140,
  }
};

const ListingCard = (props) => {
  const { classes, listing } = props;
  const image = _.isArray(listing.images) && listing.images.length > 0 ? 
      "data:image/png;base64," + listing.images[0] :
      null;

  const date = new Date();
  return (
    <Card className={classes.card}>
      <CardActionArea>
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  listing: PropTypes.object.isRequired
};

export default withStyles(styles)(ListingCard);