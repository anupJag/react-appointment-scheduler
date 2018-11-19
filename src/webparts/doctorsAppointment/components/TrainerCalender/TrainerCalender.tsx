import * as React from 'react';
import TrainingDay from './TrainingDay/TrainingDay';
import styles from './TrainerCalender.module.scss';
import RegisterPanel from './RegisterPanel/RegisterPanel';
import { ITrainerCalenderProps, ITrainerCalenderState, ITrainerData, TrainerRegistrationStatus, ITrainingSlots, ITrainerRegisteredDataStructure, IWeekTrainerData } from './ITrainerCalender';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { escape, findIndex, find, assign } from '@microsoft/sp-lodash-subset';
import pnp, { Web, ItemAddResult } from 'sp-pnp-js';

export default class TrainerCalender extends React.Component<ITrainerCalenderProps, ITrainerCalenderState>{


    /**
     *Default Constructor
     */
    constructor(props: ITrainerCalenderProps) {
        super(props);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,
            trainingType: props.trainingType,
            isRegisterPanelOpen: false,
            registrationDate: "",
            showSpinner: true,
            sessionName: "",
            sessionDesc: "",
            trainingSlots: undefined,
            selectedTraininigSlots: [],
            registeredWeekData: undefined
        };
    }

    public componentDidMount() {
        this.getTrainingSlots().then(() => {
            this.getTrainerRegisteredData().then(() => console.log('Loading Complete'));
        });
    }

    public componentWillReceiveProps(nextProps: ITrainerCalenderProps) {
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
        }, this.getTrainerRegisteredData);
    }

    protected onTrainingRegisterClickHandler = (index: number): void => {
        let currentStartDate: Date = new Date(this.state.startDate.toUTCString());
        const dateToBeRegistered: Date = new Date(currentStartDate.setDate(currentStartDate.getDate() + index));

        this.setState({
            isRegisterPanelOpen: true,
            registrationDate: dateToBeRegistered.toString()
        });
    }

    protected onDismissClickHandler = (): void => {
        this.setState({
            isRegisterPanelOpen: false
        });
    }

    protected getTrainerRegisteredData = async () => {
        this.setState({
            showSpinner: true
        });
        const slotData : ITrainingSlots[] = [...this.state.trainingSlots];
        const doctorBookingListID = "4E8C33B9-BB1B-4EC4-81E0-52C7EEBEB7F4";
        const startDate: Date = new Date(this.state.startDate.toUTCString());
        const trainingType: number = parseInt(this.state.trainingType.key.toString(), 0);
        let batch = pnp.sp.createBatch();

        pnp.sp.web.lists.getById(doctorBookingListID).items.select("Title", "SlotTiming/Id", "Id", "Author/Title", "TrainerRegistrationStatus", "Category/Id", "RegistrationDate").expand("Author", "SlotTiming", "Category").filter(`TrainerRegistrationStatus eq 'Booked' and Category eq ${trainingType} and RegistrationDate eq '${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}T08:00:00Z'`).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then((p: any) => {
            //Monday Data
            let tempMondayData: ITrainerRegisteredDataStructure[] = [];
            let tempRegisteredWeekData: IWeekTrainerData = { ...(this.state.registeredWeekData ? this.state.registeredWeekData : null) }
            if (p && p.length > 0) {
                p.forEach(element => {
                    let slotTiming = slotData.filter(el => el.Id === element["SlotTiming"]["Id"]);
                    let slotName : string;

                    if(slotTiming && slotTiming.length > 0){
                        slotName = slotTiming[0]["Label"];
                    }

                    tempMondayData.push({
                        Title: element["Title"],
                        SlotTiming: element["SlotTiming"] ? slotName : null,
                        Author: element["Author"]["Title"],
                        Id: element["Id"]
                    });
                });
            }

            tempRegisteredWeekData["Monday"] = tempMondayData;

            this.setState({
                registeredWeekData: tempRegisteredWeekData
            });

        }).catch(error => error);

        pnp.sp.web.lists.getById(doctorBookingListID).items.select("Title", "SlotTiming/Id", "Id", "Author/Title", "TrainerRegistrationStatus", "Category/Id", "RegistrationDate").expand("Author", "SlotTiming", "Category").filter(`TrainerRegistrationStatus eq 'Booked' and Category eq ${trainingType} and RegistrationDate eq '${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 1}T08:00:00Z'`).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then((p: any) => {
            //Tuesday Data
            let tempTuesdayData: ITrainerRegisteredDataStructure[] = [];

            let tempRegisteredWeekData: IWeekTrainerData = { ...(this.state.registeredWeekData ? this.state.registeredWeekData : null) }
            if (p && p.length > 0) {
                p.forEach(element => {
                    let slotTiming = slotData.filter(el => el.Id === element["SlotTiming"]["Id"]);
                    let slotName : string = "";

                    if(slotTiming && slotTiming.length > 0){
                        slotName = slotTiming[0]["Label"];
                    }
                    
                    tempTuesdayData.push({
                        Title: element["Title"],
                        SlotTiming: element["SlotTiming"] ? slotName : null,
                        Author: element["Author"]["Title"],
                        Id: element["Id"]
                    });
                });
            }

            tempRegisteredWeekData["Tuesday"] = tempTuesdayData;

            this.setState({
                registeredWeekData: tempRegisteredWeekData
            });

        }).catch(error => error);

        pnp.sp.web.lists.getById(doctorBookingListID).items.select("Title", "SlotTiming/Id", "Id", "Author/Title", "TrainerRegistrationStatus", "Category/Id", "RegistrationDate").expand("Author", "SlotTiming", "Category").filter(`TrainerRegistrationStatus eq 'Booked' and Category eq ${trainingType} and RegistrationDate eq '${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 2}T08:00:00Z'`).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then((p: any) => {
            //Wednesday Data
            let tempWednesdayData: ITrainerRegisteredDataStructure[] = [];
            let tempRegisteredWeekData: IWeekTrainerData = { ...(this.state.registeredWeekData ? this.state.registeredWeekData : null) }
            if (p && p.length > 0) {
                p.forEach(element => {
                    let slotTiming = slotData.filter(el => el.Id === element["SlotTiming"]["Id"]);
                    let slotName : string = "";

                    if(slotTiming && slotTiming.length > 0){
                        slotName = slotTiming[0]["Label"];
                    }

                    tempWednesdayData.push({
                        Title: element["Title"],
                        SlotTiming: element["SlotTiming"] ? slotName : null,
                        Author: element["Author"]["Title"],
                        Id: element["Id"]
                    });
                });
            }

            tempRegisteredWeekData["Wednesday"] = tempWednesdayData;

            this.setState({
                registeredWeekData: tempRegisteredWeekData
            });

        }).catch(error => error);

        pnp.sp.web.lists.getById(doctorBookingListID).items.select("Title", "SlotTiming/Id", "Id", "Author/Title", "TrainerRegistrationStatus", "Category/Id", "RegistrationDate").expand("Author", "SlotTiming", "Category").filter(`TrainerRegistrationStatus eq 'Booked' and Category eq ${trainingType} and RegistrationDate eq '${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 3}T08:00:00Z'`).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then((p: any) => {
            //Thursday Data
            let tempThursdayData: ITrainerRegisteredDataStructure[] = [];
            let tempRegisteredWeekData: IWeekTrainerData = { ...(this.state.registeredWeekData ? this.state.registeredWeekData : null) }
            if (p && p.length > 0) {
                p.forEach(element => {
                    let slotTiming = slotData.filter(el => el.Id === element["SlotTiming"]["Id"]);
                    let slotName : string = "";

                    if(slotTiming && slotTiming.length > 0){
                        slotName = slotTiming[0]["Label"];
                    }

                    tempThursdayData.push({
                        Title: element["Title"],
                        SlotTiming: element["SlotTiming"] ? slotName : null,
                        Author: element["Author"]["Title"],
                        Id: element["Id"]
                    });
                });
            }

            tempRegisteredWeekData["Thursday"] = tempThursdayData;

            this.setState({
                registeredWeekData: tempRegisteredWeekData
            });

        }).catch(error => error);

        pnp.sp.web.lists.getById(doctorBookingListID).items.select("Title", "SlotTiming/Id", "Id", "Author/Title", "TrainerRegistrationStatus", "Category/Id", "RegistrationDate").expand("Author", "SlotTiming", "Category").filter(`TrainerRegistrationStatus eq 'Booked' and Category eq ${trainingType} and RegistrationDate eq '${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 1}T08:00:00Z'`).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then((p: any) => {
            //Friday Data
            let tempFridayData: ITrainerRegisteredDataStructure[] = [];
            let tempRegisteredWeekData: IWeekTrainerData = { ...(this.state.registeredWeekData ? this.state.registeredWeekData : null) }
            if (p && p.length > 0) {
                p.forEach(element => {
                    let slotTiming = slotData.filter(el => el.Id === element["SlotTiming"]["Id"]);
                    let slotName : string = "";

                    if(slotTiming && slotTiming.length > 0){
                        slotName = slotTiming[0]["Label"];
                    }

                    tempFridayData.push({
                        Title: element["Title"],
                        SlotTiming: element["SlotTiming"] ? slotName : null,
                        Author: element["Author"]["Title"],
                        Id: element["Id"]
                    });
                });
            }

            tempRegisteredWeekData["Friday"] = tempFridayData;

            this.setState({
                registeredWeekData: tempRegisteredWeekData
            });

        }).catch(error => error);

        await batch.execute().then(d => {
            console.log("Done");
            this.setState({
                showSpinner: false
            });
        });
    }

    // protected createItemCreationDataStructure = async () => {
    //     alert("entered in main function");
    //     debugger;
    //     let web = new Web(this.props.siteURL);
    //     let doctorBookingListID: string = "4E8C33B9-BB1B-4EC4-81E0-52C7EEBEB7F4";
    //     // add an item to the list
    //     pnp.sp.web.lists.getById(doctorBookingListID).items.add({
    //         Title: "Title added from PNP",
    //         RegistrationDate:"2018-11-14",
    //         TrainerRegistrationStatus:"Booked",
    //         CategoryId:2,
    //         TrainingInfo:"iosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    //         SlotTimingId: 2    
    //     }).then((iar: ItemAddResult) => {
    //         console.log(iar);
    //     });
    // }

    protected reserveTrainerSlots = async (data: ITrainerData[]) => {
        //let web = new Web(this.props.siteURL);
        let doctorBookingListID = "4E8C33B9-BB1B-4EC4-81E0-52C7EEBEB7F4";
        let list = await pnp.sp.web.lists.getById(doctorBookingListID);

        list.getListItemEntityTypeFullName().then(async (entityTypeFullName) => {

            let batch = pnp.sp.createBatch();

            for (let dt = 0; dt < data.length; dt++) {
                list.items.inBatch(batch).add(data[dt], entityTypeFullName).then(b => {
                    console.log(b);
                });
            }

            await batch.execute().then(d => console.log("Done"));
        });
    }

    protected createItemCreationDataStructure = (): ITrainerData[] => {
        let tempSelectedData = [...this.state.selectedTraininigSlots];
        let postBody: ITrainerData[] = [];
        const sessionName = this.state.sessionName;
        const tempSelectedDate: Date = new Date(this.state.registrationDate);
        let registrationDate = `${tempSelectedDate.getFullYear()}-${tempSelectedDate.getMonth() + 1}-${tempSelectedDate.getDate()}`;
        const sessionDesc = this.state.sessionDesc;
        const key = this.state.trainingType.key;
        const trainingTypeAsNumber: number = parseInt(key as string, 0);

        tempSelectedData.forEach((el: string) => {
            postBody.push({
                Title: sessionName,
                TrainingInfo: sessionDesc,
                TrainerRegistrationStatus: TrainerRegistrationStatus.Booked,
                RegistrationDate: registrationDate,
                CategoryId: trainingTypeAsNumber,
                SlotTimingId: parseInt(el as string, 0)
            });
        });

        return postBody;
    }

    protected onSaveClickHandler = (): void => {
        console.log("Data needs to be saved here");
        let data: ITrainerData[] = this.createItemCreationDataStructure();

        this.reserveTrainerSlots(data).then((el) => {
            console.log("Completed");
            this.setState({
                isRegisterPanelOpen: false
            });
        });
    }

    protected sessionNameOnBlurHandler = (event: any): void => {
        let tempSessionName: string = escape(event.target.value);
        this.setState({
            sessionName: tempSessionName
        });
    }

    protected sessionDescOnBlurHandler = (event: any): void => {
        let tempSessionDesc: string = escape(event.target.value);
        this.setState({
            sessionDesc: tempSessionDesc
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
                            isChecked: false
                        });
                    });
                }
            }

            this.setState({
                trainingSlots: trainingSlotsCollection
            });
        }
    }


    protected onSessionScheduleChangeEventHandler = (key: any, ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
        let tempTrainingSlots: ITrainingSlots[] = [...this.state.trainingSlots];
        let tempSelectedTrainingSlots: string[] = [...this.state.selectedTraininigSlots];
        for (let i = 0; i < tempTrainingSlots.length; i++) {
            if (tempTrainingSlots[i]["Id"] === key) {
                tempTrainingSlots[i]["isChecked"] = isChecked;
            }
        }

        if (isChecked === true) {
            let conditionCheck = tempTrainingSlots.filter(el => el.Id === key);
            if (conditionCheck && conditionCheck.length > 0) {
                tempSelectedTrainingSlots.push(conditionCheck[0]["Id"]);
            }
        }
        else {
            tempSelectedTrainingSlots.splice(findIndex(tempSelectedTrainingSlots, el => {
                return el === key;
            }), 1);
        }

        tempSelectedTrainingSlots.sort();

        this.setState({
            trainingSlots: tempTrainingSlots,
            selectedTraininigSlots: tempSelectedTrainingSlots
        });
    }


    public render(): React.ReactElement<ITrainerCalenderProps> {
        const trainingData: any = this.props.daysOfWeek.map((day: string, index: number) => {
            let temp = new Date(this.state.startDate.toUTCString());
            let tempVar = new Date(this.state.startDate.toUTCString());
            const tempDateParser = new Date(temp.setDate(tempVar.getDate() + index));
            let date: string = `${this.props.months[tempDateParser.getMonth()]} ${tempDateParser.getDate()}, ${tempDateParser.getFullYear()}`;
            temp = tempVar = null;

            let daysData : ITrainerRegisteredDataStructure[] = this.state.registeredWeekData ? 
                [...(this.state.registeredWeekData[day] ? this.state.registeredWeekData[day] : [])]
            : 
            [];

            return (
                <TrainingDay
                    day={day}
                    date={date}
                    key={index}
                    onRegisterButtonClicked={this.onTrainingRegisterClickHandler.bind(this, index)}
                    trainingDataInfo={daysData}
                />
            );
        });

        const showSpinner: JSX.Element = this.state.showSpinner ? <Spinner size={SpinnerSize.large} label="Please wait while we get data.." style={{ margin: "auto" }} /> : <div />;
        const tempSelectedDate: Date = new Date(this.state.registrationDate);
        let selectedDate: string = `${this.props.months[tempSelectedDate.getMonth()]} ${tempSelectedDate.getDate()}, ${tempSelectedDate.getFullYear()}`;

        return (
            <div className={styles.TrainerCalender}>
                {!this.state.showSpinner ? trainingData : null}
                <RegisterPanel
                    isPanelOpen={this.state.isRegisterPanelOpen}
                    registrationDate={this.state.registrationDate}
                    onDismissClick={this.onDismissClickHandler.bind(this)}
                    timeOfDay={this.state.trainingSlots}
                    sessionName={this.state.trainingType.text}
                    sessionDate={selectedDate}
                    sessionDescFieldOnBlur={this.sessionDescOnBlurHandler.bind(this)}
                    sessionNameFieldOnBlur={this.sessionNameOnBlurHandler.bind(this)}
                    onCheckboxChangeEvent={this.onSessionScheduleChangeEventHandler.bind(this)}
                    onSaveClick={this.onSaveClickHandler.bind(this)}
                    primaryButtonText={this.state.selectedTraininigSlots && this.state.selectedTraininigSlots.length > 1 ? "Reserve Slots" : "Reserve Slot"}
                />
                {showSpinner}
            </div>
        );
    }
}