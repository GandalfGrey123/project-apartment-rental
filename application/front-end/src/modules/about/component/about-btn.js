import React from 'react';
import {
    Typography,
    Grid, Button, Avatar
} from '@material-ui/core'
import { Link } from 'react-router-dom';

export const AboutBtn = ({ classes, avatarUrl, to, name }) => {

    return (
        <Button
            component={Link}
            to={to}
        >
            <Grid
                container 
                direction={'row'}
                justify={'center'}
                alignItems={'center'}
            >
                <Avatar
                    className={classes.bigAvatar}
                    src={avatarUrl}
                />
                <Typography>{name}</Typography>
            </Grid>
        </Button>
    )
}

export default AboutBtn;