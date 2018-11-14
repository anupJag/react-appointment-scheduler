import * as React from 'react';
import TrainingDay from './TrainingDay/TrainingDay';
import styles from './TrainerCalender.module.scss';
import RegisterPanel from './RegisterPanel/RegisterPanel';
import { ITrainerCalenderProps, ITrainerCalenderState, ITrainerData, TrainerRegistrationStatus } from './ITrainerCalender';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { escape, findIndex, find, assign } from '@microsoft/sp-lodash-subset';

export default class TrainerCalender extends React.Component<ITrainerCalenderProps, ITrainerCalenderState>{
    private timeOfDay: string[] = ["09:00 - 09:45", "09:45 - 10:30", "10:30 - 11:15", "11:15 - 12:00", "13:00 - 13:45", "13:45 - 14:30", "14:30 - 15:15", "15:15 - 16:00", "16:00 - 16:45", "16:45 - 17:30", "17:30 - 18:15"];
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
            sessionDesc: ""
        };
    }

    public componentWillMount() {
        this.showSpinner();
    }

    public componentWillReceiveProps(nextProps: ITrainerCalenderProps) {
        let currentStartDate = this.state.startDate;
        let currentEndDate = this.state.endDate;

        if (nextProps.startDate != this.props.startDate) {
            currentStartDate = nextProps.startDate;
        }

        if (nextProps.endDate != this.props.endDate) {
            currentEndDate = nextProps.endDate;
        }

        this.setState({
            startDate: currentStartDate,
            endDate: currentEndDate,
            showSpinner: true
        }, this.showSpinner);
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

    protected showSpinner = async () => {
        console.log("Timeout started");

        await setTimeout(() => {
            this.setState({
                showSpinner: false
            });
        }, 1000);

        console.log("Timeout completed");
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

    protected onSessionScheduleChangeEventHandler = (key: any, ev: React.FormEvent<HTMLElement>, isChecked: boolean): void =>{
        console.log(`${this.timeOfDay[key]} selected`);
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
        const tempSelectedDate : Date = new Date(this.state.registrationDate);
        let selectedDate: string = `${this.props.months[tempSelectedDate.getMonth()]} ${tempSelectedDate.getDate()}, ${tempSelectedDate.getFullYear()}`;

        return (
            <div className={styles.TrainerCalender}>
                {!this.state.showSpinner ? trainingData : null}
                <RegisterPanel
                    isPanelOpen={this.state.isRegisterPanelOpen}
                    registrationDate={this.state.registrationDate}
                    onDismissClick={this.onDismissClickHandler.bind(this)}
                    timeOfDay={this.timeOfDay}
                    sessionName={this.state.trainingType}
                    sessionDate={selectedDate}
                    sessionDescFieldOnBlur={this.sessionDescOnBlurHandler.bind(this)}
                    sessionNameFieldOnBlur={this.sessionNameOnBlurHandler.bind(this)}
                    onCheckboxChangeEvent={this.onSessionScheduleChangeEventHandler.bind(this)}
                />
                {showSpinner}
            </div>
        );
    }
}