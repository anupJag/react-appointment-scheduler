import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, } from 'office-ui-fabric-react/lib/Panel';
import RegistrationPortal from './RegistrationPortal/RegistrationPortal';

export interface IRegisterPanelProps {
    isPanelOpen: boolean;
    onDismissClick: () => void;
    registrationDate: string;
}


const registerPanel = (props: IRegisterPanelProps) => {
    return (
        <div>
            <Panel
                isOpen={props.isPanelOpen}
                type={PanelType.medium}
                headerText={"Register your availability"}
                onDismiss={props.onDismissClick}
                
            >
                <RegistrationPortal />
            </Panel>
        </div>
    );
};

export default registerPanel;
