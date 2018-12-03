import * as React from 'react';
import styles from './TraineeData.module.scss';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ITrainerRegisteredDataStructure } from '../../../TrainerCalender/ITrainerCalender';


export interface ITrainingDataProps {
    time: string;
    session: string;
    trainer: string;
    isLastElement: boolean;
    isDeregisterDisabled: boolean;
   // onDeRegistrationButtonClicked:() => void;
}

const trainingData = (props: ITrainingDataProps) => {

    const styleToBeApplied : React.CSSProperties = {
        borderBottom: "none"
    };
    

    const classToBeApplied = props.isDeregisterDisabled ? `${styles.Info} ${styles.OtherUsersDataStyles}` : `${styles.Info} ${styles.CurrLoggedInUserStyles}`;

    return (
        <div className={classToBeApplied} style={props.isLastElement ? styleToBeApplied : null}>
            <div className={styles.InfoHolder}>
                <div>{props.time}</div>
                <div className={styles.SessionCss}>{`${props.session}`}</div>
            </div>
            <div className={styles.DoctorDispNameCss}>{`by ${props.trainer}`}</div>
            {/* <ActionButton
                iconProps={{ iconName: "EventDeclined" }}
                disabled={props.isDeregisterDisabled} 
                onClick={props.onDeRegistrationButtonClicked}
            >
            </ActionButton> */}
        </div>
    );
};

export default trainingData;