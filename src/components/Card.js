import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Card = props => {
  return (
    <TouchableOpacity onPress={props.funcao} style={estilos.card}>
      <Image
        source={{uri: props.urlImagem}}
        style={{width: 120, height: 100}}
      />
      <Text style={estilos.titulo}>{props.titulo}</Text>
      <Text style={estilos.data}>{props.data}</Text>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  card: {
    width: 210,
    height: 180,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 10,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#3F92C5',
    fontSize: 30,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    paddingTop: 5,
  },
  data: {
    color: '#8B8B8B',
    fontSize: 15,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});

export default Card;
