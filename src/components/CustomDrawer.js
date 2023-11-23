import {View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      {...props}>
      <View>
        <View style={estilos.cTitulo}>
          <Text style={estilos.texto}>{props.email}</Text>
        </View>

        <View style={estilos.borda}></View>

        <DrawerItemList {...props} />
      </View>

      <DrawerItem
        icon={() => <Icon name="exit-to-app" size={30} color="#FFF" />}
        label="Sair"
        labelStyle={{
          color: '#FFF',
          fontFamily: 'AveriaLibre-Regular',
          fontSize: 20,
          marginLeft: -25,
        }}
        onPress={props.funcao}
      />
    </DrawerContentScrollView>
  );
};

const estilos = StyleSheet.create({
  cTitulo: {
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
  },
  borda: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default CustomDrawer;
