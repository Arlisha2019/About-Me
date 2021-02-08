import React, { useState, useEffect } from 'react';
import styles from '../add-event-modal/add-event-modal.module.scss';
import { Grid, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton,
    Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Close as IconClose } from '@material-ui/icons/';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import DraftsIcon from '@material-ui/icons/Drafts';
import ShareIcon from '@material-ui/icons/Share';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../../store/status/status-actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function AddEvent(props) {

    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [cropper, setCropper] = useState(null);
    const [cropped, setCropped] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        date: null,
        start_time: null,
        end_time: null,
        location: "",
        description: "",
        event_photo: null
    });

    useEffect(() => {
        if (props.selectedEvent) {
            setDefaultValues({
                name: props.selectedEvent.name,
                date: props.selectedEvent.date,
                start_time: props.selectedEvent.start_time,
                end_time: props.selectedEvent.end_time,
                location: props.selectedEvent.location,
                description: props.selectedEvent.description,
                event_photo: props.selectedEvent.event_photo
            })
        } else {
            setDefaultValues({
                name: "",
                date: null,
                start_time: null,
                end_time: null,
                location: "",
                description: "",
                event_photo: null
            })
        }
    }, [props.selectedEvent]);

    const validationSchema = {
        name: Yup.string().required('First name is required.'),
        date: Yup.string().required('Last name is required.'),
        start_time: Yup.string().required('Email address is required.'),
        end_time: Yup.string().required('Phone number is required.'),
        location: Yup.string().required('Address is required.'),
        description: Yup.string().required('Address is required.')
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        const formData = new FormData();
        formData.append('name', values.name)
        formData.append('date', values.date)
        formData.append('start_time', values.start_time)
        formData.append('end_time', values.end_time)
        formData.append('location', values.location)
        formData.append('description', values.description)
        formData.append('event_photo', values.event_photo)
        if (props.selectedEvent) {
            axios.put(`${process.env.REACT_APP_API}/event/${props.selectedEvent._id}`, formData, { headers: {
                'Content-Type': 'multipart/form-data'
              }})
                .then(response => {
                    props.onEditEvent(response.data);
                    props.handleClose();
                }).catch(e => {
                    dispatch(addAlert({ message: 'Unable to edit event.' }));
                }).finally(() => {
                    setFormSubmitting(false);
                })
        } else {
            axios.post(`${process.env.REACT_APP_API}/event`, formData, { headers: {
                'Content-Type': 'multipart/form-data'
              }})
                .then(response => {
                    props.onAddEvent(response.data);
                    props.handleClose();
                }).catch(e => {
                    dispatch(addAlert({ message: 'Unable to create event.' }));
                }).finally(() => {
                    setFormSubmitting(false);
                })
        }
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="add a new event" className={styles.wrapper} fullScreen={fullScreen}>
            <IconButton className={styles.closeDialog} onClick={() => { setCropped(false); props.handleClose() }}><IconClose /></IconButton>
            <DialogTitle>
                { props.selectedEvent ? 'Edit' : 'Add' } Event
            </DialogTitle>
            <DialogContent>
                    <DialogContentText>
                        { props.selectedEvent &&
                            <span>
                                Edit the form below to modify your event.
                            </span>
                        }
                        { !props.selectedEvent &&
                            <span>
                                Fill out the form below to add a new event.
                            </span>
                        }
                    </DialogContentText>
                    <Formik
                        initialValues={defaultValues}
                        onSubmit={(values) => onSubmit(values)}
                        validationSchema={Yup.object().shape(validationSchema)}
                    >
                        {(formikBag) => (
                            <React.Fragment>
                                { !previewMode &&
                                    <Grid container className={styles.form} spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title" 
                                                variant="outlined"
                                                fullWidth
                                                required
                                                error={formikBag.errors.name && formikBag.touched.name}
                                                disabled={formSubmitting}
                                                {...formikBag.getFieldProps('name')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    required
                                                    error={formikBag.errors.date && formikBag.touched.date}
                                                    disabled={formSubmitting}
                                                    label="Date"
                                                    variant="outlined"
                                                    format="MM/dd/yyyy"
                                                    value={formikBag.values.date}
                                                    onChange={value => { formikBag.setFieldValue('date', value) }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Start Time"
                                                    value={formikBag.values.start_time}
                                                    onChange={value => { formikBag.setFieldValue('start_time', value) }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change start time',
                                                    }}
                                                    required
                                                    error={formikBag.errors.start_time && formikBag.touched.start_time}
                                                    disabled={formSubmitting}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="End Time"
                                                    value={formikBag.values.end_time}
                                                    onChange={value => { formikBag.setFieldValue('end_time', value) }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change end time',
                                                    }}
                                                    required
                                                    error={formikBag.errors.end_time && formikBag.touched.end_time}
                                                    disabled={formSubmitting}
                                                />
                                            </MuiPickersUtilsProvider>    
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Location" 
                                                variant="outlined"
                                                fullWidth
                                                required
                                                error={formikBag.errors.location && formikBag.touched.location}
                                                disabled={formSubmitting}
                                                {...formikBag.getFieldProps('location')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description" 
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={10}
                                                rowsMax={10}
                                                required
                                                error={formikBag.errors.description && formikBag.touched.description}
                                                disabled={formSubmitting}
                                                {...formikBag.getFieldProps('description')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="event-image" className={styles.upload}>
                                                <div>Upload Image</div> { formikBag.values?.event_photo?.name }
                                            </label>
                                            <input
                                                hidden
                                                accept="image/jpeg,image/png"
                                                id="event-image"
                                                name="event-image"
                                                type="file"
                                                className={styles.imgUploader}
                                                onChange={(event) => {
                                                    formikBag.setFieldValue('event_photo', event.target.files[0]);
                                                    setCropped(false);
                                                }}
                                            />
                                            { cropped &&
                                                <img src={URL.createObjectURL(formikBag.values.event_photo)} className={styles.croppedImg} alt="cropped"/>
                                            }
                                            { formikBag.values.event_photo instanceof Blob  && !cropped &&
                                                <div className={styles.cropper}>
                                                    <Cropper
                                                        src={URL.createObjectURL(formikBag.values.event_photo)}
                                                        style={{height: 400, width: '100%'}}
                                                        initialAspectRatio={16 / 9}
                                                        guides={false}
                                                        onInitialized={cropper => setCropper(cropper)}
                                                    />
                                                    <IconButton aria-label="submit" onClick={() => {
                                                        cropper.getCroppedCanvas().toBlob(blob => {
                                                            blob.lastModifiedDate = new Date();
                                                            formikBag.setFieldValue('event_photo', new File([blob], formikBag.values.event_photo.name))
                                                            setCropped(true);
                                                        });
                                                        }} className={styles.iconButton}>
                                                        <CheckIcon />
                                                    </IconButton>
                                                </div>
                                            }
                                        </Grid>
                                    </Grid>
                                }
                                { previewMode &&
                                    <Card className={styles.card}>
                                        <CardHeader
                                            title={formikBag.values.title}
                                            subheader={
                                                `${formikBag.values.date ? formikBag.values.date : ''} 
                                                ${formikBag.values.start_time ? formikBag.values.start_time : ''} - 
                                                ${formikBag.values.end_time ? formikBag.values.end_time : ''}`
                                            }
                                        />
                                        { <img src={URL.createObjectURL(formikBag.values.img)} className={styles.media} alt="" /> }
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {formikBag.values.location}<br />
                                                {formikBag.values.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="RSVP to this event">
                                                <DraftsIcon />
                                            </IconButton>
                                            <IconButton aria-label="Volunteer for this event">
                                                <PersonAddIcon />
                                            </IconButton>
                                            <IconButton aria-label="Share this event">
                                                <ShareIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                }
                                <Grid container className={styles.form} spacing={2}>
                                    <Grid item xs={6}>
                                        <IconButton aria-label="submit" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.iconButton}>
                                            <CheckIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton aria-label="preview" disabled={formSubmitting} onClick={() => setPreviewMode(!previewMode)} className={styles.iconButton}>
                                            { previewMode && 
                                                <CreateIcon />
                                            }
                                            { !previewMode &&
                                                <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Formik>
            </DialogContent>
        </Dialog>
    );
}

export default AddEvent