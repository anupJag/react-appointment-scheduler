import * as React from 'react';
import TrainingInfo from './TrainingInfo/TrainingInfo';
import styles from './TrainingDay.module.scss';

export interface ITrainingDay {
    day: string;
    date: string;
}

const trainingDay = (props: ITrainingDay) => {
    return (
        <div className={styles.TrainingDay}>
            <TrainingInfo
                date={props.date}
                day={props.day}
            />
            <div>Training Data</div>
        </div>
    );
};

export default trainingDay;