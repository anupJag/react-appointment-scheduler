import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface ITrainerCalenderProps {
    startDate: Date;
    endDate: Date;
    trainingType: IDropdownOption;
    daysOfWeek: string[];
    months: string[];
    siteURL: string;
    trainingSlotsListGUID : string;
}

export interface ITrainerCalenderState {
    startDate: Date;
    endDate: Date;
    trainingType: IDropdownOption;
    isRegisterPanelOpen: boolean;
    registrationDate: string;
    showSpinner: boolean;
    sessionName: string;
    sessionDesc: string;
    trainingSlots: ITrainingSlots[];
    selectedTraininigSlots: string[];
}

export interface ITrainerData {
    Title: string;
    RegistrationDate: string;
    TrainerRegistrationStatus: string;
    CategoryId: number;
    TrainingInfo: string;
    SlotTimingId: number;
}

export enum TrainerRegistrationStatus {
    Booked = "Booked",
    Cancelled = "Cancelled"
}

export interface ITrainingSlots {
    Id: string;
    Label: string;
    isChecked: boolean;
}