import * as React from 'react';
import TrainingInfo from './TrainingInfo/TrainingInfo';
import styles from './TrainingDay.module.scss';

export interface ITrainingDay {
    day: string;
    date: string;
    key: any;
    onRegisterButtonClicked: (event, key) => void;
}

const trainingDay = (props: ITrainingDay) => {
    return (
        <div className={styles.TrainingDay}
            key={props.key}>
            <TrainingInfo
                date={props.date}
                day={props.day}
                onRegisterButtonClicked={props.onRegisterButtonClicked.bind(this, props.key)}
            />
            <div>Training Data</div>
        </div>
    );
};

export default trainingDay;