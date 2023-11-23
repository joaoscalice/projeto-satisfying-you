import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const DrawerNavigator = createDrawerNavigator();

const Drawer = props => {
  const email = useSelector(state => state.login.email);

  const dispatch = useDispatch();

  const deslogar = () => {
    dispatch({type: 'login/reducerLogout'});

    props.navigation.popToTop();
  };

  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#2B1D62'},
        headerTintColor: '#FFF',
        headerTitle: '',
        drawerActiveBackgroundColor: '#2B1D62',
        drawerActiveTintColor: '#FFF',
        drawerStyle: {backgroundColor: '#2B1D62', width: '30%'},
      }}
      drawerContent={props => (
        <CustomDrawer {...props} email={email} funcao={deslogar} />
      )}>
      <DrawerNavigator.Screen
        options={{
          drawerIcon: () => (
            <Icon name={'document-text-outline'} size={30} color={'#FFF'} />
          ),
          drawerLabelStyle: {
            marginLeft: -25,
            color: '#FFF',
            fontFamily: 'AveriaLibre-Regular',
            fontSize: 20,
          },
        }}
        name="Pesquisas"
        component={Home}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
