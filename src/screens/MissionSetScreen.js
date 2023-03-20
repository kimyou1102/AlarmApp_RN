import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { MissionSetText, InputsWrap, MissionSetSubText, Input, CountContainer, CountWrap, CountBtn, CountText, SubmitBtn, SubmitBtnText } from '../styles/styledComponents';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

const MissionSetScreen = ({isMissionVisible, setIsMissionVisible, value, setValue, count, setCount, setSentenceInfo}) => {
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
                              size={30}
                              color="white"
                              style={{textAlign: 'center'}}
                            /></CountBtn>
                        <CountWrap>
                            <CountText>{count}</CountText>
                        </CountWrap>
                        <CountBtn activeOpacity={0.8} onPress={() => {setCount(count => count + 1)}}>
                            <Icon
                              name="plus"
                              size={30}
                              color="white"
                              style={{textAlign: 'center'}}
                            /></CountBtn>
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
})

export default MissionSetScreen;