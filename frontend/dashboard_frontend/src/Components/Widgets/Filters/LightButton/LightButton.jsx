import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshSelectedCompanies } from '../../../../actions/action';
import "../../../../global.scss";

const LightButton = (props)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const destination = props.to || "#";
    const handleClick = () => {
        const response = refreshSelectedCompanies(dispatch);
        dispatch({type:"DISABLE_VISUALIZE"});
        navigate(props.to)
    }
    return(
        <a href="#" onClick={handleClick} class="button issecondary w-button">{props.text}</a>
    );
}

export default LightButton;