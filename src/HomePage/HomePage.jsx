import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { userActions } from '../_actions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,    
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: theme.palette.background.drawer,
  },
  itemText:{
    color: theme.palette.primary.contrastText
  },
  menuIcon:{
    color: theme.palette.primary.contrastText
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});
class HomePage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {        
            anchorEl: null,
        };
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getUser());
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
        const { classes, user } = this.props;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex} noWrap>
                            Dashboard
                        </Typography>
                        {user && (
                            <div>
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
                <Drawer
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText disableTypography primary="Inbox" className={classes.itemText} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText disableTypography primary="Drafts" className={classes.itemText} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem button>
                            <ListItemText disableTypography primary="Trash" className={classes.itemText} />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText disableTypography primary="Spam" className={classes.itemText} />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                </main>
            </div>
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
HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const connectedHomePage = connect(mapStateToProps)(HomePage);
const withStyle = withStyles(styles)(connectedHomePage)
export { withStyle as HomePage };









//<div className="col-md-6 col-md-offset-3">
{/* <h1>Hi {user.firstName}!</h1>
<p>You're logged in with React!!</p>
<h3>All registered users:</h3>
{users.loading && <em>Loading users...</em>}
{users.error && <span className="text-danger">ERROR: {users.error}</span>}
{users.items && users.items.fullName }
<p>
    <Link to="/login">Logout</Link>
</p>
</div> */}