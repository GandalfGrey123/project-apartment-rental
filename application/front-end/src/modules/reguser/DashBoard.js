import React, { Component } from 'react';
import "./css/DashBoard.css"
import styles from './css/DashBoard';
import logo from './img/logo.jpg';
import logo2 from './img/logo2.png';
import picture from './img/picture.png';
import DashBoardList from './component/DashBoardList';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    withStyles,TextField,
    Paper, Typography, 
    Toolbar, AppBar,
    Grid, Button,
    CardActions, Card,
    CardContent, List, ListItem, ListItemText,
    Divider, 
} from '@material-ui/core'


class DashBoard extends Component {

       


render() {
	const { classes } = this.props;
	return (
		<Paper>
			<AppBar position="static" >
				<Toolbar>
					<Typography variant="title" color="inherit">
						 <img alt="label" className="ml" src={logo2} />
						 <div class="vl"> 
						 	<span>&nbsp; Gatorooms</span>
						 </div>

					</Typography>
				</Toolbar>
			</AppBar>

			<Grid
		      justify="space-between" // Add it here :)
		      container 
		      spacing={0}
      		>

			<Grid item>
	        <TextField
	          id="outlined-search"
	          label="Search field"
	          type="search"
	          style={{marginRight: '40px'}}
	          margin="normal"
	          variant="outlined"

	        />
	        
	        <Button variant="outlined" color="primary" className={classes.button}>
	            Search
	        </Button>
	        </Grid>

	        <Grid item>
	        <Button variant="contained" color="primary" className={classes.button}>
	       	 	Home
	        </Button>

	        <Button variant="contained" color="primary" className={classes.button}>
	        	Listing
	        </Button>
	        </Grid>
			
			</Grid>

			<Divider light />

			<div >
				<div>
					<img src={picture} className={classes.imgCard + " fl"}/>
				</div>

				<div className="fl">
					<h4>Your Properties</h4>
					<p>&#8226; 22 James Smith</p>
					<h4>Messages</h4>
					<p>&#8226; 2 Unread Messages</p>
				</div>

				<div className="fl">
					<h4>About</h4>
					<p> 
					About me, Lorem Ipsum is simply<br/>
					Dividerummy text of the printing<br/>
					and typesetting 
					</p>
				</div>



			</div>

			<Divider />

			<DashBoardList classes={classes} fname={"19 Jesica Steve"} />

			<DashBoardList classes={classes} fname={"28 Merinda Alba"} />

			<DashBoardList classes={classes} fname={"35 Alex Alex"} />

		</Paper>
	)

}
}
export default withStyles(styles)(DashBoard);