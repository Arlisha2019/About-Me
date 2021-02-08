import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../contact/contact.module.scss';
import { Grid, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/status/status-actions';

function Contact() {

    const dispatch = useDispatch();
    const [formSubmitting, setFormSubmitting] = useState(false);

    const defaultValues = {
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        message: ""
    }

    const validationSchema = {
        first_name: Yup.string().required('First name is required.'),
        last_name: Yup.string().required('Last name is required.'),
        email: Yup.string().required('Email address is required.'),
        subject: Yup.string().required('Subject is required.'),
        message: Yup.string().required('Message is required.')
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        axios.post(`${process.env.REACT_APP_API}/contact`, values)
            .then(() => {
                dispatch(addAlert({ message: 'Message successfully submitted.' }))
            }).catch(e => {
                dispatch(addAlert({ message: 'Unable to submit message at this time. Please email hooyos@hooyosnetwork.com.' }))
            }).finally(() => {
                setFormSubmitting(false);
            })
    }

    return (
        <div className={styles.wrapper}>
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>We are always open to suggestions.</h1>
                </Grid>
            </Grid>
            <div className="containerWrapper">
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Grid container>
                            <Grid item xs={12} className={styles.contactBlurb}>
                                <h2>Contact us</h2>
                                <p>Rest assured, we won't be disclosing any of your personal information to any 
                                    third parties, and will store all details in full confidentiality.</p>
                            </Grid>
                            <Grid item xs={12} className={styles.email}>
                                <p><Link to="mailto:hooyosnetwork@gmail.com"><span>Email us</span> at hooyosnetwork@gmail.com</Link></p>
                            </Grid>
                            <Grid item xs={12} className={styles.address}>
                                <address>
                                    <p>Hooyo's Network</p>
                                    <p>1390 Thaxton School Road</p>
                                    <p>Thaxton, VA 24174</p>
                                    <p>PO Box 345 Richmond, VA 80019</p>
                                </address>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} className={styles.formWrapper}>
                        <Formik
                            initialValues={defaultValues}
                            onSubmit={(values) => onSubmit(values)}
                            validationSchema={Yup.object().shape(validationSchema)}
                        >
                            {(formikBag) => (
                                <div className="containerWrapper">
                                    <Grid container className={styles.form} spacing={2} justify="center">
                                        <Grid item xs={6}>
                                            <TextField
                                                label="First Name" 
                                                variant="outlined"
                                                fullWidth
                                                required
                                                error={formikBag.errors.first_name && formikBag.touched.first_name}
                                                disabled={formSubmitting}
                                                inputProps={{
                                                    style: {
                                                        backgroundColor: '#fff',
                                                        borderRadius: '5px'
                                                    }
                                                }}
                                                {...formikBag.getFieldProps('first_name')}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Last Name" 
                                                variant="outlined"
                                                fullWidth
                                                required
                                                error={formikBag.errors.last_name && formikBag.touched.last_name}
                                                disabled={formSubmitting}
                                                inputProps={{
                                                    style: {
                                                        backgroundColor: '#fff',
                                                        borderRadius: '5px'
                                                    }
                                                }}
                                                {...formikBag.getFieldProps('last_name')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Email Address" 
                                                variant="outlined"
                                                fullWidth
                                                required
                                                error={formikBag.errors.email && formikBag.touched.email}
                                                disabled={formSubmitting}
                                                inputProps={{
                                                    style: {
                                                        backgroundColor: '#fff',
                                                        borderRadius: '5px'
                                                    }
                                                }}
                                                {...formikBag.getFieldProps('email')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Subject" 
                                                variant="outlined"
                                                fullWidth
                                                required
                                                error={formikBag.errors.subject && formikBag.touched.subject}
                                                disabled={formSubmitting}
                                                inputProps={{
                                                    style: {
                                                        backgroundColor: '#fff',
                                                        borderRadius: '5px'
                                                    }
                                                }}
                                                {...formikBag.getFieldProps('subject')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message" 
                                                variant="outlined"
                                                multiline
                                                rows={5}
                                                rowsMax={10}
                                                fullWidth
                                                required
                                                error={formikBag.errors.message && formikBag.touched.message}
                                                disabled={formSubmitting}
                                                inputProps={{
                                                    style: {
                                                        backgroundColor: '#fff',
                                                        borderRadius: '5px'
                                                    }
                                                }}
                                                {...formikBag.getFieldProps('message')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={styles.consent}>
                                                <p>By submitting this form, you are consenting to receive emails from The Hooyo's Network. You can revoke your consent to receive emails at 
                                                any time by using the SafeUnsubscribe® link, found at the bottom of every email. Emails are serviced by MailChimp.</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit}>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Contact