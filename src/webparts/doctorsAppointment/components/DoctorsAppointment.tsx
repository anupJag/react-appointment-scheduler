import * as React from 'react';
import styles from './DoctorsAppointment.module.scss';
import * as strings from 'DoctorsAppointmentWebPartStrings';
import { IDoctorsAppointmentProps } from './IDoctorsAppointmentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import Header from './Header/Header';
import TopicSelection from './TopicSelection/TopicSelection';
import Footer from './Footer/Footer';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import TrainerCalender from './TrainerCalender/TrainerCalender';
import TrainingSelection from './TypeSelectionHolder/TrainingTypeSelection';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import pnp, { Web } from 'sp-pnp-js';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import Aux from './HOC/Auxilliary';
import TraineeCalendar from './TraineeCalendar/TraineeCalendar';

export interface IDoctorsAppointmentState {
  firstDayOfWeek: Date;
  lastDayOfWeek: Date;
  trainingType: IDropdownOption;
  trainingTypes: IDropdownOption[];
  showSpinner: boolean;
}

export default class DoctorsAppointment extends React.Component<IDoctorsAppointmentProps, IDoctorsAppointmentState> {
  private monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private daysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  /**
   *Default Constructor
   */
  constructor(props: IDoctorsAppointmentProps) {
    super(props);
    this.state = {
      firstDayOfWeek: undefined,
      lastDayOfWeek: undefined,
      trainingType: undefined,
      trainingTypes: undefined,
      showSpinner: true
    };
  }

  // tslint:disable-next-line:member-access
  componentDidMount() {
    this.getCurrentWeekData();
    this.getTrainingType().then(() => {
      this.setState({
        showSpinner : false
      });
    });
  }


  protected getTrainingType = async () => {
    let web = new Web(this.props.siteURL);
    let trainingListGUID: string = this.props.trainingSession;

    let trainingTypes: IDropdownOption[] = [];

    if (web && trainingListGUID) {
      const data = await web.lists.getById(trainingListGUID).items.select("Id", "Title").usingCaching({
        expiration: pnp.util.dateAdd(new Date, "minute", 60),
        key: trainingListGUID,
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
            trainingTypes.push({
              key: element["Id"],
              text: element["Title"]
            });
          });
        }
        else {
          //Error occured ... Handle the required error
        }
      }

      this.setState({
        trainingTypes: trainingTypes
      });
    }
  }


  /**
   * Default Current Week Date Builder
   */
  protected getCurrentWeekData = (): void => {
    let currDate: Date = new Date();
    let firstDate = currDate.getDate() - currDate.getDay() + 1;
    let lastDate = firstDate + 4;

    var firstday = new Date(currDate.setDate(firstDate));
    var lastday = new Date(currDate.setDate(lastDate));

    this.setState({
      firstDayOfWeek: firstday,
      lastDayOfWeek: lastday
    });
  }

  /**
   * Next Week Button Click Handler
   */
  protected getNextWeekClickHandler = (): void => {
    const tempStartDate: Date = this.state.firstDayOfWeek;
    const tempLastDate: Date = this.state.lastDayOfWeek;

    let nextWeekFirstDate = tempStartDate.getDate() + 7;
    let nextWeekLastDate = tempLastDate.getDate() + 7;

    var firstday = new Date(tempStartDate.setDate(nextWeekFirstDate));
    var lastday = new Date(tempLastDate.setDate(nextWeekLastDate));

    this.setState({
      firstDayOfWeek: firstday,
      lastDayOfWeek: lastday
    });
  }

  /**
  * Previous Week Button Click Handler
  */
  protected getPreviousWeekClickHandler = (): void => {
    const tempStartDate: Date = this.state.firstDayOfWeek;
    const tempLastDate: Date = this.state.lastDayOfWeek;

    let nextWeekFirstDate = tempStartDate.getDate() - 7;
    let nextWeekLastDate = tempLastDate.getDate() - 7;

    var firstday = new Date(tempStartDate.setDate(nextWeekFirstDate));
    var lastday = new Date(tempLastDate.setDate(nextWeekLastDate));

    this.setState({
      firstDayOfWeek: firstday,
      lastDayOfWeek: lastday
    });
  }

  /**
   * Method which handles change in Training Option Selection
   */
  protected getTopicSelectionDropDownChangeHandler = (item: IDropdownOption) => {
    let selectedKey = item.key;
    let temptrainingTypes : IDropdownOption[] = [...this.state.trainingTypes];

    let conditionCheck = temptrainingTypes.filter(el => el.key === selectedKey);

    if(conditionCheck && conditionCheck.length > 0){
      this.setState({
        trainingType: conditionCheck[0]
      });
    }    
  }

  public render(): React.ReactElement<IDoctorsAppointmentProps> {
    const trainingModuleRendering: JSX.Element = this.state.trainingType ?
      this.props.currentView ? 
      <TrainerCalender
        daysOfWeek={this.daysArray}
        months={this.monthArray}
        trainingType={this.state.trainingType}
        startDate={this.state.firstDayOfWeek}
        endDate={this.state.lastDayOfWeek}
        siteURL={this.props.siteURL}
        trainingSlotsListGUID={this.props.trainingSlots}
        loggedInUser={this.props.loggedInUserName}
        doctorsAppointments={this.props.doctorsAppointments}
      />
      :
      // <TrainerCalender
      //   daysOfWeek={this.daysArray}
      //   months={this.monthArray}
      //   trainingType={this.state.trainingType}
      //   startDate={this.state.firstDayOfWeek}
      //   endDate={this.state.lastDayOfWeek}
      //   siteURL={this.props.siteURL}
      //   trainingSlotsListGUID={this.props.trainingSlots}
      //   loggedInUser={this.props.loggedInUserName}
      //   doctorsAppointments={this.props.doctorsAppointments}
      // />
      <TraineeCalendar 
        daysOfWeek={this.daysArray}
        months={this.monthArray}
        trainingType={this.state.trainingType}
        startDate={this.state.firstDayOfWeek}
        endDate={this.state.lastDayOfWeek}
        siteURL={this.props.siteURL}
        trainingSlotsListGUID={this.props.trainingSlots}
        loggedInUser={this.props.loggedInUserName}
        doctorsAppointments={this.props.doctorsAppointments}
      />
      :
      <TrainingSelection />;

    let currentWeekStringValue: string;

    if (this.state.firstDayOfWeek && this.state.lastDayOfWeek) {
      const tempStartDate: Date = this.state.firstDayOfWeek;
      const tempLastDate: Date = this.state.lastDayOfWeek;

      if (tempStartDate.getMonth() === tempLastDate.getMonth()) {
        currentWeekStringValue =
          `${this.monthArray[tempStartDate.getMonth()]} ${tempStartDate.getDate()} - ${tempLastDate.getDate()}, ${tempStartDate.getFullYear()}`;
      }

      if (tempStartDate.getMonth() !== tempLastDate.getMonth()) {

        if (tempStartDate.getFullYear() === tempLastDate.getFullYear()) {
          currentWeekStringValue =
            `${this.monthArray[tempStartDate.getMonth()]} ${tempStartDate.getDate()} - ${this.monthArray[tempLastDate.getMonth()]} ${tempLastDate.getDate()}, ${tempStartDate.getFullYear()}`;
        }
        else {
          currentWeekStringValue =
            `${this.monthArray[tempStartDate.getMonth()]} ${tempStartDate.getDate()}, ${tempStartDate.getFullYear()} - ${this.monthArray[tempLastDate.getMonth()]} ${tempLastDate.getDate()}, ${tempLastDate.getFullYear()}`;
        }

      }

    }
    else {
      currentWeekStringValue = "";
    }

    const showSpinner: JSX.Element = this.state.showSpinner ? <div style={{ height: "100%", width: "100%", display: "flex"}}><Spinner size={SpinnerSize.large} label="Please wait while finish loading..." style={{ margin: "auto" }} /></div> :
      <Aux className={styles.doctorsAppointment}>
        <Header />
        <TopicSelection
          onDropDownChange={this.getTopicSelectionDropDownChangeHandler.bind(this)}
          topicLabel={strings.TopicSelectionHeaderTrainer}
          topicDropDownOptions={this.state.trainingTypes && this.state.trainingTypes.length > 0 ? this.state.trainingTypes : []}
        />
        <DaysOfWeek
          currentWeek={currentWeekStringValue}
          nextButtonClick={this.getNextWeekClickHandler.bind(this)}
          previousButtonClick={this.getPreviousWeekClickHandler.bind(this)}
        />
        {trainingModuleRendering}
        <Footer />
      </Aux>
      ;

    return (
      <div style={{width: "100%", height: "100vh"} }>
        {showSpinner}
      </div>
    );
  }
}
