import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../../_actions';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CircularProgress from "@material-ui/core/CircularProgress";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";

const styles = theme => ({    
    card: {
      maxWidth: 345,
      margin: "auto",
      marginTop: "150px"
    },    
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "100%"
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    icon: {
      fontSize: 20,
      color: "white"
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    cardActions: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"     
    },
    loginButton: {
      minWidth: 0,
      marginBottom: theme.spacing.unit
    },
    fabProgress: {
      color: indigo[ 800 ],
      position: "absolute",
      top: -6,
      left: -6,
      zIndex: 1
    },
    wrapper: {
      margin: theme.spacing.unit,
      position: "relative"
    },
    loginSuccess: {
      backgroundColor: green[ 500 ]
    }
  });

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { dispatch } = this.props;
        const { email, password } = this.state;
        if(!email || !password){
            dispatch(alertActions.warning("Email or password cannot be blank"))
        }
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
        const { loggingIn, loggedIn, classes } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Login
                    </Typography>
                    <form name="form" className={classes.loginContainer} autoComplete="off">                        
                        <TextField name="email" label="Email" className={classes.textField} value={ email } 
                            onChange={ this.handleChange } margin="normal"  autoComplete="off" />                                                       
                        <TextField name="password" label="Password" className={classes.textField} type="password" 
                            value={ password } onChange={ this.handleChange } margin="normal"  autoComplete="off" />                                                                      
                    </form>
                </CardContent>
                <CardActions className={classes.cardActions}>    
                    <div className={classes.wrapper}>                                    
                        <Button className={ classNames( classes.loginButton, loggedIn && classes.loginSuccess )} 
                            variant="fab" size="small" color="primary"
                            onClick={ this.handleSubmit }>
                            { loggedIn ? <CheckIcon />  : <ArrowForward />}
                        </Button>
                        {loggingIn && <CircularProgress size={68} className={classes.fabProgress} />}
                    </div>
                    {/* <Link to="/register" className="btn btn-link">Register</Link> */}
                </CardActions>                    
            </Card>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
const withStyle = withStyles(styles)(connectedLoginPage);
export { withStyle as LoginPage };