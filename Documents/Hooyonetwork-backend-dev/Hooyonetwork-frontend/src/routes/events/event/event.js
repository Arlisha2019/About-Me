import React, { useState, useEffect } from 'react';
import styles from './event.module.scss';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/status/status-actions';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function Event() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [event, setEvent] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(false);

    useEffect(() => {
        setLoadingEvent(true);
        axios.get(`${process.env.REACT_APP_API}/event/${id}`)
            .then(response => {
                
                setEvent(response.data)
            }).catch(() => {
                dispatch(addAlert({ message: 'Unable to fetch event' }))
            }).finally(() => {
                setLoadingEvent(false);
            })
    }, [dispatch, id]);

    return (
        <div className={styles.wrapper}>
            { loadingEvent && 
                <CircularProgress />
            }
            { !loadingEvent && event &&
                <div>
                    <Grid container>
                        <Grid item xs={12} className={styles.intro}>
                            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                        </Grid>
                    </Grid>
                    <Grid container className={styles.evt}>
                        <Grid item xs={12} className={styles.evtName}>
                            {event.name}
                        </Grid>
                        <Grid item xs={12} className={styles.evtDate}>
                            {moment(event.date).format('MMMM Do YYYY')}
                        </Grid>
                        <Grid item xs={12} className={styles.evtTime}>
                            {moment(event.start_time).format('h:mm A')}-{moment(event.end_time).format('h:mm A')}
                        </Grid>
                        <Grid item xs={12} className={styles.evtImg}>
                            {event.img}
                        </Grid>
                        <Grid item xs={12} className={styles.evtLocation}>
                            {event.location}
                        </Grid>
                        <Grid item xs={12} className={styles.evtDescription}>
                            {event.description}
                        </Grid>
                    </Grid>
                </div>
            }
            { !loadingEvent && !event &&
                <div>No event found</div>
            }
        </div>
    );
}

export default Event