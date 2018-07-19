import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const drawerWidth = 240;

const styles = theme => ({ 
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
  toolbar: theme.mixins.toolbar,  
});
class VMDrawer extends React.Component {
    
    constructor(props){
        super(props);                
    }
   
    render() {        
        const { classes } = this.props;       

        return (                            
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
        );
    }
}

VMDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const withStyle = withStyles(styles)(VMDrawer)
export { withStyle as VMDrawer };