import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth_mod } from '../firebase/config';
import Botao from '../components/Botao';
import Input from '../components/Input';

const NovaConta = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [rSenha, setRSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [rSenhaError, setRSenhaError] = useState('');

    const cadastrar = () => {
        setEmailError('');
        setSenhaError('');
        setRSenhaError('');

        if (!isValidEmail(email)) {
            setEmailError('Por favor, insira um email válido.');
            return;
        }

        if (senha !== rSenha) {
            setRSenhaError('O campo de repetir senha difere da senha.');
            return;
        } else {
            createUserWithEmailAndPassword(auth_mod, email, senha)
                .then((userCredential) => {
                    console.log('Usuário cadastrado com sucesso!' + JSON.stringify(userCredential))
                    props.navigation.navigate('Login')
                })
                .catch((error) => {
                    console.log('Erro ao cadastrar usuário: ' + JSON.stringify(error))
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

                <Input texto={'Senha'} placeholder={'*********'} txt={senha} setTxt={setSenha} color={'#3F92C5'} heightSize={35}/>
                {senhaError ? <Text style={estilos.errorText}>{senhaError}</Text> : null}

                <Input texto={'Repetir senha'} txt={rSenha} setTxt={setRSenha} heightSize={35}/>
                {rSenhaError ? <Text style={estilos.errorText}>{rSenhaError}</Text> : null}
            </View>

            <View style={estilos.cRodape}>
                <Botao texto='CADASTRAR' funcao={cadastrar} />
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
        padding: 10
    },
    cDados: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '50%'
    },
    cRodape: {
        width: '50%',
        justifyContent: 'space-between',
        paddingTop: 20
    },
    errorText: {
        fontFamily: 'AveriaLibre-Regular',
        color: '#FD7979',
        fontSize: 14,
        marginTop: 5
    }
})

export default NovaConta;
