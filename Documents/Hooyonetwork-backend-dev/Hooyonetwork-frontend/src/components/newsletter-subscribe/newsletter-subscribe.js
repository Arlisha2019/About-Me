import React, { useState } from 'react';
import styles from '../newsletter-subscribe/newsletter-subscribe.module.scss';
import { Grid, Box, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function NewsletterSubscribe() {
  const [formSubmitting, setFormSubmitting] = useState(false);

  const defaultValues = {
    email: ""
  }
   
  const validationSchema = {
    email: Yup.string().required('Email address is required.')
   }

   let baseURL = process.env.REACT_APP_BASEURL;

  const onSubmit = async (values) => {
    setFormSubmitting(true);
    axios.post(baseURL +'contact', values)
        .then(() => {
        }).catch(e => {
            //onFailure
        }).finally(() => {
            setFormSubmitting(false);
        })
    }

    return (
        <div className={styles.wrapper}>
            <Box className={styles.connect}>
              <Grid container justify="center">
                <Formik
                  initialValues={defaultValues}
                  onSubmit={(values) => onSubmit(values)}
                  validationSchema={Yup.object().shape(validationSchema)}
                >
                  {(formikBag) => (
                    <Grid item xs={12}>
                      <h3>We want to connect with you.</h3>
                      <p>Subscribe to our email newsletter to learn about new events and resources.</p>
                      <div className={styles.subscribe}>
                        <TextField
                          label="Email Address" 
                          variant="outlined"
                          required
                          error={formikBag.errors.email && formikBag.touched.email}
                          disabled={formSubmitting}
                          {...formikBag.getFieldProps('email')}
                        />
                        <Button variant="outlined" disabled={formSubmitting} onClick={formikBag.handleSubmit} className={styles.subscribeCTA}>SUBSCRIBE</Button>
                      </div>
                    </Grid>
                  )}
                  </Formik>
              <Grid item xs={12} sm={6}>
              <div className={styles.consent}>
                <p>By submitting this form, you are consenting to receive emails from The Hooyo's Network. You can revoke your consent to receive emails at 
                  any time by using the SafeUnsubscribe® link, found at the bottom of every email. Emails are serviced by MailChimp.</p>
              </div>
              </Grid>
            </Grid>
          </Box>
        </div>
    )
}

export default NewsletterSubscribe 