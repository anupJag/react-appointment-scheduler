import * as React from 'react';
import styles from './DoctorsAppointment.module.scss';
import { IDoctorsAppointmentProps } from './IDoctorsAppointmentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export default class DoctorsAppointment extends React.Component<IDoctorsAppointmentProps, {}> {
  public render(): React.ReactElement<IDoctorsAppointmentProps> {
    return (
      <div className={ styles.doctorsAppointment }>
        <CommandBarButton
            data-automation-id="test2"
            disabled={false}
            checked={true}
            iconProps={{ iconName: 'Calendar' }}
            text="Register Availabilties"
            style={{padding : "10px 10px"}}
          />
      </div>
    );
  }
}
