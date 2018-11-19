import * as React from 'react';
import styles from './TrainingData.module.scss';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface ITrainingDataProps {
    time: string;
    session: string;
    trainer: string;
}

const trainingData = (props: ITrainingDataProps) => {
    return (
        <div className={styles.Info}>
            <div className={styles.InfoHolder}>
                <div style={{ width: "96px" }}>{props.time}</div>
                <div className={styles.SessionCss}>{props.session} Session</div>
            </div>            
                <div>by {props.trainer}</div>
            <ActionButton  
                iconProps={{iconName: "EventDeclined"}}
            >
                De-register
            </ActionButton>
        </div>
    );
    }

export default trainingData;