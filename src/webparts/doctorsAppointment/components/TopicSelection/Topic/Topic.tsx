import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import styles from './Topic.module.scss';

const topic = (props) => {
    const dropDownOption : IDropdownOption[] = [
        {
            key: "tableau",
            text: "Tableau"
        },
        {
            key: "powerbi",
            text: "Power BI"
        }
    ];    
    return (
        <div className={styles.Topic}>
            <div className={styles.TopicContainer}>
                <div className={styles.TopicLabel}>I'm available to provide training session on:</div>
                <Dropdown 
                    options={dropDownOption}
                    ariaLabel={"Select training dropdown session"}
                    placeHolder={"Select a training"}
                    className={styles.TopicDropDown}
                />
            </div>
        </div>
    );
};


export default topic;
