import * as React from 'react';
import styles from './TrainingData.module.scss';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface ITrainingDataProps {
    time: string;
    session: string;
    trainer: string;
    isLastElement: boolean;
    isDeregisterDisabled: boolean;
}

const trainingData = (props: ITrainingDataProps) => {

    const styleToBeApplied : React.CSSProperties = {
        borderBottom: "none"
    };

    return (
        <div className={styles.Info} style={props.isLastElement ? styleToBeApplied : null}>
            <div className={styles.InfoHolder}>
                <div style={{ width: "96px" }}>{props.time}</div>
                <div className={styles.SessionCss}>{props.session} Session</div>
            </div>
            <div>by {props.trainer}</div>
            <ActionButton
                iconProps={{ iconName: "EventDeclined" }}
                disabled={props.isDeregisterDisabled}
            >
            </ActionButton>
        </div>
    );
};

export default trainingData;