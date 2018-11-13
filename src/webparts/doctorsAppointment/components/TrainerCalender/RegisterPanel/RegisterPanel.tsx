import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

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
                type={PanelType.large}
                headerText={"Register your availability"}
                onDismiss={props.onDismissClick}
            >
                <div>
                    Registration For {props.registrationDate}
                </div>
            </Panel>
        </div>
    );
};

export default registerPanel;
