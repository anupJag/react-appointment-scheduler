import * as React from 'react';
import TrainingDay from './TrainingDay/TrainingDay';
import styles from './TrainerCalender.module.scss';
import RegisterPanel from './RegisterPanel/RegisterPanel';
import { ITrainerCalenderProps, ITrainerCalenderState, ITrainerData, TrainerRegistrationStatus, ITrainingSlots } from './ITrainerCalender';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { escape, findIndex, find, assign } from '@microsoft/sp-lodash-subset';
import pnp, { Web } from 'sp-pnp-js';

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
            selectedTraininigSlots: []
        };
    }

    public componentDidMount() {
        this.getTrainingSlots().then(() => {
            this.setState({
                showSpinner: false
            });
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
            showSpinner: true,
            trainingType: tempTrainingType
        });
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

    protected createItemCreationDataStructure = () => {
        
    }

    protected onSaveClickHandler = (): void => {
        console.log("Data needs to be saved here");
        this.setState({
            isRegisterPanelOpen: false
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
                        })
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

            return (
                <TrainingDay
                    day={day}
                    date={date}
                    key={index}
                    onRegisterButtonClicked={this.onTrainingRegisterClickHandler.bind(this, index)}
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
                    sessionName={this.state.trainingType}
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