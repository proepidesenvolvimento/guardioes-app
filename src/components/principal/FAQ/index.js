import React, { Component } from 'react';
import { SafeAreaView, Modal } from 'react-native';

import { Help, Search, SearchInput, Question, Title, ModalContainer, Details, DetailsTitle, DetailsAnswer } from './styles';

import Feather from 'react-native-vector-icons/Feather';
import { FAQ_URL } from 'react-native-dotenv';
import { scale } from '../../../utils/scallingUtils';
import translate from "../../../../locales/i18n";

Feather.loadFont();

class FAQ extends Component {
    static navigationOptions = {
        title: "FAQ"
    }
    constructor() {
        super();
        this.state = {
            questionsData: null,
            searchQuery: null,
            questionSelected: null,
            answerSelected: null,
            modalVisible: false,
        }
    }

    componentDidMount() {
        this.getQuestions()
    }

    getQuestions = async (searchQuery) => {
        let query = null

        if (searchQuery && searchQuery !== '') {
            query = `search=${searchQuery}`
        }

        await fetch(`${FAQ_URL}/wp/v2/faq/?${query}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    questionsData: responseJson,
                })
            })
    }

    selectQuestion = (question, answer) => {
        this.setState({
            questionSelected: question,
            answerSelected: answer
        });

        this.setModalVisible(!this.state.modalVisible);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { questionsData, searchQuery } = this.state;

        return (
            <Help>
                <Search>
                    <Feather name="search" size={scale(20)} color="#ffffff" />
                    <SearchInput
                        placeholder="Pesquisar"
                        maxLength={100}
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                        onSubmitEditing={() => this.getQuestions(searchQuery)}
                    />
                </Search>

                {questionsData != null ?
                    questionsData.map((question) =>
                        <Question key={question.id}>
                            <Title>
                                {question.title.rendered}
                            </Title>
                            <Feather name="plus" size={scale(20)} color="#348EAC"
                                onPress={() => this.selectQuestion(question.title.rendered, question.content.rendered)}
                            />
                        </Question>
                    )
                : null}
                
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                >
                    <SafeAreaView style={{flex: 1}}>
                        <ModalContainer>
                            <Details>
                                <Feather name="x" size={scale(22)} color="#348EAC"
                                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                />
                                <DetailsTitle>{this.state.questionSelected}</DetailsTitle>
                                <DetailsAnswer>{this.state.answerSelected}</DetailsAnswer>
                            </Details>
                        </ModalContainer>
                    </SafeAreaView>
                </Modal>
            </Help>
        );
    }
}

export default FAQ;