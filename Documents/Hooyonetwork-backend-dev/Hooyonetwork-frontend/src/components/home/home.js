import React, { useState, useEffect } from 'react';
import { Grid, Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../home/home.module.scss';
import hero from '../../assets/img/hero.jpg';
import EventCarousel from '../event-carousel/event-carousel';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addAlert } from '../../store/status/status-actions';

function Home () {

    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [snackbar, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setLoadingEvents(true);
        axios.get(`${process.env.REACT_APP_API}/event`)
            .then(response => {
                setEvents(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch events' }))
            }).finally(() => {
                setLoadingEvents(false);
            })
    }, [dispatch]);

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    }
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                className={styles.announcement}
                open={false}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean 
                            placerat urna et tincidunt tempus. Integer nec finibus leo, a feugiat sapien. 
                            Sed dignissim nisi a lacinia ullamcorper. "
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose} className={styles.closeIcon}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
            <div className={styles.wrapper}>
                <img src={hero} className={styles.hero} alt="hero" />
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1>The Hooyo's Network</h1>
                            <p>A village united for the next generation.</p>
                            <Button variant="outlined" href="/resources">RESOURCES</Button>
                        </Grid>
                    </Grid> 
                </div>
                <Grid item xs={12} className={styles.eventContainer}>
                    <h2>Upcoming Events</h2>
                        { loadingEvents && 
                            <CircularProgress />
                        }
                        { !loadingEvents &&
                            <EventCarousel events={events} />
                        } 
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default Home