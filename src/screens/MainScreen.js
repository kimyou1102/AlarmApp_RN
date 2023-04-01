import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Container,
  AddBtnWrap,
  AddBtn,
  ModalTextWrap,
  ModalText,
  TimeSetContainer,
  SetWrap, SmallSetbWrap,
  AlarmAddInfoText,
  WeekView, WeekBtn, WeekBtnText,
  AlarmWrap, TimeWrap, Time, TimeZone, AlarmSwitch
} from '../styles/styledComponents';
import Icon from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MissionSetScreen from './MissionSetScreen';
import DatePicker from 'react-native-date-picker'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MainScreen = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectDay, setSelectedDay] = useState([false, false, false, false, false, false, false]);
  const [missionCheck, setMissionCheck] = useState(false);
  const [isMissionVisible, setIsMissionVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [value, setValue] = useState('');
  const [sentenceInfo, setSentenceInfo] = useState([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [isMission, setMission] = useState('없음');
  const [date, setDate] = useState(new Date())
  console.log(date);

  useEffect(() => {
    date.getHours() > 12 ? setSelectedTimeZone('오후') : setSelectedTimeZone('오전');
  }, [date]);

  const week = ['월', '화', '수', '목', '금', '토', '일'];
  const onDayPress = (i) => {
    const copy = selectDay.map((e, index) => (index === i ? !e : e));
    setSelectedDay(copy);
  }

  const plusOnPress = () => {
    setModalVisible(modalVisible => !modalVisible);
  };

  const missionOnPress = () => {
    setIsMissionVisible(modalVisible => !modalVisible);
  }

  const SubmitOnPress = async () => {
    console.log('제출');
    // setModalVisible(isModalVisible => !isModalVisible);
    console.log(selectedTimeZone, selectedHour, selectedMinute);
    const arr = [];
    selectDay.map((e, i) => (
      e ? arr.push(i) : null
    ));
    console.log(arr);
    const weekData = arr.map((e) => week[e]);
    console.log(weekData);
    console.log(sentenceInfo[0], sentenceInfo[1]);
    console.log('제출끝');

    let hour = 0;
    if(date.getHours() > 12) {
      hour = date.getHours() - 12;
    } else {
      hour = date.getHours();
    }
    hour === 0 ? hour = 12 : null;

    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` :  date.getMinutes();

    const one = {'id': Date.now(),'count': sentenceInfo[0], 'on_off': true, repeat: weekData, 'sentence': sentenceInfo[1], 'sound': "alarm_bell", 'hour': hour, 'minute': minute, "full_date" : date, "time_zone": selectedTimeZone, 'volume': 5, 'decibel': sliderValue};
    console.log(one);
    console.log('=============================================================');
    try {
      const storageData = JSON.parse(await AsyncStorage.getItem('textData'));
      if (storageData) {
        const newData = [...storageData, one];
        await AsyncStorage.setItem("textData", JSON.stringify(newData));
        setData(newData);  
      } else {
        console.log('GET data from storage');
        const newData = [one];
        await AsyncStorage.setItem("textData", JSON.stringify(newData));
        setData(newData);  
      }
    } catch (error) {
        console.log('추가부분 에러', error);
    }

    //취소할때도 초기화 해주기 
    // setSentenceInfo([]);
    // setSelectedDay([false, false, false, false, false, false, false]);
    // setSelectedTimeZone('');
    // setSelectedHour(0);
    // setSelectedMinute(0);
    closeOnPress();
  }

  const closeOnPress = () => {
    setModalVisible(isModalVisible => !isModalVisible);
    setSentenceInfo([]);
    setSelectedDay([false, false, false, false, false, false, false]);
    setSelectedTimeZone('');
    setSelectedHour(0);
    setSelectedMinute(0);
    setMission('없음');
  }

  useEffect(() => {
    // const initialData = [
    //   {
    //     count: 3,
    //     on_off: true,
    //     repeat: false,
    //     sentence: '안녕하세요',
    //     sound: 'alarm_bell',
    //     hour: 8,
    //     minute: 30,
    //     time_zone: '오전',
    //     volume: 5,
    //   },
    //   // {
    //   //   count: 3,
    //   //   on_off: true,
    //   //   repeat: false,
    //   //   sentence: '안녕하세요',
    //   //   sound: 'alarm_bell',
    //   //   time: '9:24',
    //   //   time_zone: '오전',
    //   //   volume: 10,
    //   // },
    //   // {
    //   //   count: 3,
    //   //   on_off: false,
    //   //   repeat: false,
    //   //   sentence: '안녕하세요',
    //   //   sound: 'alarm_bell',
    //   //   time: '10:26',
    //   //   time_zone: '오전',
    //   //   volume: 5,
    //   // },
    // ];
    // // setData(initialData);
    
    //스토리지 삭제시 제대로 되기 위해 id값 생성한 시간으로 하기
    const getData = async () => {
      try {
        const storageData = JSON.parse(await AsyncStorage.getItem('textData'));
        console.log('storageData : ', storageData);
        if (storageData) {
          console.log('GET data from storage');
          setData(storageData);
        }
      } catch (error) {
        console.log('error : ', error);
      }
    };

    getData();
    console.log(data);
  }, []);

  const deleteOnPress = async (id) => {
    try {
      const storageData = JSON.parse(await AsyncStorage.getItem('textData'));
      const index = storageData.findIndex(e => e.id === id);
      console.log(index);
      storageData.splice(index, 1);
      await AsyncStorage.setItem("textData", JSON.stringify(storageData));
      setData(storageData);
    } catch (error) {
      console.log('error : ', error);
    }
  }

  const rightSwipeActions = (id) => {
    return (
      <TouchableOpacity
        onPress={() => deleteOnPress(id)}
        activeOpacity={0.8}
        style={{
          width: 100,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#1b1a17',
            fontWeight: '600',
            fontSize: 18,
          }}
        >
          삭제
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderAlarm = ({item, index}) => {
    const onChange = async (event) => {
      const checked = event.nativeEvent.value;
      const id = event._dispatchInstances._debugOwner.memoizedProps.id;
      const copy = data.map((e, index) => (
          index === id ? {...e, 'on_off': checked} : e
      ));

      try {
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
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => rightSwipeActions(item.id)}
      >
        <AlarmWrap>
            <TimeWrap>
                <TimeZone color={item.on_off ? 'white' : null}>{item.time_zone}</TimeZone>
                <Time color={item.on_off ? 'white' : null}>{item.hour}:{item.minute}</Time>
            </TimeWrap>
            <AlarmSwitch id={index} value={item.on_off} onChange={onChange} />
        </AlarmWrap>
      </Swipeable>
    </GestureHandlerRootView>
    
    );
  }

  return (
    <>
      <Container>
        <View style={{height:"80%",}}>
          {data.length ?
            <FlatList
              data={data}
              renderItem={RenderAlarm}
              keyExtractor={(item, index) => index.toString()}
            /> : <Text>알람이 없어요</Text>}
        </View>
        <AddBtnWrap>
          <AddBtn onPress={plusOnPress} activeOpacity={0.5}>
            <Icon
              name="plus-a"
              size={20}
              color="white"
              style={{textAlign: 'center'}}
            />
          </AddBtn>
        </AddBtnWrap>

        <Modal
          testID={'modal'}
          isVisible={isModalVisible}
          style={styles.modal}
        >
          <View style={styles.view}>
            <ModalTextWrap>
              <ModalText onPress={closeOnPress}>취소</ModalText>
              <ModalText weight="bold" onPress={SubmitOnPress}>저장</ModalText>
            </ModalTextWrap>
            <TimeSetContainer>
              <DatePicker mode="time" date={date} onDateChange={setDate} style={{height: 100, width: 280}}/>
            </TimeSetContainer>

            <SetWrap>
              <AlarmAddInfoText>알람반복</AlarmAddInfoText>
              <WeekView>
                {week.map((day, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => onDayPress(index)}>
                    <WeekBtn  
                    color={selectDay[index] ? '#181632e0' : '#e4e4e4'}
                    >
                      <WeekBtnText color={selectDay[index] ? 'white' : '#757575'}>{day}</WeekBtnText>
                    </WeekBtn>
                  </TouchableWithoutFeedback>
                  
                ))}
              </WeekView>
            </SetWrap>
            <TouchableWithoutFeedback onPress={missionOnPress}>
              <SmallSetbWrap>
                <AlarmAddInfoText>문장 읽기</AlarmAddInfoText>
                <AlarmAddInfoText>{isMission}</AlarmAddInfoText>
              </SmallSetbWrap>
            </TouchableWithoutFeedback>
            <MissionSetScreen isMissionVisible={isMissionVisible} value={value} setValue={setValue} setIsMissionVisible={setIsMissionVisible} count={count} setCount={setCount} setSentenceInfo={setSentenceInfo}
            sliderValue={sliderValue} setSliderValue={setSliderValue} setMission={setMission}
            />

            <Text>{selectedTimeZone} {selectedHour} {selectedMinute}</Text>
            <View>{selectDay.map((e, i) => (
              e ? <Text key={i}>{week[i]}</Text> : null
            ))}</View>
          </View>
        </Modal>
      </Container>
    </>  
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  view: {
    backgroundColor: '#e6ebf7',
    // background: #e6ebf7;
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    width: '100%',
    height: '100%',
    padding: 15,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    // fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});

export default MainScreen;