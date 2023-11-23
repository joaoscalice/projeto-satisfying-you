import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';

const AcoesPesquisa = props => {
  const nome = useSelector(state => state.pesquisa.nome);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: nome || 'Ações da Pesquisa',
    });
  }, [props.navigation, nome]);

  const goToModificarPesquisa = () => {
    props.navigation.navigate('ModificarPesquisa');
  };

  const goToRelatorio = () => {
    props.navigation.navigate('Relatorio');
  };

  const goToColeta = () => {
    props.navigation.navigate('Coleta');
  };

  const modificar = require('../../imgs/Modificar.png');
  const coletarDados = require('../../imgs/ColetarDados.png');
  const relatorio = require('../../imgs/Relatorio.png');

  return (
    <View style={estilos.tela}>
      <View style={estilos.cImagens}>
        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={goToModificarPesquisa}>
          <Image
            source={modificar}
            style={{width: 200, height: 160, borderRadius: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={goToColeta}>
          <Image
            source={coletarDados}
            style={{width: 200, height: 160, borderRadius: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={goToRelatorio}>
          <Image
            source={relatorio}
            style={{width: 200, height: 160, borderRadius: 5}}
          />
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
  cDados: {
    flexDirection: 'row',
    width: '95%',
  },
  cBotao: {},
  cImagens: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
  },
  cImagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '30',
    height: '30',
  },
  cBotoes: {
    flexDirection: 'row',
  },
});

export default AcoesPesquisa;
