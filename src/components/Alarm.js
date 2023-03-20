import React from 'react';
import { AlarmWrap, TimeWrap, Time, TimeZone, AlarmSwitch } from '../styles/styledComponents';

const Alarm = ({ index, time_zone, hour, minute, on_off, data, setData }) => {
    const onChange = (event) => {
        const checked = event.nativeEvent.value;
        const id = event._dispatchInstances._debugOwner.memoizedProps.id;
        const copy = data.map((e, index) => (
            index === id ? {...e, 'on_off': checked} : e
        ));
        setData(copy);
    }
    // console.log(data);
    
    return (
        <>
            <AlarmWrap>
                <TimeWrap>
                    <TimeZone color={on_off ? 'white' : null}>{time_zone}</TimeZone>
                    <Time color={on_off ? 'white' : null}>{hour}:{minute}</Time>
                </TimeWrap>
                <AlarmSwitch id={index} value={on_off} onChange={onChange} />
            </AlarmWrap>

        </>
    );
};



export default Alarm;
