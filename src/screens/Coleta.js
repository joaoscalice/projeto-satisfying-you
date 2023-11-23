import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {reducerIncrementaAvaliacao} from '../../redux/pesquisaSlice';
import {updateDoc, doc, initializeFirestore} from 'firebase/firestore';
import app from '../firebase/config';

const Coleta = props => {
  const dispatch = useDispatch();
  const pesquisa = useSelector(state => state.pesquisa);
  const nome = useSelector(state => state.pesquisa.nome);

  const db = initializeFirestore(app, {experimentalForceLongPolling: false});

  const goToAgradecimento = ratingType => {
    dispatch(reducerIncrementaAvaliacao({type: ratingType}));
    const pesqRef = doc(db, 'pesquisas', pesquisa.id);

    const docPesquisa = {
      ...pesquisa,
      avaliacoes: {
        ...pesquisa.avaliacoes,
        [ratingType]: pesquisa.avaliacoes[ratingType] + 1,
      },
    };

    updateDoc(pesqRef, docPesquisa);

    props.navigation.navigate('Agradecimento');
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.cTitulo}>
        <Text style={estilos.titulo}>O que você achou do {nome}?</Text>
      </View>

      <View style={estilos.cDados}>
        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={() => goToAgradecimento('pessimo')}>
          <View style={estilos.icon}>
            <Icon name="emoticon-cry-outline" size={80} color="#FF0000" />
            <Text style={estilos.texto}>Péssimo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={() => goToAgradecimento('ruim')}>
          <View style={estilos.icon}>
            <Icon name="emoticon-sad-outline" size={80} color="#FF360A" />
            <Text style={estilos.texto}>Ruim</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={() => goToAgradecimento('neutro')}>
          <View style={estilos.icon}>
            <Icon name="emoticon-neutral-outline" size={80} color="#FFC632" />
            <Text style={estilos.texto}>Neutro</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={() => goToAgradecimento('bom')}>
          <View style={estilos.icon}>
            <Icon name="emoticon-happy-outline" size={80} color="#37BD6D" />
            <Text style={estilos.texto}>Bom</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 200, height: 160, borderRadius: 5}}
          onPress={() => goToAgradecimento('excelente')}>
          <View style={estilos.icon}>
            <Icon name="emoticon-outline" size={80} color="#25BC22" />
            <Text style={estilos.texto}>Excelente</Text>
          </View>
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
    padding: 10,
  },
  cTitulo: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#FFF',
    fontSize: 36,
    fontFamily: 'AveriaLibre-Bold',
  },
  cDados: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    paddingTop: 10,
  },
});

export default Coleta;
