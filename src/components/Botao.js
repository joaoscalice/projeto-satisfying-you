import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Botao = (props) => {

    const texto = props.texto;

    return (
        <TouchableOpacity style={estilos.botaoPadrao} onPress={props.funcao}>
            <Text style={estilos.textoBotao}>{texto}</Text>
        </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({
    textoBotao: {
        color: '#FFF',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'AveriaLibre-Regular'
      },
      botaoPadrao: {
        padding: 3,
        backgroundColor: '#37BD6D',
        marginTop: 10
      }
})

export default Botao;