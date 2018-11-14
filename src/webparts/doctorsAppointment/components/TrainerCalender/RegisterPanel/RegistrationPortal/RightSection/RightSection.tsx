import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox, ICheckboxProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import styles from './RightSection.module.scss';

export interface IRightSectionProps {
    timeOfDay: string[];
    onCheckboxChangeEvent: (ev: React.FormEvent<HTMLElement>, isChecked: boolean, index: number) => void;
}

const rightSection = (props: IRightSectionProps) => {
    const checkBoxStyle: ICheckboxStyles = {
        root: {
            margin: "4px 4px"
        },
        text:{
            fontWeight: "bold"
        }
    };

    return (
        <div className={styles.RightSection}>
            <div>
                <Label>Select Session(s) Schedule</Label>
            </div>
            <div className={styles.SessionCheckSection}>
                {
                    props.timeOfDay.map((el: string, index: number) =>
                        <Checkbox
                            label={el}
                            key={index}
                            styles={checkBoxStyle}
                            onChange={props.onCheckboxChangeEvent.bind(this, index)}
                        />
                    )
                }
            </div>
        </div>
    );
};


export default rightSection;