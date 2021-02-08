import React, { useEffect, useState } from 'react';
import styles from '../events/events.module.scss';
import { Grid } from '@material-ui/core';
import EventCarousel from '../../components/event-carousel/event-carousel';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/status/status-actions';
import { CircularProgress } from '@material-ui/core';

function Events() {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    console.log(events);
    const [loadingEvents, setLoadingEvents] = useState(false);

    useEffect(() => {
        setLoadingEvents(true);
        axios.get(`${process.env.REACT_APP_API}/event`)
            .then(response => {
                console.log(response.data)
                setEvents(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch events' }))
            }).finally(() => {
                setLoadingEvents(false);
            })
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                </Grid>
            </Grid>
            <h1>Events</h1>
            { loadingEvents && 
                <CircularProgress />
            }
            { !loadingEvents &&
                <EventCarousel events={events} />
            }
        </div>
    );
}

export default Events