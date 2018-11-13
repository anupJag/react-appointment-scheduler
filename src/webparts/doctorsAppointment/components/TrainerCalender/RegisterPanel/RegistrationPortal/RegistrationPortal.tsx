import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './RegistrationPortal.module.scss';

const registrationPortal = (props) => {
    return(
        <div className={styles.RegistrationPortal}>
            <div className={styles.HeaderContainer}>
                <header className={styles.Header}>
                    <div>
                        Session on Power BI
                    </div>
                    <div>
                        Session date: Nov 10, 2018
                    </div>
                </header>
            </div>
            <div className={styles.BodyContainer}>
                <div className={styles.LeftContainer}>
                    Left DIV 50% width
                </div>
                <div className={styles.RightContainer}>
                    Right DIV 50% width
                </div>
            </div>
        </div>
    );
};

export default registrationPortal;