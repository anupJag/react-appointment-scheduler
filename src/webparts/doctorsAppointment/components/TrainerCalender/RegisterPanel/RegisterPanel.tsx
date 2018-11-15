import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, } from 'office-ui-fabric-react/lib/Panel';
import RegistrationPortal from './RegistrationPortal/RegistrationPortal';
import { ITrainingSlots } from '../ITrainerCalender';

export interface IRegisterPanelProps {
    isPanelOpen: boolean;
    onDismissClick: () => void;
    registrationDate: string;
    timeOfDay: ITrainingSlots[];
    sessionNameFieldOnBlur: (event: any) => void;
    sessionDescFieldOnBlur: (event: any) => void;
    sessionName: string;
    sessionDate: string;
    onCheckboxChangeEvent: (ev: React.FormEvent<HTMLElement>, isChecked: boolean, index: number) => void;
    primaryButtonText: string;
    onSaveClick: () => void;
}

export default class registerPanel extends React.Component<IRegisterPanelProps, {}>{



    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>
                <PrimaryButton onClick={this.props.onSaveClick} style={{ marginRight: '8px' }}>
                    {this.props.primaryButtonText}
                </PrimaryButton>
                <DefaultButton onClick={this.props.onDismissClick}>Cancel</DefaultButton>
            </div>
        );
    };


    public render(): React.ReactElement<IRegisterPanelProps> {
        
        
        return (
            <div>
                <Panel
                    isOpen={this.props.isPanelOpen}
                    type={PanelType.medium}
                    isFooterAtBottom={true}
                    hasCloseButton={false}
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <RegistrationPortal
                        timeOfDay={this.props.timeOfDay}
                        sessionDescFieldOnBlur={this.props.sessionDescFieldOnBlur.bind(this)}
                        sessionNameFieldOnBlur={this.props.sessionNameFieldOnBlur.bind(this)}
                        sessionDate={this.props.sessionDate}
                        sessionName={this.props.sessionName}
                        onCheckboxChangeEvent={this.props.onCheckboxChangeEvent.bind(this)}
                    />
                </Panel>
            </div>
        );
    }

};

