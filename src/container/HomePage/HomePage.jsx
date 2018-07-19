import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../../_actions';
import { VMAppBar } from '../../components/VMAppBar';
import { VMDrawer } from '../../components/VMDrawer/VMDrawer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,    
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },  
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: theme.palette.background.drawer,
  },
  itemText:{
    color: theme.palette.primary.contrastText
  },  
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.content,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,  
});
class HomePage extends React.Component {
    
    constructor(props){
        super(props);                
    }

    componentDidMount() {
        this.props.dispatch(userActions.getUser());
    }   
   

    render() {        
        const { classes, user } = this.props;       

        return (
            <div className={classes.root}>                
                <VMAppBar />
                <VMDrawer />                
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