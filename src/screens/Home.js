import {View, StyleSheet, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Botao from '../components/Botao';
import Input from '../components/Input';
import Card from '../components/Card';
import {
  query,
  initializeFirestore,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import app from '../firebase/config';
import {useDispatch} from 'react-redux';
import {
  reducerLimpaPesquisa,
  reducerSetPesquisa,
} from '../../redux/pesquisaSlice';

const Home = props => {
  const [busca, setBusca] = useState('');
  const [listaPesquisas, setListaPesquisas] = useState([]);

  const dispatch = useDispatch();

  const db = initializeFirestore(app, {experimentalForceLongPolling: false});

  const pesquisasCollection = collection(db, 'pesquisas');

  useEffect(() => {
    dispatch(reducerLimpaPesquisa());

    const q = query(pesquisasCollection);

    onSnapshot(q, querySnapshot => {
      const pesq = [];
      querySnapshot.forEach(doc => {
        pesq.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setListaPesquisas(pesq);
    });
  }, []);

  const goToNovaPesquisa = () => {
    props.navigation.navigate('NovaPesquisa');
  };

  const goToAcoesPesquisa = item => {
    dispatch(
      reducerSetPesquisa({
        nome: item.nome,
        imageUrl: item.imageUrl,
        data: item.data,
        id: item.id,
        avaliacoes: item.avaliacoes,
      }),
    );
    props.navigation.navigate('AcoesPesquisa');
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.cDados}>
        <Icon name="search" size={30} color="#8B8B8B" />
        <Input
          placeholder={'Insira o termo de busca'}
          txt={busca}
          setTxt={setBusca}
          color={'#8B8B8B'}
          heightSize={35}
          widthSize={'95%'}
        />
      </View>

      <FlatList
        data={listaPesquisas}
        renderItem={({item}) => (
          <Card
            funcao={() => goToAcoesPesquisa(item)}
            titulo={item.nome}
            urlImagem={item.imageUrl}
            data={item.data}
          />
        )}
        horizontal={true}
        keyExtractor={item => item.id}
      />

      <View style={estilos.cBotao}>
        <Botao texto="NOVA PESQUISA" funcao={goToNovaPesquisa} />
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
    backgroundColor: '#FFF',
  },
  cBotao: {
    width: '95%',
  },
});

export default Home;
