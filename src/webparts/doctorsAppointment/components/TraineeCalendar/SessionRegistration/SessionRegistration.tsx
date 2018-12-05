import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import SessionPanel from './SessionPanel/SessionPanel';
import { ITraineeToolProficency } from '../ITraineeCalendar';


export interface ISessionRegistraionProps {
    isPanelOpen: boolean;
    onDismissClick: () => void;
    sessionType: string;
    sessionTitle: string;
    sessionDate: string;
    sessionSlotTiming: string;
    checkBoxProficiency: ITraineeToolProficency[];
    checkBoxProficiencyChange: (ev: React.FormEvent<HTMLElement>, isChecked: boolean, index: number) => void;
}

export interface ISessionRegistraionState {
    showSpinner: boolean;
}

export default class SessionRegistraion extends React.Component<ISessionRegistraionProps, ISessionRegistraionState>{

    /**
     * Default Constructor
     */
    constructor(props: ISessionRegistraionProps) {
        super(props);
        this.state = {
            showSpinner: false
        };

    }

    private _onRenderFooterContent = (): JSX.Element => {

        const showSpinner: JSX.Element = this.state.showSpinner ?
            <Spinner
                size={SpinnerSize.medium}
                style={{ marginLeft: "3%" }}
            />
            :
            null;

        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <PrimaryButton style={{ marginRight: '8px' }} disabled={false}>
                    Book Session
                </PrimaryButton>
                <DefaultButton onClick={this.props.onDismissClick} disabled={false}>Cancel</DefaultButton>
                {showSpinner}
            </div>
        );
    }

    public render(): React.ReactElement<ISessionRegistraionProps> {
        return (
            <div>
                <Panel
                    isOpen={this.props.isPanelOpen}
                    type={PanelType.medium}
                    isFooterAtBottom={true}
                    hasCloseButton={false}
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <SessionPanel 
                        sessionDate={this.props.sessionDate}
                        sessionSlotTiming={this.props.sessionSlotTiming}
                        sessionTitle={this.props.sessionTitle}
                        sessionType={this.props.sessionType}
                        checkBoxProficiency={this.props.checkBoxProficiency}
                        checkBoxProficiencyChange={this.props.checkBoxProficiencyChange.bind(this)}
                    />
                </Panel>
            </div>
        );
    }
}