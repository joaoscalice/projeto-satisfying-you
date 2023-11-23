import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth_mod} from '../firebase/config';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Botao from '../components/Botao';
import Input from '../components/Input';
import {reducerSetLogin} from '../../redux/loginSlice';

const Login = props => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');

  const dispatch = useDispatch();

  const isValidEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const entrar = () => {
    setEmailError('');

    if (!isValidEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    } else {
      signInWithEmailAndPassword(auth_mod, email, senha)
        .then(userLogged => {
          console.log(
            'Usuário autenticado com sucesso!' + JSON.stringify(userLogged),
            dispatch(
              reducerSetLogin({
                email: email,
                senha: senha,
                id: userLogged.user.uid,
              }),
            ),
          );
          props.navigation.navigate('Drawer');
        })
        .catch(error => {
          console.log('Erro ao autenticar usuário: ' + JSON.stringify(error));
        });
    }
  };

  const goToNovaConta = () => {
    props.navigation.navigate('NovaConta');
  };

  const goToRecuperarSenha = () => {
    props.navigation.navigate('RecuperarSenha');
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.cTitulo}>
        <Text style={estilos.titulo}>Satisfying.you</Text>
        <Icon name="sentiment-satisfied-alt" size={50} color="#FFF" />
      </View>

      <View style={estilos.cDados}>
        <Input
          texto={'E-mail'}
          placeholder={'nome@gmail.com'}
          txt={email}
          setTxt={setEmail}
          color={'#3F92C5'}
          heightSize={35}
        />
        {emailError ? (
          <Text style={estilos.errorText}>{emailError}</Text>
        ) : null}

        <Input
          texto={'Senha'}
          placeholder={'*********'}
          txt={senha}
          setTxt={setSenha}
          color={'#3F92C5'}
          heightSize={35}
        />

        <Botao texto="Entrar" funcao={entrar} />
      </View>

      <View style={estilos.cRodape}>
        <TouchableOpacity style={estilos.botaoCriar}>
          <Text style={estilos.textoBotao} onPress={goToNovaConta}>
            Criar minha conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoRecuperar}>
          <Text style={estilos.textoBotao} onPress={goToRecuperarSenha}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#372775',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  cTitulo: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  cDados: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
  },
  cRodape: {
    width: '50%',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  titulo: {
    color: '#FFF',
    fontSize: 40,
    fontFamily: 'AveriaLibre-Bold',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
  botaoCriar: {
    padding: 3,
    marginBottom: 5,
    backgroundColor: '#419ED7',
  },
  botaoRecuperar: {
    padding: 3,
    backgroundColor: '#B0CCDE',
  },
  errorText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#FD7979',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Login;
