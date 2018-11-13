import * as React from 'react';
import styles from './TrainingInfo.module.scss';
import { CommandBarButton, IButtonProps, IButtonStyles  } from 'office-ui-fabric-react/lib/Button';

export interface ITrainingInfoProps {
    day: string;
    date: string;
    onRegisterButtonClicked:() => void;
}

const trainingInfo = (props: ITrainingInfoProps) => {
    const registerButtonStyle : IButtonStyles = {
        label: {
            fontWeight : "bold",
        },
        root: {
            padding : "10px"
        }
    };
    
    return (
        <div className={styles.TrainingInfo}>
            <div className={styles.Info}>
                <div style={{ width: "96px" }}>{props.day}</div>
                <div className={styles.Date}>{props.date}</div>
            </div>
            <div>
                <CommandBarButton
                    ariaLabel="Register Availability"
                    title="Register Availabilty"
                    iconProps={{iconName: "Calendar"}}
                    text="Register Availability"
                    styles={registerButtonStyle}
                    onClick={props.onRegisterButtonClicked}
                />
            </div>
        </div>
    );
};

export default trainingInfo;