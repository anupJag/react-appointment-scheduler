import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITraineeToolProficency } from '../../ITraineeCalendar';
import styles from './SessionPanel.module.scss';

export interface ISessionPanelProps {
    sessionType: string;
    sessionTitle: string;
    sessionDate: string;
    sessionSlotTiming: string;
    checkBoxProficiency: ITraineeToolProficency[];
    checkBoxProficiencyChange: (ev: React.FormEvent<HTMLElement>, isChecked: boolean, index: number) => void;
}

const sessionPanel = (props: ISessionPanelProps) => {
    return (
        <div className={styles.SessionPanel}>
            <header className={styles.HeaderContainer}>
                <div className={styles.Header}>
                    Thank you! For choosing {props.sessionType} session - {props.sessionTitle} on {props.sessionDate} at {props.sessionSlotTiming}.
                </div>
                <div className={styles.SubHeader}>
                    Inorder to complete your registraion, you are requested to complete the below questionnaire.
                </div>
            </header>
            <div className={styles.BodyContainer}>
                <div>
                    <div>1. Can you briefly describe the {props.sessionType} issue you wish us to help you with?</div>
                    <TextField multiline></TextField>
                </div>
                <div>
                    <div>2. How would you rate your {props.sessionType} proficiency?  (Please check the appropriate answer)</div>
                    <div>
                        {
                            props.checkBoxProficiency.map((el: ITraineeToolProficency) =>
                                <Checkbox
                                    label={el.label}
                                    checked={el.isChecked}
                                    key={el.id}
                                    onChange={props.checkBoxProficiencyChange.bind(this, el.id)}
                                />
                            )
                        }
                    </div>
                </div>
                <div>
                    <div>3. Do you have any intention to share your dashboards with other people?</div>

                </div>
                <div>
                    <div>4. If you are already sharing dashboards, how do you share them:</div>

                </div>
                <div>
                    <div>5. Do you use Power BI for:</div>

                </div>
                <div>
                    <div>6. What type of Data Source are you currently using?</div>

                </div>

            </div>
        </div>
    );
};

export default sessionPanel;