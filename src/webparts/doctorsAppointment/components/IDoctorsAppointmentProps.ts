import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";

export interface IDoctorsAppointmentProps {
  siteURL: string;
  trainingSession: string;
  trainingSlots: string;
  doctorsAppointments: string;
  loggedInUserName: string;
  loggedInUserEmail: string;
  userGroup: IPropertyFieldGroupOrPerson[];
}
