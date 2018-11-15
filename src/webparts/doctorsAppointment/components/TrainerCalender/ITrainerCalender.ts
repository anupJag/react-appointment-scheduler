export interface ITrainerCalenderProps {
    startDate: Date;
    endDate: Date;
    trainingType: string;
    daysOfWeek: string[];
    months: string[];
    siteURL: string;
    trainingSlotsListGUID : string;
}

export interface ITrainerCalenderState {
    startDate: Date;
    endDate: Date;
    trainingType: string;
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
    Slot: string;
    SlotTiming: string;
    TrainingInfo: string;
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