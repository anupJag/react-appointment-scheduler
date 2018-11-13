import * as React from 'react';
import TrainingDay from './TrainingDay/TrainingDay';
import styles from './TrainerCalender.module.scss';
import RegisterPanel from './RegisterPanel/RegisterPanel';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface ITrainerCalenderProps {
    startDate: Date;
    endDate: Date;
    trainingType: string;
    daysOfWeek: string[];
    months: string[];
}

export interface ITrainerCalenderState {
    startDate: Date;
    endDate: Date;
    trainingType: string;
    isRegisterPanelOpen: boolean;
    registrationDate: string;
    showSpinner: boolean;
}

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
            showSpinner: true
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
        
        const showSpinner: JSX.Element = this.state.showSpinner ? <Spinner size={SpinnerSize.large} label="Please wait while we get data.." style={{margin: "auto"}}/> : <div />;

        return (
            <div className={styles.TrainerCalender}>
                {!this.state.showSpinner ? trainingData : null}
                <RegisterPanel
                    isPanelOpen={this.state.isRegisterPanelOpen}
                    registrationDate={this.state.registrationDate}
                    onDismissClick={this.onDismissClickHandler.bind(this)}
                />
                {showSpinner}
            </div>
        );
    }
}