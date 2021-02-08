import React from 'react';
import styles from '../donate/donate.module.scss';
import { Grid } from '@material-ui/core';

function Donate() {
    return (
        <div className={styles.wrapper}>
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                </Grid>
                <Grid item xs={12}>
                    <h1>Donate Today</h1>
                    <p>We are proudly non-profit, non-corporate, and non-compromised. 
                        People like you help us provide for a community in need. We 
                        rely on donations to carry out our mission in the Twin Cities 
                        area. Will you give today? </p>
                    <p>Your donation helps purchase food, dry goods, clothing, diapers, sanitary items, and legal services for families in need.</p>
                    <h2>Paypal Donation Button Here</h2>
                    <h2>Venmo Donation Button Here</h2>
                    <h2>CashApp Donation Button Here</h2>
                    <p>You can also send a check to Hooyo's Network PO Box 87 Cities, MO 87978. Make checks payable to Hooyo's Network.</p>
                    <h2>Physical Donations</h2>
                    <p>Due to the Covid-19 pandemic, we are not accepting physical donations at this time.</p>
                </Grid>
            </Grid>
        </div>
    );
}

export default Donate