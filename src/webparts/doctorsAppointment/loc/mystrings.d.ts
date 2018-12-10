declare interface IDoctorsAppointmentWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  TopicSelectionHeaderTrainer : string;
  TopicSelectionHeaderTrainee : string;

  TopicSelectionLabelTrainer : string;
  TopicSelectionLabelTrainee : string;

  Error400: string;
  Error401: string;
}

declare module 'DoctorsAppointmentWebPartStrings' {
  const strings: IDoctorsAppointmentWebPartStrings;
  export = strings;
}
