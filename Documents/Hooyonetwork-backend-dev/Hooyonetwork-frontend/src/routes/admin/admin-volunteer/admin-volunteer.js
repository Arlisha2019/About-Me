import React, { useState, useEffect } from 'react';
import styles from '../admin-volunteer/admin-volunteer.module.scss';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Hidden, IconButton, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle, TextField, 
    FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Close as IconClose } from '@material-ui/icons/';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/status/status-actions';

function AdminVolunteer() {
    const dispatch = useDispatch();
    const [addVolunteerDialogOpen, setAddVolunteerDialogOpen] = useState(false);
    const [helpDialogOpen, setHelpDialogOpen] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [volunteers, setVolunteers] = useState([]);
    const [loadingVolunteers, setLoadingVolunteers] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        address: "",
        role_type: []
    });

    const roleType = [
        {value: 'Event Setup/Teardown', label: 'Event Setup/Teardown'},
        {value: 'Guest Management', label: 'Guest Management'},
        {value: 'No Preference', label: 'No preference'}
    ]

    useEffect(() => {
        if (selectedVolunteer) {
            setDefaultValues({
                first_name: selectedVolunteer.first_name,
                last_name: selectedVolunteer.last_name,
                email_address: selectedVolunteer.email_address,
                phone_number: selectedVolunteer.phone_number,
                address: selectedVolunteer.address,
                role_type: selectedVolunteer.role_type
            })
        } else {
            setDefaultValues({
                first_name: "",
                last_name: "",
                email_address: "",
                phone_number: "",
                address: "",
                role_type: []
            })
        }
    }, [selectedVolunteer]);

    useEffect(() => {
        setLoadingVolunteers(true);
        axios.get(`${process.env.REACT_APP_API}/volunteer`)
            .then(response => {
                setVolunteers(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch volunteers' }))
            }).finally(() => {
                setLoadingVolunteers(false);
            })
    }, [dispatch]);

    const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const validationSchema = {
        first_name: Yup.string().required('First name is required.'),
        last_name: Yup.string().required('Last name is required.'),
        email_address: Yup.string().required('Email address is required.'),
        phone_number: Yup.string().required('Phone number is required.').matches(phoneRegExp, 'Phone number is not valid.'),
        address: Yup.string().required('Address is required.'),
        role_type: Yup.string().required('Role preference is required.')
    }

    const handleAddVolunteerDialogOpen = () => {
        setAddVolunteerDialogOpen(true);
    }
    
    const handleAddVolunteerDialogClose = () => {
        setAddVolunteerDialogOpen(false);
    }

    const handleHelpDialogOpen = () => {
        setHelpDialogOpen(true);
    }

    const handleHelpDialogClose = () => {
        setHelpDialogOpen(false);
    }

    const handleDeleteDialogOpen = (clickEvent, volunteer) => {
        clickEvent.stopPropagation();
        setDeleteDialogOpen(true);
        setSelectedVolunteer(volunteer);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedVolunteer(null);
    }

    const handleDeleteVolunteer = () => {
        axios.delete(`${process.env.REACT_APP_API}/volunteer/${selectedVolunteer._id}`)
            .then(() => {
                dispatch(addAlert({ message: 'Volunteer successfully deleted.' }));
                setVolunteers(volunteers.filter(volunteer => volunteer._id !== selectedVolunteer._id))
                handleDeleteDialogClose();
            })
    }

    const onAddVolunteer = (volunteer) => {
        setVolunteers([volunteer].concat(volunteers));
        dispatch(addAlert({ message: 'Volunteer successfully created.' }));
    }

    const handleEditVolunteer = (volunteer) => {
        setSelectedVolunteer(volunteer);
        handleAddVolunteerDialogOpen();
    }

    const onEditVolunteer = (volunteer) => {
        setVolunteers(volunteers.map(vol => {
            if (vol._id === volunteer._id) {
                return volunteer
            } else {
                return vol
            }
        }));
        dispatch(addAlert({ message: 'Volunteer successfully updated.' }));
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        if (selectedVolunteer) {
            axios.put(`${process.env.REACT_APP_API}/volunteer/${selectedVolunteer._id}`, values)
                .then(response => {
                    onEditVolunteer(response.data);
                    handleAddVolunteerDialogClose();
                }).catch(e => {
                    dispatch(addAlert({ message: 'Unable to edit volunteer.' }));
                }).finally(() => {
                    setFormSubmitting(false);
                })
        } else {
            axios.post(`${process.env.REACT_APP_API}/volunteer`, values)
                .then(response => {
                    onAddVolunteer(response.data);
                    handleAddVolunteerDialogClose();
                }).catch(e => {
                    dispatch(addAlert({ message: 'Unable to create volunteer.' }));
                }).finally(() => {
                    setFormSubmitting(false);
                })
        }
    }

    return (
        <div className={styles.wrapper}>
            <Dialog 
                open={addVolunteerDialogOpen}
                onClose={handleAddVolunteerDialogClose} 
                aria-labelledby="add volunteer" 
                className={styles.addVolunteerDialogContent} >
                <IconButton className={styles.closeDialogIcon} onClick={handleAddVolunteerDialogClose}><IconClose /></IconButton>
                <DialogTitle>
                    { selectedVolunteer ? 'Edit' : 'Add' } Volunteer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { selectedVolunteer &&
                            <span>
                                Edit the form below to modify your volunteer.
                            </span>
                        }
                        { !selectedVolunteer &&
                            <span>
                                Fill out the form below to add a new volunteer.
                            </span>
                        }
                    </DialogContentText>
                    <Formik
                        initialValues={defaultValues}
                        onSubmit={(values) => onSubmit(values)}
                        validationSchema={Yup.object().shape(validationSchema)}
                    >
                        {(formikBag) => (
                            <Grid container className={styles.form} spacing={2} justify="center">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="First Name" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.first_name && formikBag.touched.first_name}
                                        disabled={formSubmitting}
                                        {...formikBag.getFieldProps('first_name')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Name" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.last_name && formikBag.touched.last_name}
                                        disabled={formSubmitting}
                                        {...formikBag.getFieldProps('last_name')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email Address" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.email_address && formikBag.touched.email_address}
                                        disabled={formSubmitting}
                                        {...formikBag.getFieldProps('email_address')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Phone Number" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.phone_number && formikBag.touched.phone_number}
                                        disabled={formSubmitting}
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
                                        {...formikBag.getFieldProps('address')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} className={styles.actions}>
                                    <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.submit}>Submit</Button>
                                    {formSubmitting && <CircularProgress size={24} className={styles.buttonProgress} />}
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            <Dialog open={helpDialogOpen} onClose={handleHelpDialogClose} aria-labelledby="help" className={styles.helpDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleHelpDialogClose}><IconClose /></IconButton>
                <DialogTitle>Help</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h4>To delete a volunteer:</h4>
                        <p>Click the trash can icon.</p>
                        <h4>To edit a volunteer's information:</h4>
                        <p>Click the name of the volunteer.</p>
                        <h4>To add a new volunteer:</h4>
                        <p>Click the green plus icon.</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} aria-labelledby="Delete Volunteer" className={styles.deleteDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleDeleteDialogClose}><IconClose /></IconButton>
                <DialogTitle>Delete {selectedVolunteer?.first_name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Are you sure you want to delete {selectedVolunteer?.first_name}?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteVolunteer} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Volunteers</h1>
                    <div className={styles.actionButtons}>
                        <IconButton onClick={handleAddVolunteerDialogOpen} className={styles.addIcon} size="medium">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={handleHelpDialogOpen} className={styles.helpIcon} size="medium">
                            <HelpOutlineIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="list of volunteers">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Last</strong></TableCell>
                                    <TableCell><strong>First</strong></TableCell>
                                    <TableCell><strong>Phone</strong></TableCell>
                                    <Hidden smDown>
                                        <TableCell><strong>Email Address</strong></TableCell>
                                        <TableCell><strong>Address</strong></TableCell>
                                        <TableCell><strong>Role Preference</strong></TableCell>
                                    </Hidden>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            { loadingVolunteers &&
                            <CircularProgress />
                            }
                            { !loadingVolunteers &&
                                <TableBody>
                                {
                                    volunteers.map((v) => 
                                        (
                                            <TableRow key={v.last_name} onClick={() => handleEditVolunteer(v)} hover={true}>
                                                <TableCell component="th" scope="row">{v.last_name}</TableCell>
                                                <TableCell>{v.first_name}</TableCell>
                                                <TableCell>{v.phone_number}</TableCell>
                                                <Hidden smDown>
                                                    <TableCell>{v.email_address}</TableCell>
                                                    <TableCell>{v.address}</TableCell>
                                                    <TableCell>{v.role_preference}</TableCell>
                                                </Hidden>
                                                <TableCell>
                                                    <IconButton className={styles.deleteIcon} onClick={(volunteer) => handleDeleteDialogOpen(volunteer, v)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                }
                            </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default AdminVolunteer