import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { userActions } from '../../_actions';

const styles = theme => ({  
  flex: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },     
  toolbar: theme.mixins.toolbar,
});
class VMAppBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {        
            anchorEl: null,
        };
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }   

    handleMenu(event){
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose(){
        this.setState({ anchorEl: null });
    };

    handleLogout(){
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { anchorEl } = this.state;
        const { classes, users } = this.props;
        const open = Boolean(anchorEl);

        return (            
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex} noWrap>
                        Dashboard
                    </Typography>
                    {users && (
                        <div>
                            {users.items && users.items.fullName}
                            <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                        )}
                </Toolbar>
            </AppBar>                
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
VMAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const connectedVMAppBar = connect(mapStateToProps)(VMAppBar);
const withStyle = withStyles(styles)(connectedVMAppBar)
export { withStyle as VMAppBar };