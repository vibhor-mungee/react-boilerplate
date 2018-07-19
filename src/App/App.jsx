import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NewMuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import Snackbar  from '@material-ui/core/Snackbar';
import SnackbarContent  from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from "classnames";
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#4f83cc",
        main: "#01579b",
        dark: "#002f6c",
        contrastText: "#fff"
      },
      secondary: {
        light: "#718792",
        main: "#455a64",
        dark: "#1c313a",
        contrastText: "#fff"
      },
      background: {
        default: "#01579b",
        white: "#ffffff",
        drawer: "#212121",
      }
    }
}) 

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.primary.contrastText     
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    success: {
        backgroundColor: green[600],
        color: theme.palette.primary.contrastText
    },
    warning: {
        backgroundColor: amber[700],
        color: theme.palette.primary.contrastText
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
})
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        this.handleClose = this.handleClose.bind(this);
    };

    handleClose (event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        // this.setState({ open: false });
    };

    render() {
        const { alert, classes, className } = this.props;
        const Icon = variantIcon[alert.type];
        return (
            <NewMuiThemeProvider theme={theme}>       
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={alert.message!=undefined}                        
                        autoHideDuration={3000}                        
                        onClose={this.handleClose}>
                        <SnackbarContent
                            className={classNames(classes[alert.type],className)}
                            aria-describedby="client-snackbar"
                            message={
                                <span id="client-snackbar" className={classes.message}>
                                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                                    {alert.message}
                                </span>
                            }
                            action={[
                                <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                                >
                                    <CloseIcon className={classes.icon} />
                                </IconButton>,
                            ]}                            
                            />
                    </Snackbar> 
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                        </div>
                    </Router>                  
                </div>                               
            </NewMuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
const withStyle = withStyles(styles)(connectedApp)
export { withStyle as App }; 