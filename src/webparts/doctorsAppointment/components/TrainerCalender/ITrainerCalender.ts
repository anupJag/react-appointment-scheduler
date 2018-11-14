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
    sessionName: string;
    sessionDesc: string;
}

export interface ITrainerData {
    Title: string;
    RegistrationDate: string;
    TrainerRegistrationStatus: string;
    Slot: string;
    SlotTiming: string;
    TrainingInfo: string;
}

export enum TrainerRegistrationStatus{
    Booked = "Booked",
    Cancelled = "Cancelled"
}