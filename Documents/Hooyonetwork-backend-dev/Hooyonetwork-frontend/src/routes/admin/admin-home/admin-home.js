import React, { useState } from 'react';
import styles from '../admin-home/admin-home.module.scss';
import { Grid, TextField, Button, FormControlLabel, Switch } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AdminHome() {
    const [formSubmitting, setFormSubmitting] = useState(false);
    const defaultValues = {
        body: ""
    }
    const [announcement, setAnnouncement] = useState({
        checkedB: false
    });

    const validationSchema = {
        body: Yup.string().required('Body text is required.')
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        axios.post('', values)
            .then(() => {
            }).catch(e => {
                //onFailure
            }).finally(() => {
                setFormSubmitting(false);
            })
    }

    return(
        <div className={styles.wrapper}>
            <Grid container>
                <Grid item xs={12}>
                    <h2>Admin Home</h2>
                    <p>Use the navigation menu at the top to edit events and resources or to manage volunteers.</p>
                    <p>If you require assistance, please email queensweb@queensweb.com</p>
                    <p>Reset Password</p>
                </Grid>
            </Grid>
            <Formik
            initialValues={defaultValues}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={Yup.object().shape(validationSchema)}
            >
             {(formikBag) => (
                 <Grid container className={styles.form} spacing={2}>
                     <Grid item xs={12}>
                        <h3>Home Page Announcement</h3>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={formikBag.values.announcement}
                                    onChange= {event => { formikBag.setFieldValue('announcement', event.target.checked) }}
                                    name="checkedB"
                                    color="primary"
                                    required
                                    error={formikBag.errors.announcement && formikBag.touched.announcement}
                                    disabled={formSubmitting}
                                    inputProps={{ 'aria-label': 'announcement on/off switch' }}
                                />
                                }
                                label="ON"
                            />
                        </Grid>
                        <p><strong>Current Announcement:</strong></p>
                        <p><em>Due to the COVID-19 virus, we are not hosting in-person events or accepting physical donations
                            at this time. Please check back soon for more updates and stay safe.</em>
                        </p>
                        <p>Fill out this form to change the announcement on the home page.</p>
                     </Grid>
                        <Grid item xs={12} sm={10} lg={8}>
                            <TextField
                                label="Body Text" 
                                variant="outlined"
                                multiline
                                rows={5}
                                rowsMax={10}
                                fullWidth
                                required
                                error={formikBag.errors.body && formikBag.touched.body}
                                disabled={formSubmitting}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '5px'
                                    }
                                }}
                                {...formikBag.getFieldProps('body')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit}>Submit</Button>
                        </Grid>
                 </Grid>
             )}
            </Formik>
        </div>
    );
}

export default AdminHome