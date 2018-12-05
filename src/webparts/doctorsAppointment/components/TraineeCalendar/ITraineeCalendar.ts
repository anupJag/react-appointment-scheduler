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
    isRegisterPanelOpen: boolean;
    // registrationDate: string;
    showSpinner: boolean;
    // sessionName: string;
    // sessionDesc: string;
    trainingSlots: ITrainingSlots[];
    selectedTraininigSlot: ITraineeRegisteredDataStructure;
    registeredWeekData: IWeekTraineeData;
    hideConfirmDialog: boolean;
    deleteRegistration: ITraineeRegisteredDataStructure;
    showDialogSpinner: boolean;
    powerBIProficiency: ITraineeToolProficency[];
    tableauProficiency: ITraineeToolProficency[];
    traineeShareDashboard : IDropdownOption[];
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

export interface ITraineeToolProficency {
    isChecked: boolean;
    label: string;
    id: number;
}


export interface ITraineeRegisteredDataStructure {
    Title: string;
    SlotTiming: string;
    Author: string;
    Id: number;
    RegistrationDate: string;
    Trainee: string;
    SlotAvailable: boolean;
    TraineeBookingStatus: string;
}

export interface IWeekTraineeData {
    Monday: ITraineeRegisteredDataStructure[];
    Tuesday: ITraineeRegisteredDataStructure[];
    Wednesday: ITraineeRegisteredDataStructure[];
    Thursday: ITraineeRegisteredDataStructure[];
    Friday: ITraineeRegisteredDataStructure[];
}