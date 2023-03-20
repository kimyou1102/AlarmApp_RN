import styled from 'styled-components/native';

//MainScreen.js 시작
export const Container = styled.View`
    flex: 1;
    position: relative;
    min-height: 100%;
    background: #181632e0;
`;
// paddingVertical: 20px;
    // background: #181632e0;
    // padding-top: 10%;
    // flex: 2;

export const AlarmScroll = styled.ScrollView`
    height: 100%;
    min-height: 100%;
    // paddingVertical: 20px;
    // padding-top: 20px;
    // padding-bottom: 20px;
`

export const AddBtnWrap = styled.View`
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 20px;
    justify-content: center;
`

export const AddBtn = styled.TouchableOpacity`
    // bottom: 0;
    width: 60px;
    height: 60px;
    background-color: rgb(18, 188, 154);
    border-radius: 50px; 
    justify-content: center;
`

export const AddBtnText = styled.Text`
    text-align: center;
`

export const AlarmAddWrap = styled.View`
    // border-top-left-radius: 20px;
    // border-top-right-radius: 20px;
    // height: 96%;
`

export const ModalTextWrap = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const ModalText = styled.Text`
    font-size: 20px;
    font-weight: ${(props) => props.weight || 'normal'};
    color: #181632e0; 
`
export const TimeSetContainer = styled.View`
    height: 150px;
    width: 100%;
    border-width: 1px;
    padding-top: 15px;
    padding-bottom: 15px;
    flex-direction: row;
    justify-content: center;
`

export const TimeScrollWrap = styled.View`
    // background: ${(props) => props.color || 'pink'};
    // height: 150px;
    width: ${(props) => props.width || '55px'};
    margin-horizontal: 10px;
`

export const TimeScrollView = styled.ScrollView`

`

export const TimeText = styled.Text`
    font-size: 23px;
    text-align: center;
    border-width: 1px;
    padding: 15px;
`

export const OverlayWrap = styled.View`
    pointer-events: none;
    position: absolute;
    width: 225px;
    // background: #959595cc;
    height: 40px;
    align-self: center;
    justify-content: space-between;
    padding-horizontal: 10px;
    flex-direction: row;
`

export const BorderView = styled.View`
    // width: ${(props) => props.width || '80px'};
    height: 40px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    width: 55px;
    flexDirection: row;
    // border-color: #959595cc;
    border-color: #a7a5a5;
`

export const AlarmAddInfoText = styled.Text`
    font-size: 16px;
    padding-top: 15px;
    padding-bottom: 15px;
`

export const SetWrap = styled.View`
    height: ${(props) => props.height || '130px'};
    border-width: 1px;
    padding-horizontal: 15px; 
`

export const SmallSetbWrap = styled.View`
    height: 60px;
    border-width: 1px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 15px; 
`

export const WeekView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-top: 15px;
`

export const WeekBtn = styled.View`
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.color || '#e4e4e4'};
    border-radius: 50px; 
    justify-content: center;
`

export const WeekBtnText = styled.Text`
    text-align: center;
    color: ${(props) => props.color || '#757575'};
    font-size: 16px;
`


//MainScreen.js 끝


//Alam.js 시작
export const AlarmWrap = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 88%;
    margin: 0 auto;
    border-bottom-color: rgb(81 81 81);
    border-bottom-width: 1px;
    // border-width: 1px;
`

export const TimeWrap = styled.View`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: red;
    // color:${(props) => props.color || 'rgb(98 98 98)'};
`;

export const TimeZone = styled.Text`
    font-size: 30px;
    margin-right: 5px;
    color:${(props) => props.color || 'rgb(98 98 98)'};
`;

export const Time = styled.Text`
    font-size: 50px;
    color:${(props) => props.color || 'rgb(98 98 98)'};
`;

export const AlarmSwitch = styled.Switch`
`

//Alam.js 끝


//AlarmAddBottomSheet.js 시작
//AlarmAddBottomSheet.js 끝

// MissionSetScreen.js 시작
export const CloseBtn = styled.View`
    width: 30px;
    height: 30px;
    // background-color: red;
    justify-content: center;
`

export const MissionSetText = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
    margin-left: 15px;
    margin-top: 20px;
`;

export const MissionSetSubText = styled.Text`
    font-size: 18px;
    color: black;
`;

export const InputsWrap = styled.View`
    margin-top: 50px;
    padding-horizontal: 20px;
`;

export const Input = styled.TextInput`
    height: 50px;
    width: 100%;
    border-width: 1px;
    margin-top: 10px;
    margin-bottom: 50px;
    padding-left: 10px;
    font-size: 16px;
`
export const CountContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 200px;
    background: #e6ebf7;
    border-radius: 10px;
`
export const CountBtn = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    background-color: #181632e0;
    border-radius: 5px;
    justify-content: center;
    // border-width: 1px;
`

export const CountWrap = styled.View`
    width: 100px;
    height: 60px;
    // border-width: 1px;
    justify-content: center;
`

export const CountText = styled.Text`
    font-size: 20px;
    text-align: center;
`
export const SubmitBtn = styled.TouchableOpacity`
    width: 80px;
    height: 50px;
    background-color: #181632e0;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-top: 50px; 
`
export const SubmitBtnText = styled.Text`
    color: white;
    font-size: 18px;
`

// MissionSetScreen.js 끝