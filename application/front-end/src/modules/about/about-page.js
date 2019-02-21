import React, { Component } from 'react';
import {
    withStyles,
    Paper, Typography,
    Grid
} from '@material-ui/core'
import AboutBtn from './component/about-btn';
import styles from './styles/about-page';
import { Switch, Route, withRouter } from 'react-router-dom';

import AboutAliaksei from './pages/about-aliaksei';
import AboutMarcus from './pages/about-marcus';
import AboutRomeel from './pages/about-romeel';
import AboutJiaNan from './pages/about-jianan';
import AboutInez from './pages/about-inez';
import AboutHang from './pages/about-hang';
import AboutIsmael from './pages/about-ismael';


class AboutPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentLocation: ''
        };
    }

    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        if(this.props.location){
            let loc = this.props.location.pathname.replace('/', '').trim();
            console.log('Loc:', loc);
            this.setState({ currentLocation: loc});
        }
    }

    render(){

        const { currentLocation } = this.state;
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
                            justify={'center'}
                        >
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://cdn3.iconfinder.com/data/icons/avatar-set/512/Avatar01-512.png'}
                                name={'Inez Wibowo'}
                                role={'Team Lead'}
                                to={'/'}
                                selected={currentLocation === ''}
                            />
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://www.clipartmax.com/png/middle/319-3191274_male-avatar-admin-profile.png'}
                                name={'Aliaksei Siarheyeu'}
                                role={'Lead'}
                                to={'/alex'}
                                selected={currentLocation === 'alex'}
                            />
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                role={'Lead'}
                                name={'Marcus Wong'}
                                to={'/marcus'}
                                selected={currentLocation === 'marcus'}
                            />
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                name={'Romeel Chaudhari'}
                                role={'Engineer'}
                                to={'/romeel'}
                                selected={currentLocation === 'romeel'}
                            />
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                name={'Jia Nan Mai'}
                                role={'Engineer'}
                                to={'/jianan'}
                                selected={currentLocation === 'jianan'}
                            />
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                name={'Hang Li'}
                                role={'Engineer'}
                                to={'/hang'}
                                selected={currentLocation === 'hang'}
                            />
                            <AboutBtn
                                classes={classes}
                                avatarUrl={'https://pngimage.net/wp-content/uploads/2018/05/avatar-icon-png-6.png'}
                                name={'Ismael San Juan'}
                                role={'Engineer'}
                                to={'/ismael'}
                                selected={currentLocation === 'ismael'}
                            />
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
                                <Route path={'/jianan'} component={AboutJiaNan} />
                                <Route path={'/romeel'} component={AboutRomeel} />
                                <Route path={'/marcus'} component={AboutMarcus} />
                                <Route path={'/hang'} component={AboutHang} />
                                <Route path={'/ismael'} component={AboutIsmael} />
                                <Route path={'/alex'} component={AboutAliaksei} /> 
                                <Route path={'/'} component={AboutInez} /> {/* <- This should stay the last in the list */}
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(AboutPage));
