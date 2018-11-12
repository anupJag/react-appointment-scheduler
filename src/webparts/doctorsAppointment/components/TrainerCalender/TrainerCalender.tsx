import * as React from 'react';
import TrainingDay from './TrainingDay/TrainingDay';
import styles from './TrainerCalender.module.scss';

export interface ITrainerCalenderProps {
    startDate: Date;
    endDate: Date;
    trainingType: string;
    daysOfWeek : string[];
    months: string[];
}

export interface ITrainerCalenderState{
    startDate: Date;
    endDate: Date;
    trainingType: string;
}

export default class TrainerCalender extends React.Component<ITrainerCalenderProps, ITrainerCalenderState>{

    /**
     *Default Constructor
     */
    constructor(props : ITrainerCalenderProps) {
        super(props);
        this.state={
            startDate : props.startDate,
            endDate : props.endDate,
            trainingType: props.trainingType
        };
    }


    public render(): React.ReactElement<{}> {
        return (
            <div className={styles.TrainerCalender}>
                {
                    this.props.daysOfWeek.map((day: string, index: number) => {
                        const temp = this.state.startDate;
                        const tempVar = this.state.startDate
                        const tempDateParser = new Date(temp.setDate(tempVar.getDate() + index));
                        let date : string = `${this.props.months[tempDateParser.getMonth()]} ${tempDateParser.getDate()}, ${tempDateParser.getFullYear()}`;

                        return(
                            <TrainingDay 
                                day={day}
                                date={date}
                            />
                        );
                    })
                }
            </div>
        );
    }
}