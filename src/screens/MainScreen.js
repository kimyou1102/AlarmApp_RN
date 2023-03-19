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
} from '../styles/styledComponents';
import Alarm from '../components/Alarm';
import Icon from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';
import { debounce } from 'lodash';

const MainScreen = () => {
  const [data, setData] = useState({});
  const [isModalVisible, setModalVisible] = useState(true);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

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

  const plusOnPress = async () => {
    setModalVisible(modalVisible => !modalVisible);
  };

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

  const Button = ({label, index={index}}) => {
    return (
      <TouchableWithoutFeedback key={index}>
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
        time: '8:30',
        time_zone: '오전',
        volume: 5,
      },
      {
        count: 3,
        on_off: true,
        repeat: false,
        sentence: '안녕하세요',
        sound: 'alarm_bell',
        time: '9:24',
        time_zone: '오전',
        volume: 10,
      },
      {
        count: 3,
        on_off: false,
        repeat: false,
        sentence: '안녕하세요',
        sound: 'alarm_bell',
        time: '10:26',
        time_zone: '오전',
        volume: 5,
      },
    ];
    setData(initialData);
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
                  time={e.time}
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
              <ModalText weight="bold">저장</ModalText>
            </ModalTextWrap>
            <TimeSetContainer>
              <TimeScrollWrap>
                <TimeScrollView
                  ref={(el)=>refs.current[0]=el}
                  onMomentumScrollEnd={(event) => {onScrollStop(event.nativeEvent.contentOffset.y, 0)}}
                  showsVerticalScrollIndicator={false}
                >
                  {['', '오전', '오후', ''].map((item, index) => (
                    <Button index={index} label={item} />
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
                    <Button index={index} label={hour}/>
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
                    <Button index={index} label={minute} />
                  ))}
                </TimeScrollView>
              </TimeScrollWrap>
              <OverlayView />
            </TimeSetContainer>
            <Text>{selectedTimeZone} {selectedHour} {selectedMinute}</Text>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '96%',
    padding: 15,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default MainScreen;