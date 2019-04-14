import React from 'react';
import {
    Menu, MenuItem
} from '@material-ui/core';

const AppBarMenu = ({ 
    items,
    open,
    onClose,
    anchorEl,
    onItemClick
}) => {
    return (
        <Menu
            id="menu-appbar"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
        >
            {
                items.map((value, index) => (
                    <MenuItem 
                        key={`menu-item-${index+1}`}
                        onClick={() => onItemClick(value.id)}
                    >
                        {value.label}
                    </MenuItem>
                ))
            }
        </Menu>
    )
}

export default AppBarMenu;