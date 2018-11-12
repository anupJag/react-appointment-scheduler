import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import styles from './Topic.module.scss';

export interface ITopicProps {
    onDropDownChange: (item: IDropdownOption) => void;
    topicLabel: string;
}

const topic = (props: ITopicProps) => {
    const dropDownOption: IDropdownOption[] = [
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
                <div className={styles.TopicLabel}>{props.topicLabel}</div>
                <Dropdown
                    options={dropDownOption}
                    ariaLabel={"Select training dropdown session"}
                    placeHolder={"Select a training"}
                    className={styles.TopicDropDown}
                    onChanged={props.onDropDownChange}
                />
            </div>
        </div>
    );
};


export default topic;
