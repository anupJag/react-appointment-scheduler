import * as React from 'react';
import styles from './Footer.module.scss';

const footer = (props) => {
    return (
        <footer className={styles.Footer}>
            <span className={styles.FooterText}>
                MARS Inc  |   myAnalytics  |  Doctor's Appointment
            </span>
        </footer>
    );
};

export default footer;