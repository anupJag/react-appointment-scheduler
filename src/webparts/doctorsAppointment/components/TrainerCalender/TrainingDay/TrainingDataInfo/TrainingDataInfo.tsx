import * as React from 'react';
import styles from './TrainingDataInfo.module.scss';
import TrainingData from './TrainingData/TrainingData';
import { ITrainerRegisteredDataStructure } from '../../ITrainerCalender';

export interface ITrainingDataInfoProps {
    trainingDataInfo: ITrainerRegisteredDataStructure[];
}

const trainingDataInfo = (props: ITrainingDataInfoProps) => {
    return (
        <div className={styles.TrainingDataInfo}>
            {
                props.trainingDataInfo && props.trainingDataInfo.length > 0 ? props.trainingDataInfo.map(el =>
                    <TrainingData
                        session={el.Title}
                        time={el.SlotTiming}
                        trainer={el.Author}
                    />
                )
                :
                <div className={styles.NoData}>
                    No Registrations available for this day
                </div>
            }

        </div>
    );
};

export default trainingDataInfo;