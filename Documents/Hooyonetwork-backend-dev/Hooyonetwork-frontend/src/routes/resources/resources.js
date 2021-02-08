import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../resources/resources.module.scss';
import { Grid, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const config = [
    { title: 'Foster Parent 101', description: 'Resources for new foster parents.', link: 'http://google.com'},
    { title: 'Legal Resources', description: 'Contact information for pro-bono and non-profit attorneys in the Minneapolis area.', link: 'http://google.com'},
    { title: 'Local Resources', description: 'Minneapolis groups dedicated to helping immigrant families and children in times of need.', link: 'http://google.com'},
    { title: 'Assistance Programs', description: 'Resources for applying for various forms of assistance.', link: 'http://google.com'},
    { title: 'After School Activities', description: 'Trustworthy community organizations offering after school activities for K-12 students.', link: 'http://google.com'},
    { title: 'Mentoring and Tutoring', description: 'Reliable and responsible tutors for K-12 & college students. ', link: 'http://google.com'},
]

function Resources() {
    const [open, setDialogOpen] = useState(false);
    const [resources, setResources] = useState([])
    const [selectedResource, setSelectedResource] = useState(null);

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleResourceOpen = (resource) => {
        setSelectedResource(resource);
        setDialogOpen(true);
    }

    // useEffect(() => {
    //     axios.get('api/resources')
    //         .then(resources => {
    //             setResource(resources)
    //         }).catch(() => {
    //             // failure dialog
    //         })
    // })

    return (
        <div className={styles.wrapper}>
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="Description of Resources" className={styles.dialogContent}>
                { selectedResource &&
                    <React.Fragment>
                        <DialogTitle>{selectedResource?.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <h4><Link to={selectedResource?.link}>{selectedResource?.title}</Link></h4>
                                <p>{selectedResource?.description}</p>
                            </DialogContentText>
                        </DialogContent>
                    </React.Fragment>
                }
            </Dialog>
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>Resources you can trust.</h1>
                </Grid>
            </Grid>
                <Grid container className={styles.resource}>
                    { config.map((resource, index) => {
                        return (
                            <Grid item xs={12} lg={4} className={`${styles.firstBkg} ${((index + 1) % 2 === 0) ? styles.even : styles.odd}`}>
                                <div className={styles.overlay}></div>
                                <div className={styles.content}>
                                    <h2>{resource.title}</h2>
                                    <p>{resource.description}</p>
                                    <Button variant="outlined" onClick={() => handleResourceOpen(resource)}>LEARN MORE</Button>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
        </div>
    );
}

export default Resources