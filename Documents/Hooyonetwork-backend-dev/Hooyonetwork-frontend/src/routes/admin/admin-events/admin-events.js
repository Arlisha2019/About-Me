import React, { useState, useEffect } from 'react';
import styles from '../admin-events/admin-events.module.scss';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Hidden, IconButton, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, 
    FormControlLabel, Switch, TextField, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { Close as IconClose } from '@material-ui/icons/';
import AddEvent from '../../../components/admin-components/admin-event-components/add-event-modal/add-event-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/status/status-actions';
import moment from 'moment';

function AdminEvents() {
    const dispatch = useDispatch();
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [helpDialogOpen, setHelpDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [deleteVolunteerDialogOpen, setDeleteVolunteerDialogOpen] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [altStatus, setAltStatus] = useState({
        checkedB: false
    });
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [volunteers, setVolunteers] = useState([]);
    const [loadingVolunteers, setLoadingVolunteers] = useState(false);

    useEffect(() => {
        setLoadingEvents(true);
        setLoadingVolunteers(true);
        axios.get(`${process.env.REACT_APP_API}/event`)
            .then(response => {
                setEvents(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch events' }))
            }).finally(() => {
                setLoadingEvents(false);
            })
        axios.get(`${process.env.REACT_APP_API}/volunteersignup`)
            .then(response => {
                setVolunteers(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch volunteer information' }))
            }).finally(() => {
                setLoadingVolunteers(false);
            })
    }, [dispatch]);

    const defaultValues = {
        zeroHeader: "",
        zeroBody: "",
        altStatus: "",
        altHeader: "",
        altBody: ""
    }

    const validationSchema = {
        zeroHeader: Yup.string().required('Header is required.'),
        zeroBody: Yup.string().required('Body text is required.'),
        altHeader: Yup.string().required('Header is required is required.'),
        altBody: Yup.string().required('Body text is required.')
    }

    const handleAddEventOpen = () => {
        setAddEventOpen(true);
    }
    
    const handleAddEventClose = () => {
        setAddEventOpen(false);
        setSelectedEvent(null);
    }

    const handleSettingsDialogOpen = () => {
        setSettingsDialogOpen(true);
    }

    const handleSettingsDialogClose = () => {
        setSettingsDialogOpen(false);
    }

    const handleHelpDialogOpen = () => {
        setHelpDialogOpen(true);
    }

    const handleHelpDialogClose = () => {
        setHelpDialogOpen(false);
    }

    const handleDeleteDialogOpen = (clickEvent, event) => {
        clickEvent.stopPropagation();
        setDeleteDialogOpen(true);
        setSelectedEvent(event);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedEvent(null);
    }

    const handleDeleteEvent = () => {
        axios.delete(`${process.env.REACT_APP_API}/event/${selectedEvent._id}`)
            .then(() => {
                dispatch(addAlert({ message: 'Event successfully deleted.' }));
                setEvents(events.filter(evt => evt._id !== selectedEvent._id))
                handleDeleteDialogClose();
            })
    }

    const handleDeleteVolunteerDialogOpen = (clickEvent, volunteer) => {
        clickEvent.stopPropagation();
        setDeleteVolunteerDialogOpen(true);
        setSelectedVolunteer(volunteer);
    }

    const handleDeleteVolunteerDialogClose = () => {
        setDeleteVolunteerDialogOpen(false);
        setSelectedVolunteer(null);
    }

    const handleDeleteVolunteer = () => {
        axios.delete(`${process.env.REACT_APP_API}/volunteersignup/${selectedVolunteer._id}`)
            .then(() => {
                dispatch(addAlert({ message: 'Volunteer successfully deleted from this event.' }));
                setVolunteers(volunteers.filter(v => v._id !== selectedVolunteer._id))
                handleDeleteVolunteerDialogClose();
            })
    }

    const onAddEvent = (event) => {
        setEvents([event].concat(events));
        dispatch(addAlert({ message: 'Event successfully created.' }));
    }

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        handleAddEventOpen();
    }

    const onEditEvent = (event) => {
        setEvents(events.map(evt => {
            if (evt._id === event._id) {
                return event
            } else {
                return evt
            }
        }));
        dispatch(addAlert({ message: 'Event successfully updated.' }));
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

    return (
        <div className={styles.wrapper}>
            <AddEvent open={addEventOpen} handleClose={handleAddEventClose} onAddEvent={onAddEvent} selectedEvent={selectedEvent} onEditEvent={onEditEvent} />
            <Dialog open={settingsDialogOpen} onClose={handleSettingsDialogClose} aria-labelledby="Settings" className={styles.settingsDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleSettingsDialogClose}><IconClose /></IconButton>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>In this menu, you can edit two things: what displays if you have no events scheduled (zero state) and the alternate
                            message that replaces the event carousel.</p>
                            <h4>Zero State:</h4>
                            <Formik
                                initialValues={defaultValues}
                                onSubmit={(values) => onSubmit(values)}
                                validationSchema={Yup.object().shape(validationSchema)}
                            >
                            {(formikBag) => (
                                <Grid container className={styles.settingsForm} spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Header" 
                                            variant="outlined"
                                            fullWidth
                                            required
                                            error={formikBag.errors.zeroHeader && formikBag.touched.zeroHeader}
                                            disabled={formSubmitting}
                                            {...formikBag.getFieldProps('zeroHeader')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Body"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={5}
                                            rowsMax={10}
                                            required
                                            error={formikBag.errors.zeroBody && formikBag.touched.zeroBody}
                                            disabled={formSubmitting}
                                            {...formikBag.getFieldProps('zeroBody')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.action}>Submit</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.action}>Clear</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h4>Alternate Announcement:</h4>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={formikBag.values.altStatus}
                                                onChange= {event => { formikBag.setFieldValue('altStatus', event.target.checked) }}
                                                name="checkedB"
                                                color="primary"
                                                required
                                                error={formikBag.errors.altStatus && formikBag.touched.altStatus}
                                                disabled={formSubmitting}
                                                inputProps={{ 'aria-label': 'alternate status on/off switch' }}
                                            />
                                            }
                                            label="ON"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Header" 
                                            variant="outlined"
                                            fullWidth
                                            required
                                            error={formikBag.errors.altHeader && formikBag.touched.altHeader}
                                            disabled={formSubmitting}
                                            {...formikBag.getFieldProps('altHeader')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Body"
                                            variant="outlined"
                                            multiline
                                            rows={5}
                                            rowsMax={10}
                                            fullWidth
                                            required
                                            error={formikBag.errors.altBody && formikBag.touched.altBody}
                                            disabled={formSubmitting}
                                            {...formikBag.getFieldProps('altBody')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.action}>Submit</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.action}>Clear</Button>
                                    </Grid>
                                </Grid>
                            )}
                            </Formik>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog open={helpDialogOpen} onClose={handleHelpDialogClose} aria-labelledby="Help" className={styles.helpDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleHelpDialogClose}><IconClose /></IconButton>
                <DialogTitle>Help</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h4>To delete an event:</h4>
                        <p>Click the trash can icon on the right.</p>
                        <h4>To edit an event:</h4>
                        <p>Click the title of the event.</p>
                        <h4>To add a new event:</h4>
                        <p>Click the green plus icon.</p>
                        <h4>To edit your alternate or zero state message:</h4>
                        <p>Click the gear icon and follow the instructions listed there.</p>
                        <h4>"What do the different icons mean in the Add an Event menu?"</h4>
                        <p>The check mark publishes the event and makes it publicly visible.</p>
                        <p>The eyeball shows a preview of the event card you created.</p>
                        <p>The trash can deletes the post permanently.</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} aria-labelledby="Delete Event" className={styles.deleteDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleDeleteDialogClose}><IconClose /></IconButton>
                <DialogTitle>Delete {selectedEvent?.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Are you sure you want to delete {selectedEvent?.name}?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteEvent} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteVolunteerDialogOpen} onClose={handleDeleteVolunteerDialogClose} aria-labelledby="Delete Volunteer From Event" className={styles.deleteDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleDeleteVolunteerDialogClose}><IconClose /></IconButton>
                <DialogTitle>Remove {selectedVolunteer?.first_name} {selectedVolunteer?.last_name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Are you sure you want to remove {selectedVolunteer?.first_name} {selectedVolunteer?.last_name}?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteVolunteerDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteVolunteer} color="secondary">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xs={12}>
                    <div className={styles.actionButtons}>
                        <IconButton onClick={handleAddEventOpen} className={styles.addIcon} size="small">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={handleSettingsDialogOpen} className={styles.settingsIcon} size="small">
                            <SettingsIcon />
                        </IconButton>
                        <IconButton onClick={handleHelpDialogOpen} className={styles.helpIcon} size="small">
                            <HelpOutlineIcon />
                        </IconButton>
                    </div>
                    <h1>Events</h1>
                </Grid>
            </Grid>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="list of events">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <Hidden smDown>
                                    <TableCell><strong>Start Time</strong></TableCell>
                                    <TableCell><strong>End Time</strong></TableCell>
                                    <TableCell><strong>Location</strong></TableCell>
                                </Hidden>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        { loadingEvents &&
                            <CircularProgress />
                        }
                        { !loadingEvents && 
                            <TableBody>
                                {
                                    events.filter(e => new Date(e.date) >= new Date()).map((e) => 
                                        (
                                            <TableRow key={e._id} onClick={() => handleEditEvent(e)} hover={true}>
                                                <TableCell component="th" scope="row">{e.name}</TableCell>
                                                <TableCell>{moment(e.date).format('ddd M/D/YY')}</TableCell>
                                                <Hidden smDown>
                                                    <TableCell>{moment(e.start_time).format('h:mm A')}</TableCell>
                                                    <TableCell>{moment(e.end_time).format('h:mm A')}</TableCell>
                                                    <TableCell>{e.location}</TableCell>
                                                </Hidden>
                                                <TableCell>
                                                    <IconButton className={styles.deleteIcon} onClick={(evt) => handleDeleteDialogOpen(evt, e)}>
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
            <Grid container className={styles.eventVolunteer}>
                <Grid item xs={12}>
                    <h2>Event Volunteers</h2>
                    { loadingVolunteers &&
                        <CircularProgress />
                    }
                    { !loadingVolunteers && events.filter(e => new Date(e.date) >= new Date()).map(e => 
                        (
                            <Grid container key={e._id}>
                                <Grid item xs={12}>
                                    <h3>{e.name}</h3>
                                </Grid>
                                { volunteers.filter(v => e._id === v.event_id).length === 0 &&
                                    <div className={styles.zeroVolunteers}>
                                        <Grid item xs={12}>
                                            <p>No Volunteers</p>
                                        </Grid>
                                    </div>
                                }
                                { volunteers.filter(v => e._id === v.event_id).length > 0 &&
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="specific event volunteer listing">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><strong>Name</strong></TableCell>
                                                    <TableCell><strong>Role</strong></TableCell>
                                                    <Hidden smDown>
                                                        <TableCell><strong>Email</strong></TableCell>
                                                        <TableCell><strong>Phone Number</strong></TableCell>
                                                    </Hidden>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    volunteers.filter(v => e._id === v.event_id).map((v) => 
                                                        (
                                                            <TableRow key={v._id} hover={true}>
                                                                <TableCell component="th" scope="row">{v.first_name} {v.last_name}</TableCell>
                                                                <TableCell>{v.role_type}</TableCell>
                                                                <Hidden smDown>
                                                                    <TableCell>{v.email_address}</TableCell>
                                                                    <TableCell>{v.phone_number}</TableCell>
                                                                </Hidden>
                                                                <TableCell>
                                                                    <IconButton className={styles.deleteIcon} onClick={(evt) => handleDeleteVolunteerDialogOpen(evt, v)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </Grid>
                        )
                    )}
                    
                </Grid>
            </Grid>
        </div>
    );
}

export default AdminEvents