import * as React from 'react';
import Topic from './Topic/Topic';
import TopicLabel from './TopicSelectionLabel/TopicSelectionLabel';
import styles from './TopicSelection.module.scss';

const topicSelection = (props) => {
    return(
        <div className={styles.Topic}>
            <Topic />
            <TopicLabel />
        </div>
    );
};

export default topicSelection;


