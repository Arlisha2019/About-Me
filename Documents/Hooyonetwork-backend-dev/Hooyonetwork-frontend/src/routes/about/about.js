import React from 'react';
import { Grid } from '@material-ui/core';
import styles from '../about/about.module.scss';
import about1 from '../../assets/img/about1.jpg';
import about2 from '../../assets/img/about2.jpg';
import about3 from '../../assets/img/about3.jpg';

function about() {
    return (
        <div className={styles.wrapper}>
            <Grid container>
                <Grid item xs={12} className={styles.intro}>
                    <h1>Learn more about The Hooyo's Network.</h1>
                </Grid>
            </Grid>
            <div className={`containerWrapper ${styles.contentWrapper}`}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>About Us</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem nisi, 
                            fringilla nec erat eu, laoreet blandit nibh. Nunc posuere mauris ac massa 
                            fringilla pharetra.
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={styles.info}>
                    <Grid item xs={12} lg={7} className={styles.blurb}>
                        <h3>Cindy Cleary</h3>
                        <p>Growing up in the Colorado mountains, Cindy is adventurous and service-minded. 
                            After earning dual degrees in Anthropology and Journalism, she joined the Peace 
                            Corps and served three years working with healthcare and community development 
                            in West Africa.<br></br>
                            She returned to Colorado to earn her MSW and work with youth and adults at the Colorado 
                            Outward Bound School and Colorado State University. She directed wilderness programs for 
                            youth at risk, survivors of violence, addiction recovery and people in transition. She 
                            taught freshman seminars, supervised student assistants, coordinated a university wide 
                            service-learning program and designed and taught a course in Adventure-Based Therapy.<br></br>
                        </p>
                    </Grid>
                    <Grid item xs={12} lg={5} className={styles.photo}>
                        <img src={about1} alt="about1" />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={styles.info}>
                    <Grid item xs={12} lg={7} className={styles.blurb}>
                        <h3>Maggie Wehrmann</h3>
                        <p>After living in the Dominican Republic in 2013 and witnessing the hardships and social 
                            injustices that many impoverished communities face, Maggie pursued a Master's of Social Work. 
                            She graduated from the University of Nebraska-Omaha in 2016 and is a Licensed Clinical Social 
                            Worker and Licensed Addiction Counselor. Maggie began her career at the Catholic Charities' 
                            Omaha Campus for Hope in 2011 and has been working in the addiction/mental health fields since. 
                            A desire to enjoy more time outdoors and take in nature's natural beauty brought her to Colorado 
                            in 2017. Maggie's work experience includes working with addicts and alcoholics, parents and families, 
                            LGBTQ, Spanish speaking individuals, youth offenders, impoverished communities, domestic violence victims, 
                            and those suffering side effects of trauma, depression and anxiety.</p>
                    </Grid>
                    <Grid item xs={12} lg={5} className={styles.photo}>
                        <img src={about2} alt="about2" />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={styles.info}>
                    <Grid item xs={12} lg={7} className={styles.blurb}>
                        <h3>Anna Joseph</h3>
                        <p>Anna is most fulfilled when she is connecting with and helping others, which drove her to get a 
                            dual Master of Social Work and Master of Public Health from the University of Michigan. The thread 
                            throughout Anna’s work is helping people lead their life with meaning, where they feel good about 
                            themselves. Anna's approach to working with clients includes Acceptance and Commitment Therapy (ACT), 
                            Dialectical Behavior Therapy (DBT), Behavioral Activation, and Motivational Interviewing.</p>
                    </Grid>
                    <Grid item xs={12} lg={5} className={styles.photo}>
                        <img src={about3} alt="about3" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default about