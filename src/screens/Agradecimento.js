import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Agradecimento = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Coleta');
    }, 3000);
  }, []);

  return (
    <View style={estilos.tela}>
      <View style={estilos.cDados}>
        <Text style={estilos.texto}>Obrigado por participar da pesquisa!</Text>
        <Text style={estilos.texto}>Aguardamos você no próximo ano!</Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#372775',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cDados: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    color: '#FFF',
    fontSize: 32,
    fontFamily: 'AveriaLibre-Regular',
    paddingTop: 20,
  },
});

export default Agradecimento;
