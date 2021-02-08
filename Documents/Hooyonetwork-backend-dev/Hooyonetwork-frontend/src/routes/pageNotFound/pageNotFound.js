import React from 'react';
import styles from '../pageNotFound/pageNotFound.module.scss';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className={styles.wrapper}>
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>404 Error: Page Not Found</h1>
                </Grid>
                <Grid item xs={12}>
                    <h2>This page does not exist</h2>
                    <Link to="/">Return to Hooyo's Network Home</Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default PageNotFound