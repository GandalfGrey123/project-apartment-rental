import React from 'react';
import {
    Button, 
	ListItem, Divider, List
} from '@material-ui/core'

export const DashBoardList = ({ classes ,fname}) => {

    return (
    	<List>
        <ListItem className={classes.justContent}>
			<Button variant="contained" color="primary" className={classes.button}>
			Active
			</Button>

			<Button variant="contained" color="Default" className={classes.button}>
			Message
			</Button>

			<Button variant="contained" color="secondary" className={classes.button}>
			Remove
			</Button>

			</ListItem>

			<ListItem>
				<span className="ml">{fname}</span>
			</ListItem>

			<ListItem>

			<img className="" alt="post" src="https://via.placeholder.com/200/f5f5f5" />
			</ListItem>

			

			<Divider />
		
			</List>
    )
}

export default DashBoardList;