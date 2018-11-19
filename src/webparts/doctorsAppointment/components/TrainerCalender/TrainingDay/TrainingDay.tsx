import * as React from 'react';
import TrainingInfo from './TrainingInfo/TrainingInfo';
import styles from './TrainingDay.module.scss';
import TrainingDataInfo from './TrainingDataInfo/TrainingDataInfo';
import { ITrainerRegisteredDataStructure } from '../ITrainerCalender';

export interface ITrainingDay {
    day: string;
    date: string;
    key: any;
    onRegisterButtonClicked: (event, key) => void;
    trainingDataInfo: ITrainerRegisteredDataStructure[];
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
            <TrainingDataInfo 
                trainingDataInfo={props.trainingDataInfo}
            />
        </div>
    );
};

export default trainingDay;