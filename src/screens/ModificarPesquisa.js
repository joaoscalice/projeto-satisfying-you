import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Botao from '../components/Botao';
import Input from '../components/Input';
import DatePicker from 'react-native-date-picker';
import {
  doc,
  initializeFirestore,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {uploadBytes, ref, deleteObject, getDownloadURL} from 'firebase/storage';
import {storage} from '../firebase/config';
import app from '../firebase/config';
import {launchCamera} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

const formatarData = data => {
  const dia = data.getDate();
  const mes = ('0' + (data.getMonth() + 1)).slice(-2);
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

const ModificarPesquisa = props => {
  const pesquisa = useSelector(state => state.pesquisa);
  const dispatch = useDispatch();

  const db = initializeFirestore(app, {experimentalForceLongPolling: false});

  useEffect(() => {}, []);

  const [dataSelecionada, setDataSelecionada] = useState(pesquisa.data);
  const [nomeSelecionado, setNomeSelecionado] = useState(pesquisa.nome);
  const [urlFoto, setUrlFoto] = useState(pesquisa.imageUrl);
  const [foto, setFoto] = useState('');

  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const goToHome = () => {
    props.navigation.goBack();
    props.navigation.goBack();
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

  const atualizarPesquisa = async () => {
    const pesqRef = doc(db, 'pesquisas', pesquisa.id);
    let docPesquisa = {};

    if (foto) {
      const imageRef = ref(storage, 'pesquisas/' + foto.fileName);
      const file = await fetch(foto.uri);
      const blob = await file.blob();

      if (pesquisa.imageUrl) {
        const previousImageRef = ref(
          storage,
          decodeURIComponent(pesquisa.imageUrl),
        );

        deleteObject(previousImageRef)
          .then(() => {
            console.log('Imagem anterior excluída com sucesso!');
          })
          .catch(error => {
            console.error('Erro ao excluir imagem anterior:', error);
          });
      }

      uploadBytes(imageRef, blob, {contentType: 'image/jpeg'})
        .then(result => {
          console.log('Imagem enviada com sucesso!');
          return getDownloadURL(imageRef);
        })
        .then(url => {
          docPesquisa = {...docPesquisa, imageUrl: url};
        })
        .catch(error => {
          console.log('Erro ao enviar imagem: ', JSON.stringify(error));
        });
    }

    if (nomeSelecionado !== pesquisa.nome) {
      docPesquisa = {...docPesquisa, nome: nomeSelecionado};
    }

    if (dataSelecionada !== pesquisa.data) {
      docPesquisa = {...docPesquisa, data: dataSelecionada};
    }

    if (Object.keys(docPesquisa).length > 0) {
      updateDoc(pesqRef, docPesquisa)
        .then(docRef => {
          console.log('Documento atualizado com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao atualizar documento:', error);
        });
    }

    goToHome();
  };

  const deletaPesquisa = () => {
    const docRef = doc(db, 'pesquisas', pesquisa.id);

    if (pesquisa.imageUrl) {
      const imageRef = ref(storage, decodeURIComponent(pesquisa.imageUrl));

      deleteObject(imageRef)
        .then(() => {
          console.log('Imagem excluída com sucesso!');
          deleteDoc(docRef)
            .then(() => {
              console.log('Documento deletado com sucesso!');
              goToHome();
            })
            .catch(error => {
              console.error('Erro ao deletar documento:', error);
            });
        })
        .catch(error => {
          console.error('Erro ao excluir imagem:', error);
        });
    } else {
      deleteDoc(docRef)
        .then(() => {
          console.log('Documento deletado com sucesso!');
          goToHome();
        })
        .catch(error => {
          console.error('Erro ao deletar documento:', error);
        });
    }
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.cDados}>
        <Input
          texto={'Nome'}
          txt={nomeSelecionado}
          setTxt={setNomeSelecionado}
          color={'#3F92C5'}
          heightSize={35}
        />

        <Text
          style={{
            fontFamily: 'AveriaLibre-Regular',
            color: 'white',
            fontSize: 20,
          }}>
          Data
        </Text>
        <TouchableOpacity style={estilos.dataBtn} onPress={() => setOpen(true)}>
          <Text style={{fontFamily: 'AveriaLibre-Regular', color: '#000'}}>
            {dataSelecionada}
          </Text>
          <Icon
            style={estilos.calendario}
            name="calendar-month"
            size={30}
            color="#939393"
          />
        </TouchableOpacity>

        <DatePicker
          mode="date"
          modal
          open={open}
          date={new Date()}
          onConfirm={date => {
            setOpen(false);
            setDataSelecionada(formatarData(date));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <TouchableOpacity onPress={adicionarImagem} style={estilos.botaoImagem}>
          {urlFoto || pesquisaDados.imageUrl ? (
            <Image
              source={{uri: urlFoto || pesquisaDados.imageUrl}}
              style={{width: 70, height: 70}}
            />
          ) : (
            <Text>Câmera/Galeria de Imagens</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={estilos.cRodape}>
        <Botao texto="SALVAR" funcao={atualizarPesquisa} />
      </View>

      <View style={estilos.cApagar}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={estilos.apagar}>
            <Icon name="delete" size={30} color="#FFF" />
            <Text style={estilos.texto}>Apagar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={estilos.popCenter}>
          <View style={estilos.popUp}>
            <Text style={estilos.label}>
              Certeza que deseja apagar essa pesquisa?
            </Text>

            <View style={estilos.cBotoes}>
              <Pressable style={estilos.botao1} onPress={deletaPesquisa}>
                <Text style={estilos.textoBotao}>SIM</Text>
              </Pressable>

              <Pressable
                style={estilos.botao2}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={estilos.textoBotao}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  cApagar: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  cRodape: {
    width: '50%',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  apagar: {
    alignItems: 'center',
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
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
  popCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  popUp: {
    backgroundColor: '#2B1F5C',
    justifyContent: 'space-between',
    width: '40%',
    height: '40%',
    padding: 20,
  },
  cBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
  },
  botao1: {
    backgroundColor: '#FF8383',
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao2: {
    backgroundColor: '#3F92C5',
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cImagem: {
    width: 250,
    height: 90,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
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

export default ModificarPesquisa;
