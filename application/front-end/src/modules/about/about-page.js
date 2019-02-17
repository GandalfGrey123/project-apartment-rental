import React, { Component } from 'react';
import {
    withStyles,
    Paper, Typography,
    Grid
} from '@material-ui/core'
import AboutBtn from './component/about-btn';
import styles from './styles/about-page';
import { Switch, Route } from 'react-router-dom';

import AboutAliaksei from './pages/about-aliaksei';
import AboutMarcus from './pages/about-marcus';

class AboutPage extends Component{

    render(){

        const { classes } = this.props;

        return (
            <Paper className={classes.root} >
                <div className={classes.titleContainer}>
                    <Typography className={classes.grow} variant={'title'} >
                        Software Enginering class SFSU
                    </Typography>
                    <p>Spring 2019</p>
                    <p>Section 02</p>
                    <p>Team 9</p>
                </div>
                <Grid
                    container
                    className={classes.content}
                    direction={'row'}
                    spacing={16}
                >
                    <Grid xs={4} item>
                        <Grid
                            container
                            direction={'column'}
                        >
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                name={'Aliaksei Siarheyeu'}
                                to={'/'}
                            />
                            
                                {

                                <AboutBtn
                                    classes={classes}
                                    avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                    name={'Marcus Wong'}
                                    to={'/marcus'} 
                                />  

                                }
                                                          
                            
                        </Grid>    
                    </Grid>
                    <Grid xs={8} item> 
                        <Grid 
                            container
                            justify={'center'}
                            alignItems={'center'}
                            className={classes.pageContent}
                        >
                            <Switch>
                                {
                                    <Route path={'/marcus'} component={AboutMarcus} />
                                }                                                           
                                <Route path={'/'} component={AboutAliaksei} /> {}                                
                            </Switch>
                            
                   
                             
                        </Grid>
                    </Grid>
                </Grid>      
            </Paper>   
        )
    }
}

export default withStyles(styles, { withTheme: true })(AboutPage);