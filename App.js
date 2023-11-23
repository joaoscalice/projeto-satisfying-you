import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import NovaConta from './src/screens/NovaConta';
import RecuperarSenha from './src/screens/RecuperarSenha';
import Home from './src/screens/Home';
import NovaPesquisa from './src/screens/NovaPesquisa';
import AcoesPesquisa from './src/screens/AcoesPesquisa';
import ModificarPesquisa from './src/screens/ModificarPesquisa';
import Relatorio from './src/screens/Relatorio';
import Coleta from './src/screens/Coleta';
import Agradecimento from './src/screens/Agradecimento';
import Drawer from './src/screens/Drawer';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTintColor: '#372775',
            headerTitleStyle: {
              color: '#FFF',
              fontFamily: 'AveriaLibre-Regular',
              fontSize: 30,
            },
            headerStyle: {backgroundColor: '#2B1D62'},
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Drawer"
            component={Drawer}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="NovaConta"
            component={NovaConta}
            options={{title: 'Nova Conta'}}
          />
          <Stack.Screen
            name="NovaPesquisa"
            component={NovaPesquisa}
            options={{title: 'Nova Pesquisa'}}
          />
          <Stack.Screen
            name="AcoesPesquisa"
            component={AcoesPesquisa}
            options={{title: 'Ações de Pesquisa'}}
          />
          <Stack.Screen
            name="ModificarPesquisa"
            component={ModificarPesquisa}
            options={{title: 'Modificar Pesquisa'}}
          />
          <Stack.Screen
            name="RecuperarSenha"
            component={RecuperarSenha}
            options={{title: 'Recuperação de senha'}}
          />
          <Stack.Screen
            name="Relatorio"
            component={Relatorio}
            options={{title: 'Relatório'}}
          />
          <Stack.Screen
            name="Coleta"
            component={Coleta}
            options={{headerShown: false, title: 'Coleta'}}
          />
          <Stack.Screen
            name="Agradecimento"
            component={Agradecimento}
            options={{headerShown: false, title: 'Agradecimento'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
