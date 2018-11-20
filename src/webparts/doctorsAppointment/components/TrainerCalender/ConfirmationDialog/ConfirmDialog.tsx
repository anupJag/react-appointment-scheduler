import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IConfirmDialogProps {
    hideDialog: boolean;
    date: string;
    time: string;
    _yesDialog: () => void;
    _closeDialog: () => void;
}

const confirmDialog = (props : IConfirmDialogProps) => {
    return (
        <Dialog
            hidden={props.hideDialog}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: 'Confirm De-registration',
                subText: `Click Yes to confirm slot de-registration for ${props.date} on ${props.time}`
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={props._yesDialog} text="Yes" />
                <DefaultButton onClick={props._closeDialog} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};

export default confirmDialog;