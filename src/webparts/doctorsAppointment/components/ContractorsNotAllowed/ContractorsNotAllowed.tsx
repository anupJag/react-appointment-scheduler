import * as React from 'react';
import styles from './ContractorsNotAllowed.module.scss';

export default (props) => {
    return(
        <div className={styles.ContractorNotAllowedContainer}>
            <div className={styles.ContractorMessage}>
                <p>As per internal guidance for Yammer only to be made available to Mars associates, unfortunately myAnalytics Doctor sessions also are available for Mars Associates only.</p>
                <p>If you are a contractor and require support on any of our tools, please refer to external platforms i.e. Tableau, Power BI or Alteryx communities for help. Apologies if this causes any inconvenience.</p>
            </div>
        </div>
    );
};