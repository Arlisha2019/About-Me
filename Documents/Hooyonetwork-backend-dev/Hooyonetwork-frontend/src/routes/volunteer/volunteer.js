import React, { useState } from 'react';
import styles from '../volunteer/volunteer.module.scss';
import { Grid, Button, Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';
import about1 from '../../assets/img/about1.jpg';
import VolunteerSignup from '../../components/volunteer-signup-modal/volunteer-signup-modal';

function Volunteer() {
    const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);
    
    const handleVolunteerDialogOpen = () => {
        setVolunteerDialogOpen(true);
    }
    
    const handleVolunteerDialogClose = () => {
        setVolunteerDialogOpen(false);
    }

    return (
        <div className={styles.wrapper}>
            <VolunteerSignup open={volunteerDialogOpen} onClose={handleVolunteerDialogClose} />
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>Join the Hooyo's community and help our village grow stronger.</h1>
                </Grid>
                <Grid item xs={12} className={styles.volunteerBlurb}>
                    <h2>Volunteer With Us</h2>
                    <p>With Hooyo's Network, you can make a visible impact in your community in a variety of ways.</p>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" className={styles.volunteerButton} onClick={handleVolunteerDialogOpen}>Volunteer Sign Up</Button>
                </Grid>
            </Grid>
            <div className="containerWrapper">
                <Grid container spacing={2} className={styles.body}>
                    <Grid item xs={12} sm={4}>
                        <Card className={styles.volunteerCard}>
                            <CardActionArea>
                                <CardMedia
                                    className={styles.cardImg}
                                    image={about1}
                                    title="Event Setup and Teardown"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Event Setup and Teardown
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Arrive early to help set up for an event and/or stay late to help dismantle and clean after an event.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={styles.volunteerCard}>
                            <CardActionArea>
                                <CardMedia
                                    className={styles.cardImg}
                                    image={about1}
                                    title="Guest Management"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Guest Management
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Help direct parking, seating, guest check-ins, and etc...
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={styles.volunteerCard}>
                            <CardActionArea>
                                <CardMedia
                                    className={styles.cardImg}
                                    image={about1}
                                    title="General Services"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    General Services
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Don't know what you want to do, just know you want to help.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Volunteer