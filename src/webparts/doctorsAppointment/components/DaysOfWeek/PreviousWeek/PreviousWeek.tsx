import * as React from 'react';
import { Button, IButtonProps, IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export interface IPreviousProps {
    previousButtonClick: () => void;
}


const previousWeek = (props : IPreviousProps) => {
    
    const btnStyl : React.CSSProperties = {
        height: "100%",
        width : "100%",
    };

    const btnCoreStyle : IButtonStyles = {
        root : {
            backgroundColor : "transparent"
        },
        rootHovered: {
            backgroundColor: "transparent"
        },
        rootPressed:{
            backgroundColor: "transparent"
        }
    };
    
    return(
        <Button 
            ariaLabel="Previous Week"
            onClick={props.previousButtonClick}
            styles={btnCoreStyle}
        >
        <div style={btnStyl}>
            <img src="https://team.effem.com/sites/MarsISApps/SiteAssets/Images/prevWeek.png" height="30px" width="auto"/>
        </div>
        </Button>
    );
};


export default previousWeek;
