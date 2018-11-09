import * as React from 'react';
import styles from './TopicSelectionLabel.module.scss';

const topicSelectionLabel = (props) => {
    return(
        <div className={styles.TopicSelectionLabel}>
            <div className={styles.TopicLabel}>I'm available on:</div>
        </div>
    );
};

export default topicSelectionLabel;