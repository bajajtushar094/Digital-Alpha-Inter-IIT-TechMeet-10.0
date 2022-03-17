import React from 'react';
import "../../../../global.scss";

const LightButton = (props)=>{
    const destination = props.to || "#";
    return(
        <a href={destination} class="button issecondary w-button">{props.text}</a>
    );
}

export default LightButton;