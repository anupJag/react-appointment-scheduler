import * as React from 'react';
import TraineeTrainingDay from './TraineeTrainingDay/TraineeTrainingDay';
import styles from './TraineeCalendar.module.scss';
import { ITrainerCalenderProps, ITrainerCalenderState, ITrainerData, TrainerRegistrationStatus, ITrainingSlots, ITrainerRegisteredDataStructure, IWeekTrainerData } from './ITraineeCalendar';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { escape, findIndex, find, assign } from '@microsoft/sp-lodash-subset';
import pnp, { Web, ItemAddResult } from 'sp-pnp-js';
import TraineeData from '../TraineeCalendar/TraineeTrainingDay/TraineeData/TraineeData'
import trainingDay from '../TrainerCalender/TrainingDay/TrainingDay';

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
        trainingSlots: ITrainingSlots[];
    // selectedTraininigSlots: string[];
    registeredWeekData: IWeekTrainerData;
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
            registeredWeekData: undefined,
            endDate:props.endDate,
            startDate: props.startDate,
            trainingType: props.trainingType,
            trainingSlots: undefined
            
        };
        
    }
    public componentDidMount() {
        this.getTrainingSlots().then(() => {
            this.getTrainerRegisteredData().then(() => console.log('Loading Complete'));
        });
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

    protected getTrainingSlots = async () => {
        let web = new Web(this.props.siteURL);
        let trainingSlotsGUID: string = this.props.trainingSlotsListGUID;
        let trainingSlotsCollection: ITrainingSlots[] = [];

        if (web && trainingSlotsGUID) {
            const data = await web.lists.getById(trainingSlotsGUID).items.select("Id", "Title").usingCaching({
                expiration: pnp.util.dateAdd(new Date, "minute", 60),
                key: trainingSlotsGUID,
                storeName: "local"
            }).configure({
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            }).get().then(p => p).catch((error: any) => error);

            if (data) {
                if (!data.status) {
                    data.forEach(element => {
                        trainingSlotsCollection.push({
                            Id: element["Id"],
                            Label: element["Title"],
                            isChecked: false,
                            isDisabled: false
                        });
                    });
                }
            }

            this.setState({
                trainingSlots: trainingSlotsCollection
            });
        }
    }
    protected getTrainerRegisteredData = async () => {
        this.setState({
            //showSpinner: true
        });
        const slotData: ITrainingSlots[] = [...this.state.trainingSlots];
        const doctorBookingListID = this.props.doctorsAppointments;
        const startDate: Date = new Date(this.state.startDate.toUTCString());
        const trainingType: number = parseInt(this.state.trainingType.key.toString(), 0);
        const daysOfWeek: string[] = [...this.props.daysOfWeek];
        let batch = pnp.sp.createBatch();

        for (let index = 0; index < daysOfWeek.length; index++) {

            pnp.sp.web.lists.getById(doctorBookingListID).items.select("Title", "SlotTiming/Id", "Id", "Author/Title", "TrainerRegistrationStatus", "Category/Id", "RegistrationDate").expand("Author", "SlotTiming", "Category").filter(`TrainerRegistrationStatus eq 'Booked' and Category eq ${trainingType} and RegistrationDate eq '${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + index}T08:00:00Z'`).configure({
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            }).inBatch(batch).get().then((p: any) => {
                let tempData: ITrainerRegisteredDataStructure[] = [];
                let tempRegisteredWeekData: IWeekTrainerData = { ...(this.state.registeredWeekData ? this.state.registeredWeekData : null) };
                if (p && p.length > 0) {
                    p.forEach(element => {
                        let slotTiming = slotData.filter(el => el.Id === element["SlotTiming"]["Id"]);
                        let slotName: string;

                        if (slotTiming && slotTiming.length > 0) {
                            slotName = slotTiming[0]["Label"];
                        }

                        tempData.push({
                            Title: element["Title"],
                            SlotTiming: element["SlotTiming"] ? slotName : null,
                            Author: element["Author"]["Title"],
                            Id: element["Id"],
                            RegistrationDate: element["RegistrationDate"],
                            DeregisterDisabled: !(element["Author"]["Title"] === this.props.loggedInUser)
                        });
                    });
                }

                tempRegisteredWeekData[daysOfWeek[index]] = tempData;

                this.setState({
                    registeredWeekData: tempRegisteredWeekData
                });

            }).catch(error => error);

        }

        await batch.execute().then(d => {
            console.log("Done");
            this.setState({
                //showSpinner: false
            });
        });
    }
    public render() : React.ReactElement<ITraineeCalendarProps>{
        const trainingData: any = this.props.daysOfWeek.map((day: string, index: number) => {
            let temp = new Date(this.state.startDate.toUTCString());
            let tempVar = new Date(this.state.startDate.toUTCString());
            const tempDateParser = new Date(temp.setDate(tempVar.getDate() + index));
            let date: string = `${this.props.months[tempDateParser.getMonth()]} ${tempDateParser.getDate()}, ${tempDateParser.getFullYear()}`;
            temp = tempVar = null;

             let daysData: ITrainerRegisteredDataStructure[] = this.state.registeredWeekData ?
                [...(this.state.registeredWeekData[day] ? this.state.registeredWeekData[day] : [])]
                :
                 [];

             daysData.sort((a: any, b: any) => {
                 var SlotA = a["SlotTiming"].toUpperCase();
                 var SlotB = b["SlotTiming"].toUpperCase();
                 if (SlotA < SlotB) {
                    return -1;
                 }
                 if (SlotA > SlotB) {
                     return 1;
                 }
                 return 0;
             });

            return (
                <TraineeTrainingDay
                    day={day}
                    date={date}
                    key={index}
                    trainingDataInfo={daysData}
                    isRegistrationButtonDisabled={false}
                    // onRegisterButtonClicked={this.onTrainingRegisterClickHandler.bind(this, index)}
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