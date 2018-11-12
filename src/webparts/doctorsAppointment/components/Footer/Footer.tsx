import * as React from 'react';
import styles from './Footer.module.scss';
const footer = (props) => {
    return(
        <footer className={styles.Footer}>
            <span className={styles.FooterText}>
                 &copy; 2018 Mars, Incorporated and its Affiliates. All Rights Reserved
            </span>
        </footer>
    );
};

export default footer;