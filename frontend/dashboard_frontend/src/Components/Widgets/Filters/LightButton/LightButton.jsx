import React from 'react';
import "../../../../global.scss";

const LightButton = (props)=>{
    return(
        <a href="#" class="button issecondary w-button">{props.text}</a>
    );
}

export default LightButton;