import * as React from 'react';
import TrainingInfo from './TrainingInfo/TrainingInfo';
import styles from './TraineeTrainingDay.module.scss';

export interface ITraineeTrainingDayProps {
    date: string;
    day: string;
}

const traineeTrainingDay = (props: ITraineeTrainingDayProps) => {
    return (
        <div className={styles.TraineeTrainingDay}>
            <TrainingInfo
                date={props.date}
                day={props.day}
            />
        </div>
    );
}

export default traineeTrainingDay;