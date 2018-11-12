import * as React from 'react';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface IPreviousProps {
    previousButtonClick: () => void;
}


const previousWeek = (props : IPreviousProps) => {
    return(
        <IconButton 
            iconProps = {
                {
                    iconName : "ChevronLeft"
                }
            }
            title="Previous Week"
            ariaLabel="Previous Week"
            onClick={props.previousButtonClick}
        />
    );
};


export default previousWeek;
