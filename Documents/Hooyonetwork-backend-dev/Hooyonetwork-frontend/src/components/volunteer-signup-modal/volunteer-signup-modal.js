import React, { useState } from 'react';
import styles from '../volunteer-signup-modal/volunteer-signup-modal.module.scss';
import { Grid, TextField, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Close as IconClose } from '@material-ui/icons/';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/status/status-actions';

function VolunteerSignup (props) {
    
    const dispatch = useDispatch();
    const [formSubmitting, setFormSubmitting] = useState(false);

    const defaultValues = {
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        address: "",
        role_type: [],
        event_id: props.eventId
    }

    const roleType = [
        {value: 'Event Setup/Teardown', label: 'Event Setup/Teardown'},
        {value: 'Guest Management', label: 'Guest Management'},
        {value: 'No Preference', label: 'No preference'}
    ]

    const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const validationSchema = {
        first_name: Yup.string().required('First name is required.'),
        last_name: Yup.string().required('Last name is required.'),
        email_address: Yup.string().required('Email address is required.'),
        phone_number: Yup.string().required('Phone number is required.').matches(phoneRegExp, 'Phone number is not valid.'),
        address: Yup.string().required('Address is required.'),
        role_type: Yup.string().required('Role preference is required.')
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        axios.post(`${process.env.REACT_APP_API}/volunteersignup`, values)
            .then(() => {
                dispatch(addAlert({ message: 'Thank you for volunteering for this event!' }))
                props.onClose();
            }).catch(e => {
                dispatch(addAlert({ message: 'Unable to sign up at this time. Please email hooyos@hooyosnetwork.com.' }))
            }).finally(() => {
                setFormSubmitting(false);
            })
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="Volunteer for this event" className={styles.wrapper}>
            <IconButton className={styles.closeDialog} onClick={props.onClose}>
                <IconClose />
            </IconButton>
            <DialogTitle>
                Volunteer Sign Up
            </DialogTitle>
            <DialogContent>
                    <DialogContentText>
                        Thank you for your interest in volunteering! Please fill out the brief form below and we will be in touch.
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
                                        label="Address" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.address && formikBag.touched.address}
                                        disabled={formSubmitting}
                                        inputProps={{
                                            style: {
                                                backgroundColor: '#fff',
                                                borderRadius: '5px'
                                            }
                                        }}
                                        {...formikBag.getFieldProps('address')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Role Preference</InputLabel>
                                            <Select
                                                value={formikBag.values.role_type}
                                                label="Role Preference"
                                                onChange={(event) => {
                                                    formikBag.setFieldValue('role_type', event.target.value)
                                                }}
                                                disabled={formSubmitting}
                                                required
                                                fullWidth
                                                error={formikBag.errors.role_type && formikBag.touched.role_type}
                                                {...formikBag.getFieldProps('role_type')}
                                            >
                                            {roleType.map((roleType, index) => (
                                                <MenuItem key={`${roleType.value}-${index}`} value={roleType.value}>
                                                    {roleType.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className={styles.consent}>
                                    <p>By submitting this form, you are consenting to receive emails from: The Hooyo's Network. You can revoke your consent to receive emails at 
                                        any time by using the SafeUnsubscribe® link, found at the bottom of every email. Emails are serviced by MailChimp.</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.submit}>Submit</Button>
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </DialogContent>
        </Dialog>
    );
}

export default VolunteerSignup