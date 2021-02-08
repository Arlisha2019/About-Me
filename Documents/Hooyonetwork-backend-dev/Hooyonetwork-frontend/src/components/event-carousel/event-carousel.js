import React, { useState } from 'react';
import styles from '../event-carousel/event-carousel.module.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton, Menu, MenuItem, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraftsIcon from '@material-ui/icons/Drafts';
import ShareIcon from '@material-ui/icons/Share';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EventSignup from '../event-signup/event-signup';
import VolunteerSignup from '../volunteer-signup-modal/volunteer-signup-modal';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, FacebookMessengerIcon, FacebookMessengerShareButton, 
    TwitterIcon, TwitterShareButton } from 'react-share';
import { Link } from 'react-router-dom';
import moment from 'moment';

const zeroStateHeader = 'No Events Scheduled'
const zeroStateBody = 'There are currently no events scheduled. Follow us on Facebook, Instagram, and check back.'

function EventCarousel (props) {

    const [open, setOpen] = useState(false);
    const [volSignupOpen, setVolSignupOpen] = useState(false);
    const [shareEl, setShareEl] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleShareClick = (event, id) => {
        setShareEl(event.currentTarget);
        setSelectedEvent(id);
    };

    const handleShareClose = () => {
        setShareEl(null);
        setSelectedEvent(null);
    };

    const handleDialogOpen = (id) => {
        setOpen(true);
        setSelectedEvent(id);
    }

    const handleDialogClose = () => {
        setOpen(false);
        setSelectedEvent(false);
    }

    const handleVolSignupOpen = (id) => {
        setVolSignupOpen(true);
        setSelectedEvent(id);
    }

    const handleVolSignupClose = () => {
        setVolSignupOpen(false);
        setSelectedEvent(false);
    }

    return (
        <div className={styles.wrapper}>
            <EventSignup open={open} handleClose={handleDialogClose} eventId={selectedEvent}/>
            <VolunteerSignup open={volSignupOpen} onClose={handleVolSignupClose} eventId={selectedEvent}/>
            <Menu
                id="simple-menu"
                anchorEl={shareEl}
                keepMounted
                open={Boolean(shareEl)}
                onClose={handleShareClose}
                classes={{
                    list: styles.shareList
                }}
            >
                <MenuItem><FacebookShareButton url={`${window.location.hostname}/events/${selectedEvent}`}><FacebookIcon size={30} round={true} /></FacebookShareButton></MenuItem>
                <MenuItem><FacebookMessengerShareButton url={`${window.location.hostname}/events/${selectedEvent}`}><FacebookMessengerIcon size={30} round={true} /></FacebookMessengerShareButton></MenuItem>
                <MenuItem><TwitterShareButton url={`${window.location.hostname}/events/${selectedEvent}`}><TwitterIcon size={30} round={true} /></TwitterShareButton></MenuItem>
                <MenuItem><EmailShareButton url={`${window.location.hostname}/events/${selectedEvent}`}><EmailIcon size={30} round={true} /></EmailShareButton></MenuItem>
            </Menu>
            { props.events.length === 0 &&
                <Grid container>
                    <Grid item xs={12}>
                        <h2>{zeroStateHeader}</h2>
                        <p>{zeroStateBody}</p>
                    </Grid>
                </Grid>
            }
            { props.events.length > 0 &&
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={props.events.length}
                    className={styles.carousel}
                >
                    <div className={styles.controls}>
                        <ButtonBack className={styles.buttonBack}><ChevronLeftIcon fontSize="large"/></ButtonBack>
                        <ButtonNext className={styles.buttonNext}><ChevronRightIcon fontSize="large"/></ButtonNext>
                    </div>
                    <Slider>
                        {
                            props.events.filter(e => new Date(e.date) >= new Date()).map((slide, index) => 
                                (
                                <Slide index={index} key={slide.name}>
                                    <Card className={styles.card}>
                                        <Link to={`/events/${slide._id}`}>
                                            <CardHeader
                                                title={slide.name}
                                                subheader={`${moment(slide.date).format('MMMM Do YYYY')} ${moment(slide.start_time).format('h:mm A')} - ${moment(slide.end_time).format('h:mm A')}`}
                                            />
                                            <CardMedia 
                                                image={slide.img}
                                                className={styles.media}
                                            />
                                        </Link>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {slide.location}<br />
                                                {slide.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing className={styles.menu}>
                                            <IconButton onClick={() => handleDialogOpen(slide._id)} aria-label="RSVP to this event">
                                                <DraftsIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleVolSignupOpen(slide._id)} aria-label="Volunteer for this event">
                                                <PersonAddIcon />
                                            </IconButton>
                                            <IconButton aria-controls="simple menu" aria-haspopup="true" aria-label="Share this event" onClick={(event) => handleShareClick(event, slide._id)}>
                                                <ShareIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Slide>
                                )
                            )
                        }
                    </Slider>
                </CarouselProvider>
            }
        </div>
    );
}

export default EventCarousel