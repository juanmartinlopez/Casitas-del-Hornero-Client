import { useState } from 'react';
import './SwitchButtonFlex.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/Actions/Actions';
import day from "../../assets/icons/day-color.png";
import night from "../../assets/icons/night-color.png";


const SwitchButtonFlex = () => {
    
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme)
    

    const handleTheme = () => {
        if(theme === 'light'){
            dispatch(changeTheme('dark'))}
        else{
            dispatch(changeTheme('light'))};
        ;
    }

return(
    <div className='caja'>
     
        <label className='switch'>
            <input type='checkbox' className='checkbox' onClick={handleTheme}/>
            <span className='slider'/>
        </label>
    
    </div>
    
)
}

export default SwitchButtonFlex;