import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth_mod } from '../firebase/config';
import Botao from "../components/Botao";
import Input from "../components/Input";

const RecuperarSenha = (props) => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');

    const recuperar = () => {
        setEmailError('');


        if (!isValidEmail(email)) {
            setEmailError('E-mail parece ser inválido.');
            return;
        } else {
            sendPasswordResetEmail(auth_mod, email)
            .then(() => {
                console.log('E-mail enviado com sucesso!')
                props.navigation.navigate('Login')
            })
            .catch((error) => {
                console.log('Erro ao enviar e-mail: ' + JSON.stringify(error))
            });
        }
    }

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return (
        <View style={estilos.tela}>
            <View style={estilos.cDados}>
                <Input texto={'E-mail'} placeholder={'nome@gmail.com'} txt={email} setTxt={setEmail} color={'#3F92C5'} heightSize={35}/>
                {emailError ? <Text style={estilos.errorText}>{emailError}</Text> : null}
            </View>

            <View style={estilos.cRodape}>
                <Botao texto='RECUPERAR' funcao={recuperar} />
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    tela: {
        backgroundColor: '#372775',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 50
    },
    cDados: {
        width: '50%',
    },
    cRodape: {
        width: '50%'
    },
    errorText: {
        fontFamily: 'AveriaLibre-Regular',
        color: '#FD7979',
        fontSize: 14,
        marginTop: 5
    }
})

export default RecuperarSenha;
