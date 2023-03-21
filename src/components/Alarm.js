import React from 'react';
import { AlarmWrap, TimeWrap, Time, TimeZone, AlarmSwitch } from '../styles/styledComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Alarm = ({ index, time_zone, hour, minute, on_off, data, setData }) => {
    const onChange = async (event) => {
        const checked = event.nativeEvent.value;
        const id = event._dispatchInstances._debugOwner.memoizedProps.id;
        const copy = data.map((e, index) => (
            index === id ? {...e, 'on_off': checked} : e
        ));

        try {
            const storageData = JSON.parse(await AsyncStorage.getItem('textData'));
            const newData = copy;
            await AsyncStorage.setItem("textData", JSON.stringify(newData));
            setData(newData);
        } catch (error) {
            console.log('알람 스위치 추가부분 에러', error);
        }
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
