import * as React from 'react';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface INextProps {
    nextButtonClick: () => void;
}

const nextWeek = (props: INextProps) => {
    return (
        <IconButton
            iconProps={
                {
                    iconName: "ChevronRight"
                }
            }
            title="Next Week"
            ariaLabel="Next Week"
            onClick={props.nextButtonClick}
        />
    );
};


export default nextWeek;
