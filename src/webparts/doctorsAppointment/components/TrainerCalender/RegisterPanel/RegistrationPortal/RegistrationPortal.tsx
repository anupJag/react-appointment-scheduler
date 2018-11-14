import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './RegistrationPortal.module.scss';
import LeftSection from './LeftSection/LeftSection';
import RightSection from './RightSection/RightSection';


export interface IRegistrationPortalProps {
    timeOfDay: string[];
    sessionName: string;
    sessionDate: string;
    sessionNameFieldOnBlur: (event: any) => void;
    sessionDescFieldOnBlur: (event: any) => void;
    onCheckboxChangeEvent: (ev: React.FormEvent<HTMLElement>, isChecked: boolean, index: number) => void;
}

const registrationPortal = (props: IRegistrationPortalProps) => {
    return (
        <div className={styles.RegistrationPortal}>
            <div className={styles.HeaderContainer}>
                <header className={styles.Header}>
                    <div>
                        Session on {props.sessionName}
                    </div>
                    <div>
                        Session date: {props.sessionDate}
                    </div>
                </header>
            </div>
            <div className={styles.BodyContainer}>
                <div className={styles.LeftContainer}>
                    <LeftSection 
                        sessionNameFieldOnBlur={props.sessionNameFieldOnBlur.bind(this)}
                        sessionDescFieldOnBlur={props.sessionDescFieldOnBlur.bind(this)}
                    />
                </div>
                <div className={styles.RightContainer}>
                    <RightSection
                        timeOfDay={props.timeOfDay}
                        onCheckboxChangeEvent={props.onCheckboxChangeEvent.bind(this)}
                    />
                </div>
            </div>
        </div>
    );
};

export default registrationPortal;