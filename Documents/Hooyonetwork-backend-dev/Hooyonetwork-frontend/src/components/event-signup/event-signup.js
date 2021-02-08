import React, { useState } from 'react';
import styles from '../event-signup/event-signup.module.scss';
import { Grid, TextField, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, CircularProgress } from '@material-ui/core';
import { Close as IconClose } from '@material-ui/icons/';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/status/status-actions';

function EventSignup (props) {
    const dispatch = useDispatch();
    const [formSubmitting, setFormSubmitting] = useState(false);

    const defaultValues = {
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        number_guests: ""
    }

    const validationSchema = {
        first_name: Yup.string().required('First name is required.'),
        last_name: Yup.string().required('Last name is required.'),
        email_address: Yup.string().required('Email address is required.'),
        phone_number: Yup.string().required('Phone number is required.'),
        number_guests: Yup.string().required('Number of guests is required.')
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        const guest = JSON.parse(JSON.stringify(values));
        delete guest.number_guests;
        axios.post(`${process.env.REACT_APP_API}/guest`, guest)
            .then(response => {
                const rsvp = {
                    num_guests: values.number_guests,
                    guest_id: response.data._id,
                    event_id: props.eventId
                }
                axios.post(`${process.env.REACT_APP_API}/rsvp`, rsvp)
                    .then(() => {
                        setFormSubmitting(false);
                        dispatch(addAlert({ message: 'Thank you for RSVPing to this event!' }))
                        props.handleClose();
                    })
            }).catch(e => {
                setFormSubmitting(false);
                dispatch(addAlert({ message: 'Unable to RSVP at this time. Please contact us via email.' }))
            });
    }

    return (
            <Dialog open={props.open} onClose={props.handleDialogClose} aria-labelledby="RSVP to this event" className={styles.wrapper}>
                <IconButton className={styles.closeDialog} onClick={props.handleClose}>
                    <IconClose />
                </IconButton>
                <DialogTitle>
                    RSVP
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Thank you for your interest in this event! Please fill out the brief form below to RSVP.
                    </DialogContentText>
                    <Formik
                        initialValues={defaultValues}
                        onSubmit={(values) => onSubmit(values)}
                        validationSchema={Yup.object().shape(validationSchema)}
                    >
                        {(formikBag) => (
                            <Grid container className={styles.form} spacing={2}>
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
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
                                        error={formikBag.errors.email_address && formikBag.touched.email_address}
                                        disabled={formSubmitting}
                                        inputProps={{
                                            style: {
                                                backgroundColor: '#fff',
                                                borderRadius: '5px'
                                            }
                                        }}
                                        {...formikBag.getFieldProps('email_address')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone Number" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.phone_number && formikBag.touched.phone_number}
                                        disabled={formSubmitting}
                                        inputProps={{
                                            style: {
                                                backgroundColor: '#fff',
                                                borderRadius: '5px'
                                            }
                                        }}
                                        {...formikBag.getFieldProps('phone_number')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Number of Guests" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.number_guests && formikBag.touched.number_guests}
                                        disabled={formSubmitting}
                                        inputProps={{
                                            style: {
                                                backgroundColor: '#fff',
                                                borderRadius: '5px'
                                            }
                                        }}
                                        {...formikBag.getFieldProps('number_guests')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={styles.buttonWrapper}>
                                        <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.submit}>Submit</Button>
                                        {formSubmitting && <CircularProgress size={24} className={styles.buttonProgress} />}
                                    </div>
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
    );
}

export default EventSignup