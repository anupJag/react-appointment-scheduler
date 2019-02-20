import * as React from 'react';
import { IconButton, IButtonProps, Button, IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export interface INextProps {
    nextButtonClick: () => void;
}

const nextWeek = (props: INextProps) => {

    const btnStyl: React.CSSProperties = {
        height: "100%",
        width: "100%",
    };

    const btnCoreStyle: IButtonStyles = {
        root: {
            backgroundColor: "transparent"
        },
        rootHovered: {
            backgroundColor: "transparent"
        },
        rootPressed:{
            backgroundColor: "transparent"
        }
    };

    return (
        <Button
            //title="Next Week"
            ariaLabel="Next Week"
            onClick={props.nextButtonClick}
            styles={btnCoreStyle}
        >
            <div style={btnStyl}>
                <img src="https://team.effem.com/sites/MarsISApps/SiteAssets/Images/nxtWeek.png" height="30px" width="auto" />
            </div>
        </Button>
    );
};


export default nextWeek;
