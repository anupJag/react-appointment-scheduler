import * as React from 'react';
import TrainingInfo from './TrainingInfo/TrainingInfo';
import styles from './TraineeTrainingDay.module.scss';
import TraineeData, { ITrainingDataProps } from './TraineeData/TraineeData';
import { ITrainerRegisteredDataStructure } from '../ITraineeCalendar';
import TraineeDataInfo from './TraineeDataInfo/TraineeDataInfo';
import TrainingDataInfo from '../../TrainerCalender/TrainingDay/TrainingDataInfo/TrainingDataInfo';

export interface ITraineeTrainingDayProps {
    date: string;
    day: string;
    key: any;
   // onRegisterButtonClicked: (event, key) => void;
    trainingDataInfo: ITrainerRegisteredDataStructure[];
    isRegistrationButtonDisabled: boolean;
   // onDeRegistrationButtonClicked: (event, key) => void;
}

const traineeTrainingDay = (props: ITraineeTrainingDayProps) => {
    return (
        <div className={styles.TraineeTrainingDay}>
            <TrainingInfo
                date={props.date}
                day={props.day}
            />
            <TraineeDataInfo
                trainingDataInfo={props.trainingDataInfo}
               
            />
        </div>
    );
};

export default traineeTrainingDay;