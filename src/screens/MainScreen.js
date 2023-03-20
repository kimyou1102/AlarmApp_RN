import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  AlarmScroll,
  AddBtnWrap,
  AddBtn,
  ModalTextWrap,
  ModalText,
  TimeSetContainer,
  TimeScrollWrap,
  TimeScrollView,
  OverlayWrap,
  BorderView,
  SetWrap, SmallSetbWrap,
  AlarmAddInfoText,
  WeekView, WeekBtn, WeekBtnText
} from '../styles/styledComponents';
import Alarm from '../components/Alarm';
import Icon from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';
import { debounce } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MissionSetScreen from './MissionSetScreen';

const MainScreen = () => {
  const [data, setData] = useState({});
  const [isModalVisible, setModalVisible] = useState(true);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectDay, setSelectedDay] = useState([false, false, false, false, false, false, false]);
  const [missionCheck, setMissionCheck] = useState(false);
  const [isMissionVisible, setIsMissionVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const [sentenceInfo, setSentenceInfo] = useState([]);

  const refs = useRef([]);
  const BTN_Height = 40;

  const hours = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ''];
  const minutes = [
    '',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '',
  ];
  const week = ['월', '화', '수', '목', '금', '토', '일'];
  const onDayPress = (i) => {
    const copy = selectDay.map((e, index) => (index === i ? !e : e));
    setSelectedDay(copy);
  }

  const plusOnPress = async () => {
    setModalVisible(modalVisible => !modalVisible);
  };

  const missionOnPress = () => {
    setIsMissionVisible(modalVisible => !modalVisible);
  }

  const onScrollStop = debounce((offsetY, index) => {
    const num = Math.round(offsetY/BTN_Height);
    if(num !== offsetY/BTN_Height) {
      refs.current[index]?.scrollTo({x: 0, y: num*BTN_Height, animated: true})
    }

    if(index === 0) {
      setSelectedTimeZone(num === 0 ? '오전' : '오후')
    } else if(index === 1) {
      setSelectedHour(num+1);
    } else if(index === 2) {
      setSelectedMinute(num);
    }
  }, 200, {leading: false, trailing: true})

  const SubmitOnPress = async() => {
    console.log('제출');
    setModalVisible(isModalVisible => !isModalVisible);
    console.log(selectedTimeZone, selectedHour, selectedMinute);
    const arr = selectDay.map((e, i) => (e));
    console.log(arr);
    console.log(count, value);
    console.log('제출끝');

    const minute = selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute;

    const one = {'count': sentenceInfo[0], 'on_off': true, repeat: false, 'sentence': sentenceInfo[1], 'sound': "alarm_bell", 'hour': selectedHour, 'minute': minute, "time_zone": selectedTimeZone, 'volume': 5};
    const newList = [one];
    console.log(newList);
    setData(newList);
    try {
        const storageData = JSON.parse(await AsyncStorage.getItem('textData'));
        const newData = [...storageData, one];
        await AsyncStorage.setItem("textData", JSON.stringify(newData));
        setData(newData);
    } catch (error) {
        console.log('추가부분 에러', error);
    }

    setSentenceInfo([]);
  }

  const Button = ({label}) => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const OverlayView = () => {
    return (
      <OverlayWrap>
        <BorderView/>
        <BorderView/>
        <BorderView/>
      </OverlayWrap>
    );
  };

  useEffect(() => {
    const initialData = [
      {
        count: 3,
        on_off: true,
        repeat: false,
        sentence: '안녕하세요',
        sound: 'alarm_bell',
        hour: 8,
        minute: 30,
        time_zone: '오전',
        volume: 5,
      },
      // {
      //   count: 3,
      //   on_off: true,
      //   repeat: false,
      //   sentence: '안녕하세요',
      //   sound: 'alarm_bell',
      //   time: '9:24',
      //   time_zone: '오전',
      //   volume: 10,
      // },
      // {
      //   count: 3,
      //   on_off: false,
      //   repeat: false,
      //   sentence: '안녕하세요',
      //   sound: 'alarm_bell',
      //   time: '10:26',
      //   time_zone: '오전',
      //   volume: 5,
      // },
    ];
    // setData(initialData);

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
  }, []);

  return (
    <>
      <Container>
        <AlarmScroll contentContainerStyle={{paddingBottom: 20}}>
          {data.length
            ? data.map((e, index) => (
                <Alarm
                  key={index}
                  index={index}
                  time_zone={e.time_zone}
                  hour={e.hour}
                  minute={e.minute}
                  on_off={e.on_off}
                  data={data}
                  setData={setData}
                />
              ))
            : null}
        </AlarmScroll>
        <AddBtnWrap>
          <AddBtn onPress={plusOnPress}>
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
              <ModalText onPress={() => setModalVisible(false)}>취소</ModalText>
              <ModalText weight="bold" onPress={SubmitOnPress}>저장</ModalText>
            </ModalTextWrap>
            <TimeSetContainer>
              <TimeScrollWrap>
                <TimeScrollView
                  ref={(el)=>refs.current[0]=el}
                  onMomentumScrollEnd={(event) => {onScrollStop(event.nativeEvent.contentOffset.y, 0)}}
                  showsVerticalScrollIndicator={false}
                >
                  {['', '오전', '오후', ''].map((item, index) => (
                    <Button key={index} label={item} />
                  ))}
                </TimeScrollView>
              </TimeScrollWrap>
              <TimeScrollWrap>
                <TimeScrollView
                  ref={(el)=>refs.current[1]=el}
                  onMomentumScrollEnd={(event) => {onScrollStop(event.nativeEvent.contentOffset.y, 1)}}
                  showsVerticalScrollIndicator={false}
                >
                  {hours.map((hour, index) => (
                    <Button key={index} label={hour}/>
                  ))}
                </TimeScrollView>
              </TimeScrollWrap>

              <TimeScrollWrap>
                <TimeScrollView
                  ref={(el)=>refs.current[2]=el}
                  onMomentumScrollEnd={(event) => {onScrollStop(event.nativeEvent.contentOffset.y, 2)}}
                  showsVerticalScrollIndicator={false}
                >
                  {minutes.map((minute, index) => (
                    <Button key={index} label={minute} />
                  ))}
                </TimeScrollView>
              </TimeScrollWrap>
              <OverlayView />
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
                <AlarmAddInfoText>미션</AlarmAddInfoText>
                <AlarmAddInfoText>미션 없음</AlarmAddInfoText>
              </SmallSetbWrap>
            </TouchableWithoutFeedback>
            <MissionSetScreen isMissionVisible={isMissionVisible} value={value} setValue={setValue} setIsMissionVisible={setIsMissionVisible} count={count} setCount={setCount} setSentenceInfo={setSentenceInfo}/>

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
    backgroundColor: 'white',
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