import React from 'react';
import PropTypes from 'prop-types';
import {    
    Divider, Checkbox, withStyles,
    List, ListItem, ListItemText, ListSubheader, 
    Radio, RadioGroup
} from '@material-ui/core';
import { getHouseTypes } from '../../../api/listings.actions';
import styles from '../styles/home-page';
import _ from 'lodash';

class DrawerItems extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            types: ['All'], // All by default, other types will come from DB.
            selectedTypes: [], // Empty means all
          };
          this.isChecked = this.isChecked.bind(this);
          this.getHousingTypes = this.getHousingTypes.bind(this);
          this.selectHousingType = this.selectHousingType.bind(this);
    }

    componentWillMount() {
        this.getHousingTypes();
    }

    getHousingTypes = () => {
        let { types } = this.state;
        getHouseTypes((data) => {
            types = types.concat(
                data.map((value) => _.capitalize(value.type))
            );
            this.setState({ types: types })
        })
    }

    selectHousingType = type => event => {
        const { onDrawerSelectionChange } = this.props;
        if (type === 'All') {
          this.setState({ selectedTypes: [] }, () => {
            onDrawerSelectionChange({ types: [] });
          });
        } else {
          let { selectedTypes } = this.state;
          if (event.target.checked) selectedTypes.push(type);
          else _.remove(selectedTypes, (i) => i === type);
          this.setState({ selectedTypes: selectedTypes }, () => {
            onDrawerSelectionChange({ types: selectedTypes });
          });
        }
      };
    
      isChecked = (text) => {
        return (text === 'All' && _.isEmpty(this.state.selectedTypes))
          || this.state.selectedTypes.includes(text);
      }

    render(){
        const { types } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <List subheader={<ListSubheader> Housing Types</ListSubheader>} className={classes.subList}>
                    {types.map((text, index) => (
                        <ListItem button key={`item-${index}`}>
                            <Checkbox
                                checked={this.isChecked(text)}
                                onChange={this.selectHousingType(text)}
                            />
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List subheader={<ListSubheader>Beds</ListSubheader>} className={classes.subList}>
                    <ListItem button>
                        <ListItemText primary={"0+"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"1+"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"2+"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"3+"} />
                    </ListItem>
                </List>
                <Divider />
            </React.Fragment>
        )
    }
}

DrawerItems.propTypes = {
    onDrawerSelectionChange: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(DrawerItems);