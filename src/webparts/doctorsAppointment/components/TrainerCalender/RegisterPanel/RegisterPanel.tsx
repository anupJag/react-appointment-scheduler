import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, } from 'office-ui-fabric-react/lib/Panel';
import RegistrationPortal from './RegistrationPortal/RegistrationPortal';

export interface IRegisterPanelProps {
    isPanelOpen: boolean;
    onDismissClick: () => void;
    registrationDate: string;
    timeOfDay: string[];
    sessionNameFieldOnBlur: (event: any) => void;
    sessionDescFieldOnBlur: (event: any) => void;
    sessionName: string;
    sessionDate: string;
    onCheckboxChangeEvent: (ev: React.FormEvent<HTMLElement>, isChecked: boolean, index: number) => void;
}


const registerPanel = (props: IRegisterPanelProps) => {
    return (
        <div>
            <Panel
                isOpen={props.isPanelOpen}
                type={PanelType.medium}
                onDismiss={props.onDismissClick}
            >
                <RegistrationPortal
                    timeOfDay={props.timeOfDay}
                    sessionDescFieldOnBlur={props.sessionDescFieldOnBlur.bind(this)}
                    sessionNameFieldOnBlur={props.sessionNameFieldOnBlur.bind(this)}
                    sessionDate={props.sessionDate}
                    sessionName={props.sessionName}
                    onCheckboxChangeEvent={props.onCheckboxChangeEvent.bind(this)}
                />
            </Panel>
        </div>
    );
};

export default registerPanel;
