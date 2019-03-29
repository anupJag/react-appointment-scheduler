import * as React from 'react';
import styles from './TraineeData.module.scss';
import { ActionButton, IButtonProps, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { TraineeBookingStatusTypes } from '../../ITraineeCalendar';


export interface ITraineeDataProps {
    time: string;
    session: string;
    trainer: string;
    isLastElement: boolean;
    traineeBookingStatus: string;
    slotAvailable: boolean;
    disablePreviousDayRegDeregBUtton: boolean;
    onDeregisterSlotButtonClicked: () => void;
    onRegisterSlotButtonClicked: () => void;
}

const traineeData = (props: ITraineeDataProps) => {

    const styleToBeApplied: React.CSSProperties = {
        marginBottom: "0"
    };
    //#region CSS Styling
    let styleToApply: string = null;
    let iconButtonStyle: IButtonStyles;

    const isDisabled: boolean = props.traineeBookingStatus === TraineeBookingStatusTypes.NotAvailableForMe || !props.slotAvailable || props.disablePreviousDayRegDeregBUtton;

    if (props.traineeBookingStatus === TraineeBookingStatusTypes.BookedByMe) {
        styleToApply = `${styles.Info} ${styles.BookedSlot}`;
        iconButtonStyle = {
            icon: {
                color: 'white'
            },
            iconHovered: {
                color: 'white'
            }
        };
    }
    else if (props.traineeBookingStatus === TraineeBookingStatusTypes.NotAvailableForMe) {
        styleToApply = `${styles.Info} ${styles.NotBookedForMe}`;
    }
    else {
        if (!props.slotAvailable) {
            styleToApply = `${styles.Info} ${styles.NotBookedForMe}`;
        }
        else {
            styleToApply = `${styles.Info} ${styles.AvailableSlot}`;
        }
    }
    //#endregion

    return (
        <div className={styleToApply} style={props.isLastElement ? styleToBeApplied : null}>
            <div className={styles.InfoHolder}>
                <div>{props.time}</div>
                <div className={styles.SessionCss}>{`${props.session}`}</div>
            </div>
            <div className={styles.DoctorDispNameCss}>{`by ${props.trainer}`}</div>
            {
                props.traineeBookingStatus === TraineeBookingStatusTypes.BookedByMe ?
                    <ActionButton
                        iconProps={{ iconName: "RemoveEvent" }}
                        styles={iconButtonStyle}
                        onClick={props.onDeregisterSlotButtonClicked}
                        disabled={props.disablePreviousDayRegDeregBUtton}
                    >
                    </ActionButton>
                    :

                    !props.slotAvailable ?
                        <ActionButton
                            iconProps={{ iconName: "ProtectRestrict" }}
                            styles={iconButtonStyle}
                            disabled={isDisabled}
                            onClick={props.onRegisterSlotButtonClicked}
                        />
                        :
                        <button 
                            onClick={props.onRegisterSlotButtonClicked}
                            disabled={isDisabled}
                        />

                    // <ActionButton
                    //     iconProps={{ iconName: !props.slotAvailable ? "ProtectRestrict" : null }}
                    //     styles={iconButtonStyle}
                    //     disabled={isDisabled}
                    //     onClick={props.onRegisterSlotButtonClicked}
                    // >
                    // {
                    //     !(!props.slotAvailable) ? 
                    //     <div className={styles.contianer} style={isDisabled ? {backgroundColor : "grey", color : "white"} : null}>
                    //         <div className={styles.innerContainer}>Book</div>
                    //     </div> 
                    //     : 
                    //     null
                    // }
                    // </ActionButton>
            }

        </div>
    );
};

export default traineeData;