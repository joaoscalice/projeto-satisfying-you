import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {collection, initializeFirestore, addDoc} from 'firebase/firestore';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Botao from '../components/Botao';
import Input from '../components/Input';
import DatePicker from 'react-native-date-picker';
import app from '../firebase/config';
import {launchCamera} from 'react-native-image-picker';
import {uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {storage} from '../firebase/config';

const avaliacoes = {
  pessimo: 0,
  ruim: 0,
  neutro: 0,
  bom: 0,
  excelente: 0,
};

const formatarData = data => {
  const dia = data.getDate();
  const mes = ('0' + (data.getMonth() + 1)).slice(-2);
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

const NovaPesquisa = props => {
  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [dataError, setDataError] = useState('');
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [urlFoto, setUrlFoto] = useState('');
  const [foto, setFoto] = useState('');

  const db = initializeFirestore(app, {experimentalForceLongPolling: false});

  const pesquisasCollection = collection(db, 'pesquisas');

  useEffect(() => {
    limpar();
  }, []);

  const cadastrar = async () => {
    setNomeError('');
    setDataError('');

    if (nome == '') {
      setNomeError('Preencha o nome da pesquisa');
      return;
    }

    if (date == '') {
      setDataError('Preencha a data');
      return;
    }

    const imageRef = ref(storage, 'pesquisas/' + foto.fileName);
    const file = await fetch(foto.uri);
    const blob = await file.blob();

    uploadBytes(imageRef, blob, {contentType: 'image/jpeg'})
      .then(result => {
        console.log('Imagem enviada com sucesso!');
        getDownloadURL(imageRef)
          .then(url => {
            const docPesquisa = {
              nome: nome,
              data: date,
              imageUrl: url,
              avaliacoes: avaliacoes,
            };

            addDoc(pesquisasCollection, docPesquisa)
              .then(docRef => {
                console.log('Documento com ID: ', docRef.id);
                props.navigation.goBack();
              })
              .catch(error => {
                console.error(
                  'Erro ao adicionar documento: ',
                  JSON.stringify(error),
                );
              });
          })
          .catch(error => {
            console.log('Erro ao obter URL da imagem: ', JSON.stringify(error));
          });
      })
      .catch(error => {
        console.log('Erro ao enviar imagem: ', JSON.stringify(error));
      });

    limpar();
  };

  const limpar = () => {
    setNome('');
    setDate(null);
    setUrlFoto('');
  };

  const adicionarImagem = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back', quality: 1})
      .then(result => {
        setUrlFoto(result.assets[0].uri);
        setFoto(result.assets[0]);
      })
      .catch(error => {
        console.log('Erro ao adicionar imagem: ', error);
      });
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.cDados}>
        <Input
          texto={'Nome'}
          placeholder={''}
          txt={nome}
          setTxt={setNome}
          color={'#3F92C5'}
          heightSize={35}
        />
        {nomeError ? <Text style={estilos.errorText}>{nomeError}</Text> : null}

        <Text
          style={{
            fontFamily: 'AveriaLibre-Regular',
            color: 'white',
            fontSize: 20,
          }}>
          Data
        </Text>
        <TouchableOpacity style={estilos.dataBtn} onPress={() => setOpen(true)}>
          <Text style={{fontFamily: 'AveriaLibre-Regular', color: '#939393'}}>
            {!!date ? date : 'Selecione a data'}
          </Text>
          <Icon
            style={estilos.calendario}
            name="calendar-month"
            size={30}
            color="#939393"
          />
        </TouchableOpacity>
        {dataError ? <Text style={estilos.errorText}>{dataError}</Text> : null}

        <DatePicker
          mode="date"
          modal
          open={open}
          date={new Date()}
          onConfirm={date => {
            setOpen(false);
            setDate(formatarData(date));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <TouchableOpacity onPress={adicionarImagem} style={estilos.botaoImagem}>
          {urlFoto ? (
            <Image source={{uri: urlFoto}} style={{width: 70, height: 70}} />
          ) : (
            <Text>Câmera/Galeria de Imagens</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={estilos.cRodape}>
        <Botao texto="CADASTRAR" funcao={cadastrar} />
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
    padding: 20,
    position: 'relative',
  },
  cDados: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
  },
  cRodape: {
    width: '50%',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  dataBtn: {
    backgroundColor: 'white',
    width: '100%',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 2,
  },
  calendario: {
    position: 'absolute',
    right: 1,
    top: 2,
  },
  errorText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#FD7979',
    fontSize: 14,
    marginTop: 5,
  },
  botaoImagem: {
    backgroundColor: 'white',
    width: '50%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    marginTop: 10,
  },
});

export default NovaPesquisa;
