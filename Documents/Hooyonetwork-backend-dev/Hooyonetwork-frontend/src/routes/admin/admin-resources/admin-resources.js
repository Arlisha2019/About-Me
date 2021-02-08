import React, { useState, useEffect } from 'react';
import styles from '../admin-resources/admin-resources.module.scss';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, IconButton, Dialog, DialogContent, DialogContentText, 
    DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Button, 
    Hidden, DialogActions, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Close as IconClose } from '@material-ui/icons/';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/status/status-actions';

const config = [
    {
        category: "Foster Care",
        title: "National Foster Parent Association",
        link: "http://www.https://nfpaonline.org/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a porta orci. Nam eget odio et ex tempor elementum. Suspendisse vehicula et tortor in vestibulum. Sed pulvinar massa id mauris."
    },
    {
        category: "Foster Care",
        title: "Twin Cities Foster Support Group",
        link: "https://www.mnadopt.org/fostering-network/foster-care-process/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a porta orci. Nam eget odio et ex tempor elementum. Suspendisse vehicula et tortor in vestibulum. Sed pulvinar massa id mauris."
    },
    {
        category: "Health and Wellbeing",
        title: "Kid's Mental Health Activities",
        link: "http://www.socialworkerstoolbox.com/feeling-good-promoting-childrens-mental-health-activity-sheets-for-children/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a porta orci. Nam eget odio et ex tempor elementum. Suspendisse vehicula et tortor in vestibulum. Sed pulvinar massa id mauris."
    },
    {
        category: "Local Resources",
        title: "Free Grocery Delivery",
        link: "https://www.goodhousekeeping.com/food-products/g28039081/best-grocery-delivery-services/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a porta orci. Nam eget odio et ex tempor elementum. Suspendisse vehicula et tortor in vestibulum. Sed pulvinar massa id mauris."
    },
    {
        category: "Other",
        title: "Misc Resource",
        link: "http://www.google.com/",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a porta orci. Nam eget odio et ex tempor elementum. Suspendisse vehicula et tortor in vestibulum. Sed pulvinar massa id mauris."
    }
]

function AdminResources() {
    const dispatch = useDispatch();
    const [addResourceDialogOpen, setAddResourceDialogOpen] = useState(false);
    const [helpDialogOpen, setHelpDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [resources, setResources] = useState([]);
    const [loadingResources, setLoadingResources] = useState(false);

    useEffect(() => {
        setLoadingResources(true);
        axios.get(`${process.env.REACT_APP_API}/resources`)
            .then(response => {
                setResources(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch resources.' }))
            }).finally(() => {
                setLoadingResources(false);
            })
    }, [dispatch]);


    const defaultValues = {
        category: [],
        title: "",
        link: "",
        description: ""
    }

    const resourceCategory = [
        {value: 'foster parent resources', label: 'Foster Care'},
        {value: 'health and wellbeing', label: 'Health and Wellbeing'},
        {value: 'local resources', label: 'Local Resources'},
        {value: 'other', label: 'Other Resources'}
    ]

    const validationSchema = {
        category: Yup.string().required('Category is required.'),
        title: Yup.string().required('Title is required.'),
        link: Yup.string().required('Link is required.'),
        description: Yup.string().required('Description is required.')
    }

    const handleEditResource = (resource) => {
        setSelectedResource(resource);
        handleAddResourceDialogOpen();
    }

    const onEditResource = (resource) => {
        setResources(resources.map(r => {
            if (r.title === resource.title) {
                return resource
            } else {
                return r
            }
        }));
        dispatch(addAlert({ message: 'Resource successfully updated.' }));
    }

    const handleAddResourceDialogOpen = () => {
        setAddResourceDialogOpen(true);
    }
    
    const handleAddResourceDialogClose = () => {
        setAddResourceDialogOpen(false);
    }

    const onAddResource = (resource) => {
        setResources([resource].concat(resources));
        dispatch(addAlert({ message: 'Resource successfully created.' }));
    }

    const handleHelpDialogOpen = () => {
        setHelpDialogOpen(true);
    }

    const handleHelpDialogClose = () => {
        setHelpDialogOpen(false);
    }

    const handleDeleteDialogOpen = (clickEvent, r) => {
        clickEvent.stopPropagation();
        setDeleteDialogOpen(true);
        setSelectedResource(r);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedResource(null);
    }

    const handleDeleteResource = () => {
        axios.delete(`${process.env.REACT_APP_API}/event/${selectedResource.title}`)
            .then(() => {
                dispatch(addAlert({ message: 'Resource successfully deleted.' }));
                setResources(resources.filter(r => resources.title !== selectedResource.title))
                handleDeleteDialogClose();
            })
    }

    const onSubmit = async (values) => {
        setFormSubmitting(true);
        if (selectedResource) {
            axios.put(`${process.env.REACT_APP_API}/resource/${selectedResource._id}`, values)
                .then(response => {
                    onEditResource(response.data);
                    handleAddResourceDialogClose();
                }).catch(e => {
                    dispatch(addAlert({ message: 'Unable to edit resource.' }));
                }).finally(() => {
                    setFormSubmitting(false);
                })
        } else {
            axios.post(`${process.env.REACT_APP_API}/resource`, values)
                .then(response => {
                    onAddResource(response.data);
                    handleAddResourceDialogClose();
                }).catch(e => {
                    dispatch(addAlert({ message: 'Unable to create resource.' }));
                }).finally(() => {
                    setFormSubmitting(false);
                })
        }
    }

    return (
        <div className={styles.wrapper}>
            <Dialog open={addResourceDialogOpen} onClose={handleAddResourceDialogClose} aria-labelledby="add resource" className={styles.addResourceDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleAddResourceDialogClose}><IconClose /></IconButton>
                <DialogTitle>
                    { selectedResource ? 'Edit' : 'Add' } Resource
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    { selectedResource &&
                            <span>
                                Edit the form below to modify your resource.
                            </span>
                        }
                        { !selectedResource &&
                            <span>
                                Fill out the form below to add a new resource.
                            </span>
                        }
                    </DialogContentText>
                    <Formik
                        initialValues={defaultValues}
                        onSubmit={(values) => onSubmit(values)}
                        validationSchema={Yup.object().shape(validationSchema)}
                    >
                        {(formikBag) => (
                            <Grid container className={styles.form} spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={formikBag.values.category}
                                            label="Resource Category"
                                            onChange={(event) => {
                                                formikBag.setFieldValue('category', event.target.value)
                                            }}
                                            disabled={formSubmitting}
                                            required
                                            fullWidth
                                            error={formikBag.errors.category && formikBag.touched.category}
                                            {...formikBag.getFieldProps('category')}
                                        >
                                            {resourceCategory.map((resourceCategory, index) => (
                                                <MenuItem key={`${resourceCategory.value}-${index}`} value={resourceCategory.value}>
                                                    {resourceCategory.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Title" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.title && formikBag.touched.title}
                                        disabled={formSubmitting}
                                        {...formikBag.getFieldProps('title')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Link" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.link && formikBag.touched.link}
                                        disabled={formSubmitting}
                                        {...formikBag.getFieldProps('link')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={5}
                                        rowsMax={10}
                                        label="Description" 
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={formikBag.errors.description && formikBag.touched.description}
                                        disabled={formSubmitting}
                                        {...formikBag.getFieldProps('description')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.submit}>Submit</Button>
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
                        <h4>To delete a resource:</h4>
                        <p>Click the trash can icon.</p>
                        <h4>To edit a resource:</h4>
                        <p>Click the name of the resource.</p>
                        <h4>To add a new resource:</h4>
                        <p>Click the green plus icon.</p>
                        <h4>"What does category mean?"</h4>
                        <p>There are a fixed number of categories that your resources can be posted under. Each category has its own menu of 
                            links and brief descriptions. The current categories include: Foster Care, Health and Wellbeing, Local Resources, and Other.</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} aria-labelledby="Delete Resource" className={styles.deleteDialogContent}>
                <IconButton className={styles.closeDialogIcon} onClick={handleDeleteDialogClose}><IconClose /></IconButton>
                <DialogTitle>Delete {selectedResource?.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Are you sure you want to delete {selectedResource?.name}?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteResource} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xs={12}>
                    <div className={styles.actionButtons}>
                        <IconButton onClick={handleAddResourceDialogOpen} className={styles.addIcon} size="small">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={handleHelpDialogOpen} className={styles.helpIcon} size="small">
                            <HelpOutlineIcon />
                        </IconButton>                             
                    </div>
                    <h1>Resources</h1>
                </Grid>
            </Grid>
            <Grid container component={Paper}>
                <TableContainer>
                    <Table size="small" aria-label="list of resources">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Category</strong></TableCell>
                                <TableCell><strong>Title</strong></TableCell>
                                <Hidden smDown>
                                    <TableCell><strong>Link</strong></TableCell>
                                </Hidden>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        { loadingResources &&
                            <CircularProgress />
                        }
                        { !loadingResources &&
                            <TableBody>
                            {
                                config.map((r) => 
                                    (
                                        <TableRow key={r.title} hover={true} onClick={() => handleEditResource(r)}>
                                            <TableCell component="th" scope="row">{r.category}</TableCell>
                                            <TableCell>{r.title}</TableCell>
                                            <Hidden smDown>
                                                <TableCell>{r.link}</TableCell>
                                            </Hidden>
                                            <TableCell>
                                                <IconButton>
                                                        <DeleteIcon onClick={(r) => handleDeleteDialogOpen(r)} />
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
        </div>
    );
}

export default AdminResources