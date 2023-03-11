import styled from 'styled-components/native';

//MainScreen.js 시작
export const Container = styled.View`
    min-height: 100%;
    background: #181632e0;
    padding-top: 10%;
`

export const AddBtnWrap = styled.View`
    disply: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 50%;
    // transform: translateX(-50);
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

//MainScreen.js 끝

//Alam.js 시작
export const AlarmWrap = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 13%;
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