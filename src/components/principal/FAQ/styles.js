import styled from 'styled-components/native';

import ShadowView from 'react-native-simple-shadow-view';

import { scale, percentage } from '../../../utils/scallingUtils';

export const Help = styled.View`
    background-color: #f8f8f8;
    flex: 1;
    padding-top: ${percentage(8)}px;
    padding-horizontal: ${percentage(7)}px;
`;

export const Search = styled(ShadowView).attrs({
})`
    width: 100%;
    background-color: #348EAC;
    border-radius: ${scale(18)}px;
    align-items: center;
    flex-direction: row;
    margin-bottom: ${percentage(7)}px;
    padding-vertical: ${scale(14)}px;
    padding-horizontal: ${scale(18)}px;
    shadow-color: #348EAC;
    shadow-opacity: 0.2;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const SearchInput = styled.TextInput.attrs({
    placeholderTextColor: "#ffffff",
    multiline: false,
})`
    flex: 1;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #ffffff;
    margin-left: ${percentage(4)}px;
    padding-bottom: 0;
    padding-top: 0;
`;

export const Question = styled(ShadowView).attrs({
})`
    width: 100%;
    background-color: #ffffff;
    border-radius: ${scale(18)}px;
    flex-direction: row;
    margin-bottom: ${percentage(7)}px;
    padding: ${scale(18)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const Title = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348EAC;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const Details = styled.View`
    height: 20%;
    background-color: #ffffff;
    border-top-left-radius: ${scale(20)}px;
    border-top-right-radius: ${scale(20)}px;
    padding: ${scale(18)}px;
`;

export const DetailsTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348EAC;
`;

export const DetailsAnswer = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348EAC;
`;