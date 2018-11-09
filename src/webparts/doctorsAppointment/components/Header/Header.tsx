import * as React from 'react';
import styles from './Header.module.scss';

const header = (props) => {
    return(
        <header className={styles.Header}>
            <div className={styles.LeftLogo}></div>
            <div className={styles.RightLogo}></div>
        </header>
    );
};

export default header;
