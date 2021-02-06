import React, { useRef, useState } from 'react'
import { Alert, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Feather from 'react-native-vector-icons/Feather'
import {
    GradientBackground,
    KeyboardScrollView,
    ButtonBack,
    FormSeparator,
    SnowInput,
    Touch,
    SnowButton,
    Label,
    TransparentButton,
} from '../../../components/SnowForms'
import { CoolAlert } from '../../../components/CoolAlert'
import { Logo, PageTitle, LabelVisible } from './styles'

import translate from '../../../../locales/i18n'
import { GDSLogoES, GDSLogoBR } from '../../../img/imageConst'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { authUser } from '../../../api/user'

Feather.loadFont()

const Login = ({ navigation }) => {
    const { storeUser, setIsLoggedIn, setNeedSignIn } = useUser()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)

    const passwordInput = useRef()

    const handleLogin = async () => {
        Keyboard.dismiss()

        if (email === '' || password === '') {
            Alert.alert(translate('register.fieldNotBlank'))
            return
        }

        setShowProgressBar(true)
        setShowAlert(true)

        const response = await authUser({
            email,
            password,
        })

        if (response.status === 200) {
            setShowAlert(false)

            await storeUser(response.body.user, response.token, {
                email,
                password,
            })

            setNeedSignIn(false)
            setIsLoggedIn(true)
        } else if (response.status === 401) {
            setShowAlert(false)
            Alert.alert(translate('login.errorMessages.emailPwdWrong'))
        } else {
            setShowAlert(false)
            Alert.alert(translate('register.geralError'))
        }
    }

    let LogoType = GDSLogoBR

    if (translate('lang.code') === 'es') {
        LogoType = GDSLogoES
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#5DD39E' }} />
            <GradientBackground>
                <KeyboardScrollView>
                    <Logo source={LogoType} />
                    <PageTitle>{translate('login.title')}</PageTitle>

                    <FormSeparator>
                        <SnowInput
                            placeholder={translate('login.email')}
                            keyboardType='email-address'
                            returnKeyType='next'
                            maxLength={100}
                            onChangeText={(text) => setEmail(text)}
                            onSubmitEditing={() =>
                                passwordInput.current.focus()
                            }
                        />
                        <SnowInput
                            placeholder={translate('login.password')}
                            secureTextEntry
                            maxLength={100}
                            ref={passwordInput}
                            onChangeText={(text) => setPassword(text)}
                            onSubmitEditing={() => handleLogin()}
                        />
                    </FormSeparator>

                    <FormSeparator>
                        <Touch onPress={() => handleLogin()}>
                            <SnowButton>
                                <Label>{translate('login.loginbutton')}</Label>
                            </SnowButton>
                        </Touch>
                    </FormSeparator>

                    <TransparentButton
                        onPress={() => navigation.navigate('ForgetPwd')}
                    >
                        <LabelVisible>
                            {translate('login.forgetbutton')}
                        </LabelVisible>
                    </TransparentButton>

                    <ButtonBack onPress={() => navigation.goBack()}>
                        <Feather
                            name='chevron-left'
                            size={scale(40)}
                            color='#ffffff'
                        />
                    </ButtonBack>
                </KeyboardScrollView>

                <CoolAlert
                    show={showAlert}
                    showProgress={showProgressBar}
                    title={
                        showProgressBar
                            ? translate('login.awesomeAlert.accessing')
                            : null
                    }
                    closeOnTouchOutside={!showProgressBar}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={!showProgressBar}
                />
            </GradientBackground>
        </>
    )
}

export default Login