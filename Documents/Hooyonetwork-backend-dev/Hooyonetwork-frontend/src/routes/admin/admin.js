import React from 'react';
import { Grid } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import styles from '../admin/admin.module.scss';
import AdminEvents from '../admin/admin-events/admin-events';
import AdminVolunteer from '../admin/admin-volunteer/admin-volunteer';
import AdminResources from '../admin/admin-resources/admin-resources';
import AdminHome from '../admin/admin-home/admin-home';

function Admin(props) {
    return(
        <div className={`containerWrapper ${styles.wrapper}`}>
            <Grid container className={styles.navbar}>
                <Grid item xs={12}>
                    <nav>
                        <ul>
                            <li><Link to={'/admin'}>HOME</Link></li>
                            <li><Link to={'/admin/events'}>EVENTS</Link></li>
                            <li><Link to={'/admin/resources'}>RESOURCES</Link></li>
                            <li><Link to={'/admin/volunteer_mgmt'}>VOLUNTEER</Link></li>
                        </ul>
                    </nav>
                </Grid>
            </Grid>
            <Switch>
                <Route exact path="/admin">
                    <AdminHome />
                </Route>
                <Route
                    path="/admin/events"
                    render={(props) => (
                        <AdminEvents {...props} />
                    )}
                />
                <Route
                    path="/admin/resources"
                    render={(props) => (
                        <AdminResources {...props} />
                    )}
                />
                <Route
                    path="/admin/volunteer_mgmt"
                    render={(props) => (
                        <AdminVolunteer {...props} />
                    )}
                />
            </Switch>
        </div>
    );
}

export default Admin