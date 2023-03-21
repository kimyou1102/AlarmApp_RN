import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import { MissionSetText, InputsWrap, MissionSetSubText, Input, CountContainer, CountWrap, CountBtn, CountText, SubmitBtn, SubmitBtnText } from '../styles/styledComponents';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {Slider} from '@miblanchard/react-native-slider';

const MissionSetScreen = ({isMissionVisible, setIsMissionVisible, value, setValue, count, setCount, setSentenceInfo, sliderValue, setSliderValue}) => {
    //확인용으로 따로한거지 나중에 합치자
    const closeOnPress = () => {
        console.log('헤이');
        setValue('');
        setCount(0);
        setIsMissionVisible(isMissionVisible => !isMissionVisible);
    }

    const SubmitOnPress = () => {
        console.log(count, value);
        setValue('');
        setCount(0);
        setSentenceInfo([count, value])
        setIsMissionVisible(isMissionVisible => !isMissionVisible);
    }

    return (
        <>
            <Modal
              testID={'modal'}
              isVisible={isMissionVisible}
              style={styles.modal}
            >
              <View style={styles.view}>
                <TouchableWithoutFeedback onPress={closeOnPress}>
                  <Icon
                    name="close"
                    size={30}
                    color="black"
                    style={{textAlign: 'left'}}
                  />
                </TouchableWithoutFeedback>
                <MissionSetText>문장 읽기</MissionSetText>
                <InputsWrap>
                    <MissionSetSubText>문장</MissionSetSubText>
                    <Input placeholder="문장을 입력해주세요." value={value} onChangeText={text => setValue(text)}/>
                    <MissionSetSubText>읽기 횟수</MissionSetSubText>
                    <CountContainer>
                        <CountBtn activeOpacity={0.8} onPress={() => {setCount(count => count - 1)}}>
                            <Icon
                              name="minus"
                              size={25}
                              color="white"
                              style={{textAlign: 'center'}}
                            /></CountBtn>
                        <CountWrap>
                            <CountText>{count}</CountText>
                        </CountWrap>
                        <CountBtn activeOpacity={0.8} onPress={() => {setCount(count => count + 1)}}>
                            <Icon
                              name="plus"
                              size={25}
                              color="white"
                              style={{textAlign: 'center'}}
                            /></CountBtn>
                    </CountContainer>
                    <MissionSetSubText>통과 데시벨</MissionSetSubText>
                    <CountContainer>
                        <View style={styles.container}>
                            <Text>Value: {sliderValue}</Text>
                            <Slider
                                minimumValue={0} // 최소값 설정
                                maximumValue={100} // 최대값 설정
                                maximumTrackTintColor='gray' // 값이 크면 빨간색
                                minimumTrackTintColor='#181632e0' // 값이 작으면 파란색
                                step={1} // 1단위로 값이 변경 
                                value={sliderValue}
                                onValueChange={(value) => {
                                    setSliderValue(value[0])
                                }}
                            />
                        </View>
                    </CountContainer>
                    <SubmitBtn activeOpacity={0.8} onPress={SubmitOnPress}>
                        <SubmitBtnText>완료</SubmitBtnText>
                    </SubmitBtn>
                </InputsWrap>
                
              </View>
            </Modal>
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
      width: '100%',
      height: '100%',
      padding: 10,
    },
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
})

export default MissionSetScreen;
