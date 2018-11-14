import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './LeftSection.module.scss';

export interface ILeftSectionProps {
    sessionNameFieldOnBlur: (event: any) => void;
    sessionDescFieldOnBlur: (event: any) => void;
}

const leftSection = (props: ILeftSectionProps) => {
    return (
        <div className={styles.LeftSection}>
            <div>
                <TextField
                    label={"Session Name"}
                    ariaLabel={"Session Name"}
                    required={true}
                    onBlur={props.sessionNameFieldOnBlur}
                />
            </div>
            <div>
                <TextField
                    label={"Session Information"}
                    ariaLabel={"Session Name"}
                    multiline={true}
                    rows={4}
                    required={true}
                    onBlur={props.sessionDescFieldOnBlur}
                />
            </div>
        </div>
    );
};

export default leftSection;