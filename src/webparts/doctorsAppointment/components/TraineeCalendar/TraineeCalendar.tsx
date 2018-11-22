import * as React from 'react';
import TraineeTrainingDay from './TraineeTrainingDay/TraineeTrainingDay';
import styles from './TraineeCalendar.module.scss';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface ITraineeCalendarProps{
    startDate: Date;
    endDate: Date;
    trainingType: IDropdownOption;
    daysOfWeek: string[];
    months: string[];
    siteURL: string;
    trainingSlotsListGUID : string;
    loggedInUser: string;
    doctorsAppointments: string;
}

export interface ITraineeCalendarState {
    startDate: Date;
    endDate: Date;
    trainingType: IDropdownOption;
    // isRegisterPanelOpen: boolean;
    // registrationDate: string;
    // showSpinner: boolean;
    // sessionName: string;
    // sessionDesc: string;
    // trainingSlots: ITrainingSlots[];
    // selectedTraininigSlots: string[];
    // registeredWeekData: IWeekTrainerData;
    // hideConfirmDialog: boolean;
    // deleteRegistration: ITrainerRegisteredDataStructure;
    // showDialogSpinner : boolean;
}

export default class TraineeCalendar extends React.Component<ITraineeCalendarProps, ITraineeCalendarState>{
    

    /**
     * Default Constructor
     */
    constructor(props: ITraineeCalendarProps) {
        super(props);
        this.state={
            endDate:props.endDate,
            startDate: props.startDate,
            trainingType: props.trainingType
        };
        
    }

    public componentWillReceiveProps(nextProps: ITraineeCalendarProps) {
        let tempStartDate = this.state.startDate;
        let tempEndDate = this.state.endDate;
        let tempTrainingType = this.state.trainingType;

        if (nextProps.startDate != this.props.startDate) {
            tempStartDate = nextProps.startDate;
        }

        if (nextProps.endDate != this.props.endDate) {
            tempEndDate = nextProps.endDate;
        }

        if (nextProps.trainingType != this.props.trainingType) {
            tempTrainingType = nextProps.trainingType;
        }

        this.setState({
            startDate: tempStartDate,
            endDate: tempEndDate,
            trainingType: tempTrainingType
        });
    }


    public render() : React.ReactElement<ITraineeCalendarProps>{
        const trainingData: any = this.props.daysOfWeek.map((day: string, index: number) => {
            let temp = new Date(this.state.startDate.toUTCString());
            let tempVar = new Date(this.state.startDate.toUTCString());
            const tempDateParser = new Date(temp.setDate(tempVar.getDate() + index));
            let date: string = `${this.props.months[tempDateParser.getMonth()]} ${tempDateParser.getDate()}, ${tempDateParser.getFullYear()}`;
            temp = tempVar = null;

            // let daysData: ITrainerRegisteredDataStructure[] = this.state.registeredWeekData ?
            //     [...(this.state.registeredWeekData[day] ? this.state.registeredWeekData[day] : [])]
            //     :
            //     [];

            // daysData.sort((a: any, b: any) => {
            //     var SlotA = a["SlotTiming"].toUpperCase();
            //     var SlotB = b["SlotTiming"].toUpperCase();
            //     if (SlotA < SlotB) {
            //         return -1;
            //     }
            //     if (SlotA > SlotB) {
            //         return 1;
            //     }
            //     return 0;
            // });

            return (
                <TraineeTrainingDay
                    day={day}
                    date={date}
                    key={index}
                    // isRegistrationButtonDisabled={false}
                    // onRegisterButtonClicked={this.onTrainingRegisterClickHandler.bind(this, index)}
                    // trainingDataInfo={daysData}
                    // onDeRegistrationButtonClicked={this.onDeRegistrationButtonClickedHandler.bind(this)}
                />
            );
        });
        return(
            
            <div className={styles.TraineeCalender}>
                {trainingData}
            </div>
        );
    }
}