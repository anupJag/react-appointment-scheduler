import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface ITraineeCalendarProps {
    startDate: Date;
    endDate: Date;
    trainingType: IDropdownOption;
    daysOfWeek: string[];
    months: string[];
    siteURL: string;
    trainingSlotsListGUID: string;
    loggedInUser: string;
    doctorsAppointments: string;
}

export interface ITraineeCalendarState {
    startDate: Date;
    endDate: Date;
    trainingType: IDropdownOption;
    // isRegisterPanelOpen: boolean;
    // registrationDate: string;
    showSpinner: boolean;
    // sessionName: string;
    // sessionDesc: string;
    trainingSlots: ITrainingSlots[];
    // selectedTraininigSlots: string[];
    registeredWeekData: IWeekTrainerData;
    hideConfirmDialog: boolean;
    // deleteRegistration: ITrainerRegisteredDataStructure;
    // showDialogSpinner : boolean;
}

export interface ITraineeData {
    Title: string;
    RegistrationDate: string;
    TrainerRegistrationStatus: string;
    CategoryId: number;
    TrainingInfo: string;
    SlotTimingId: number;
}

export enum TraineeBookingStatusTypes {
    BookedByMe = "BookedByMe",
    Available = "Available",
    NotAvailableForMe = "NotAvailableForMe"
}

export interface ITrainingSlots {
    Id: string;
    Label: string;
    isChecked: boolean;
    isDisabled: boolean;
}

export interface ITraineeRegisteredDataStructure{
    Title: string;
    SlotTiming: string;
    Author: string;
    Id: number;
    RegistrationDate: string;
    Trainee: string;
    SlotAvailable: boolean;
    TraineeBookingStatus : string;
}

export interface IWeekTrainerData{
    Monday: ITraineeRegisteredDataStructure[];
    Tuesday: ITraineeRegisteredDataStructure[];
    Wednesday: ITraineeRegisteredDataStructure[];
    Thursday: ITraineeRegisteredDataStructure[];
    Friday: ITraineeRegisteredDataStructure[];
}