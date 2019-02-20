import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './LeftSection.module.scss';

export interface ILeftSectionProps {
    sessionNameFieldOnBlur: (event: any) => void;
    //sessionDescFieldOnBlur: (event: any) => void;
    isSessionNameDisabled: boolean;
    //isSessionDescDisabled: boolean;
    defaultValueForSessionName : string;
}

const leftSection = (props: ILeftSectionProps) => {
    return (
        <div className={styles.LeftSection}>
            <div className={styles.TextFieldSection}>
                <TextField
                    label={"Session Name"}
                    ariaLabel={"Session Name"}
                    required={true}
                    disabled={props.isSessionNameDisabled}
                    onBlur={props.sessionNameFieldOnBlur}
                    defaultValue={props.defaultValueForSessionName}
                />
            </div>
            {/* <div className={styles.TextMultiLineFieldSection}>
                <TextField
                    label={"Session Information"}
                    ariaLabel={"Session Name"}
                    multiline={true}
                    rows={4}
                    required={true}
                    disabled={props.isSessionDescDisabled}
                    onBlur={props.sessionDescFieldOnBlur}
                />
            </div> */}
        </div>
    );
};

export default leftSection;