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
import TrainingSelection from './TypeSelectionHolder/TrainingTypeSelection';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IDoctorsAppointmentState {
  firstDayOfWeek: Date;
  lastDayOfWeek: Date;
  trainingType: string;
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
      trainingType: ""
    };
  }

  // tslint:disable-next-line:member-access
  componentDidMount() {
    this.getCurrentWeekData();
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
    let nextWeekLastDate = tempLastDate.getDate()  + 7;

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
    let nextWeekLastDate = tempLastDate.getDate()  - 7;

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
    let selectedKey = item.key as string;
    this.setState({
      trainingType : selectedKey
    });
  }

  public render(): React.ReactElement<IDoctorsAppointmentProps> {
    const trainingModuleRendering : JSX.Element = this.state.trainingType ? <div /> : <TrainingSelection />;

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

    return (
      <div className={styles.doctorsAppointment}>
        <Header />
        <TopicSelection 
          onDropDownChange={this.getTopicSelectionDropDownChangeHandler.bind(this)}
          topicLabel={strings.TopicSelectionHeaderTrainer}
        />
        <DaysOfWeek
          currentWeek={currentWeekStringValue}
          nextButtonClick={this.getNextWeekClickHandler.bind(this)}
          previousButtonClick={this.getPreviousWeekClickHandler.bind(this)}
        />
        {trainingModuleRendering}
        <Footer />
      </div>
    );
  }
}
