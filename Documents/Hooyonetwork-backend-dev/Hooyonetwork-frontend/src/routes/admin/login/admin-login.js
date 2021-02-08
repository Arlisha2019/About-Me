import React, { useState } from 'react';
import styles from './admin-login.module.scss';
import { Grid, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../store/user/user-actions';
import { addAlert } from '../../../store/status/status-actions';

function AdminLogin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formSubmitting, setFormSubmitting] = useState(false);

    const defaultValues = {
        username: "",
        password: ""
    }

    const validationSchema = {
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.')
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        dispatch(login(values.username, values.password))
            .then(() => {
                history.push('/admin');
            }).catch((e) => {
                dispatch(addAlert({ message: 'Invalid username or password.' }));
            }).finally(() => {
                setFormSubmitting(false);
            })
    }

    return (
        <div className={`containerWrapper ${styles.wrapper}`}>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Admin Login</h1>
                </Grid>
            </Grid>
            <Formik
                initialValues={defaultValues}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={Yup.object().shape(validationSchema)}
            >
                {(formikBag) => (
                    <Grid container className={styles.form} spacing={2} justify="center">
                        <Grid item xs={12} sm={3} md={2}>
                            <TextField
                                label="Username" 
                                variant="outlined"
                                fullWidth
                                required
                                error={formikBag.errors.username && formikBag.touched.username}
                                disabled={formSubmitting}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '5px'
                                    }
                                }}
                                {...formikBag.getFieldProps('username')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={2}>
                            <TextField
                                label="Password"
                                type="password" 
                                variant="outlined"
                                fullWidth
                                required
                                error={formikBag.errors.password && formikBag.touched.password}
                                disabled={formSubmitting}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '5px'
                                    }
                                }}
                                {...formikBag.getFieldProps('password')}
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

export default AdminLogin