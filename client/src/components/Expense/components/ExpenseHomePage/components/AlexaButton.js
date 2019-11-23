import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const AMAZON_REDIRECT_URL = "https://3000-f924bff3-eea9-4b61-b545-6ebfd54a297b.ws-us02.gitpod.io";   // AMAZON REDIRECT URL after users login to Amazon website

const useStyles = makeStyles(theme => ({
  button: {
    boxShadow: '5px 5px 15px grey'
  },
}));

export default function AlexaButton(){

    // constructor() {
    //     super();
    //     this.amazon = window.amazon;
    // }

    /**
     * When button is clicked, login with amazon and post that redirect to given URL
     */
    // onButtonClick = () => {
    //     const options = {}
    //     options.scope = 'profile';
    //     options.scope_data = {
    //         'profile' : {'essential': false} 
    //     };
    //     this.amazon.Login.authorize(options,
    //         AMAZON_REDIRECT_URL);
    //     return false;
    // };

    // render() {
        const classes = useStyles();
        return (
            <div id="amazon-root">
                <Button variant="contained" color="secondary" className={classes.button}>
                    Enable Alexa
                </Button> 
                {/* <a href id="LoginWithAmazon" onClick={this.onButtonClick}>
                <img border="0" alt="Login with Amazon"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                    width="156" height="32" />
                </a> */}
            </div>
        );
    // }

}

/*

 <Button variant="contained" color="secondary" className={classes.button}>
                Enable Alexa
            </Button> 

 */