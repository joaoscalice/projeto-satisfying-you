import { Text, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
        
    return (
        <>
            <Text style={estilos.texto}>{props.texto}</Text>
            <TextInput style={estilos.textInput} value={props.txt} onChangeText={props.setTxt} 
            placeholder={props.placeholder} placeholderTextColor={props.color}  color={props.textColor}
            height={props.heightSize} width={props.widthSize}/>
        </>
    )
}

const estilos = StyleSheet.create({
    texto: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'AveriaLibre-Regular',
        paddingBottom: 2,
        paddingTop: 3
    },
    textInput: {
        backgroundColor: '#FFF',
        height: 35,
        fontFamily: 'AveriaLibre-Regular',
        justifyContent: 'center'
    }
})

export default Input;
