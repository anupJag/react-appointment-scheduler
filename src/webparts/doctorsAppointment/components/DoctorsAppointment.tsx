import * as React from 'react';
import styles from './DoctorsAppointment.module.scss';
import { IDoctorsAppointmentProps } from './IDoctorsAppointmentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import Header from './Header/Header';
import TopicSelection from './TopicSelection/TopicSelection';

export default class DoctorsAppointment extends React.Component<IDoctorsAppointmentProps, {}> {
  public render(): React.ReactElement<IDoctorsAppointmentProps> {
    return (
      <div className={ styles.doctorsAppointment }>
        <Header />
        <TopicSelection />
      </div>
    );
  }
}
