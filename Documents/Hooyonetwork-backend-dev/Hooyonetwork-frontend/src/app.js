import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { loginSuccess } from './store/user/user-actions';
import styles from './app.module.scss';
import { Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';
import PrivateRoute from './components/protected-route/protected-route';
import { Grid, Hidden, Box, IconButton, Drawer, Snackbar, Button, 
  Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from './assets/img/hooyoslogo.jpg';
import Home from './components/home/home';
import About from './routes/about/about';
import Contact from './routes/contact/contact';
import Resources from './routes/resources/resources';
import Admin from './routes/admin/admin';
import AdminLogin from './routes/admin/login/admin-login';
import Events from './routes/events/events';
import NewsletterSubscribe from './components/newsletter-subscribe/newsletter-subscribe';
import Donate from './routes/donate/donate';
import Volunteer from './routes/volunteer/volunteer';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from './store/status/status-actions';
import Event from './routes/events/event/event';
import { logout } from './store/user/user-actions';
import PageNotFound from './routes/pageNotFound/pageNotFound';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const alerts = useSelector((state) => state.status.alerts);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [appInitializing, setAppInitializing] = useState(true);
  const authed = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    const expiration = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    if (expiration && moment().isBefore(expiration)) {
      dispatch(loginSuccess(username));
    }
    setAppInitializing(false);
  }, [dispatch])

  const handleInfoDialogOpen = () => {
    setInfoDialogOpen(true);
  }

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  }

  const handleLogout = () => {
    dispatch(logout());
    history.push('/admin/login');
  }

  return (
    <React.Fragment>
      { !appInitializing &&
        <React.Fragment>
          <Dialog open={infoDialogOpen} onClose={handleInfoDialogClose} aria-labelledby="501(c)3 Information and Privacy Policy" className={styles.infoDialogContent}>
            <IconButton className={styles.closeDialogIcon} onClick={handleInfoDialogClose}><CloseIcon /></IconButton>
            <DialogTitle>501(c)3 Information & Privacy Policy</DialogTitle>
            <DialogContent>
              <h3>501(c)3 Information</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare vestibulum neque ut blandit. 
                In hac habitasse platea dictumst. Integer ut hendrerit lacus, blandit maximus ante. Etiam dignissim 
                pellentesque ex eget dapibus. Suspendisse varius nisi in lorem hendrerit egestas. Nunc pellentesque et 
                purus ac euismod. Ut egestas diam ac elit tincidunt sodales. Maecenas hendrerit dolor eget est semper 
                vulputate. In posuere venenatis nulla, et venenatis augue.</p>
              <h3>Privacy Policy</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare vestibulum neque ut blandit. 
                In hac habitasse platea dictumst. Integer ut hendrerit lacus, blandit maximus ante. Etiam dignissim 
                pellentesque ex eget dapibus. Suspendisse varius nisi in lorem hendrerit egestas. Nunc pellentesque et 
                purus ac euismod. Ut egestas diam ac elit tincidunt sodales. Maecenas hendrerit dolor eget est semper 
                vulputate. In posuere venenatis nulla, et venenatis augue.</p>
            </DialogContent>
          </Dialog>
          <div className={styles.app}>
        { alerts.map(alert => {
          return (
            <Snackbar
              key={alert.id}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open
              autoHideDuration={3000}
              onClose={() => dispatch(removeAlert(alert.id))}
              message={alert.message}
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={() => dispatch(removeAlert(alert.id))}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          )
        })}
        <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)} classes={{ paper: styles.menuContent }}>
          <Grid container>
            <Grid item xs={12}>
              <Box textAlign="right">
                <IconButton aria-label="close side menu" onClick={() => setMenuOpen(false)} className={styles.menuCloseBtn}>
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>
              <Box textAlign="center" pt={3}>
                <nav>
                  <ul>
                    <li><Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link></li>
                    <li><Link to="/volunteer" onClick={() => setMenuOpen(false)}>Volunteer</Link></li>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/resources" onClick={() => setMenuOpen(false)}>Resources</Link></li>
                    <li><Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
                    <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                  </ul>
                </nav>
              </Box>
            </Grid>
          </Grid>
        </Drawer>
        <header className={styles.header}>
          <Grid container>
            <Grid item>
              <Link to="/">
                <img src={logo} alt="Hooyos Network logo" className={styles.logo} />
              </Link>
              { !location.pathname.includes('admin') &&
                <Hidden lgUp>
                  <IconButton aria-label="menu" className={styles.menuIcon} onClick={() => setMenuOpen(true)} data-testid="hamburger">
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Hidden>
              }
              { location.pathname.includes('admin') && !location.pathname.includes('login') &&
                <IconButton aria-label="menu" className={styles.logoutIcon} onClick={() => handleLogout()} data-testid="hamburger">
                  <ExitToAppIcon fontSize="large" />
                </IconButton>
              }
              <Hidden mdDown>
                <div className={styles.secondaryHeader}>
                  <Grid container className={styles.secondaryHeaderContent}>
                    <Grid item>
                      <nav>
                        <li><Link to="/donate">Donate</Link></li>
                        <li><Link to="/volunteer">Volunteer</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                      </nav>
                    </Grid>
                  </Grid>
                </div>
              </Hidden>
            </Grid>
          </Grid>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              exact
              path="/about"
              render={(props) => (
                <About {...props} />
              )}
            />
            <Route
              exact
              path="/contact"
              render={(props) => (
                <Contact {...props} />
              )}
            />
            <Route
              exact
              path="/resources"
              render={(props) => (
                <Resources {...props} />
              )}
            />
            <Route
              exact
              path="/donate"
              render={(props) => (
                <Donate {...props} />
              )}
            />
            <Route
              exact
              path="/volunteer"
              render={(props) => (
                <Volunteer {...props} />
              )}
            />
            <Route
              exact
              path="/admin/login"
              render={(props) => (
                <AdminLogin {...props} />
              )}
            />
            <PrivateRoute
              path="/admin"
              authed={authed}
              component={Admin}
            />
            <Route
              exact
              path="/events"
              render={(props) => (
                <Events {...props} />
              )}
            />
            <Route
              exact
              path="/events/:id"
              render={(props) => (
                <Event {...props} />
              )}
            />
            <Route 
              component={PageNotFound}
            />
          </Switch>
        </main>
        <footer className={styles.footer}>
          <Switch>
            <Route 
              render={({ location }) => location.pathname.includes('/admin')
                  ? null
                  : <NewsletterSubscribe />
              }
            />
          </Switch>
          <Box className={styles.footerContent}>
            <Grid container>
              <Grid item xs={12}>
                <Box className={styles.social}>
                  <Grid item xs={12}>
                      <Link to="mailto:hooyosnetwork@gmail.com"><MailIcon /></Link>
                      <Link to="tel:540-352-6053"><CallIcon /></Link>
                      <Link to="https://www.facebook.com/groups/176628839625703/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></Link>
                      <Link to="https://www.instagram.com/hooyosnetwork/" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Link to="/donate">Donate</Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/volunteer">Volunteer</Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/resources">Resources</Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/events">Events</Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/about">About</Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/contact">Contact Us</Link>
              </Grid>
              <Grid item xs={12}>
                <span onClick={handleInfoDialogOpen}>501(c)3 Declaration & Legal Terms&nbsp;&nbsp;|&nbsp;&nbsp;</span><span className={styles.adminLink}><a href="/admin/login">Admin</a></span>
              </Grid>
            </Grid>
          </Box>
        </footer>
      </div>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default App;
