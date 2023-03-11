import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { Container, AddBtnWrap, AddBtn, AddBtnText } from '../styles/styledComponents';
import Alarm from '../components/Alarm';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const MainScreen = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const initialData = [
          {count: 3, on_off: true, repeat: false, sentence: "안녕하세요", sound: "alarm_bell", time: "8:30", "time_zone": "오전", volume:5},
          {count: 3, on_off: true, repeat: false, sentence: "안녕하세요", sound: "alarm_bell", time: "9:24", "time_zone": "오전", volume:10},
          {count: 3, on_off: false, repeat: false, sentence: "안녕하세요", sound: "alarm_bell", time: "10:26", "time_zone": "오전", volume:5},
        ]
    
        setData(initialData);
    
      }, []);
    
    return (
        <Container>
            {data.length ? 
                data.map((e, index) => (
                <Alarm key={index}  index={index} time_zone={e.time_zone} time={e.time} on_off={e.on_off} data={data} setData={setData} />
                )) : null
            }
            <AddBtnWrap>
                <AddBtn onPress={() => {}}>
                    <AddBtnText>PLUS</AddBtnText>
                </AddBtn>
            </AddBtnWrap>
            
        </Container>
    );
};

export default MainScreen;