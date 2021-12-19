import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SessionStore from '../stores/session.store';
import LoginScreen from '../screens/login/login.screen';
import TabAdminBar from './tab-admin-bar';
import TabEmpleadoBar from './tab-empleado-bar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import RegistrarUsuarioScreen from '../screens/usuarios/registrar-usuario.screen';
import ConsultarUsuariosScreen from '../screens/usuarios/consultar-usuarios.screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabJefeBar from './tab-jefe-bar';
import PerfilUsuarioScreen from '../screens/usuarios/perfil-usuario.screen';

//Navegación para el usuario que no está logueado.
const AuthStackNav = createStackNavigator();
//Navegación general para la app de acuerdo a si el usuario está logueado o no.
const RootStackNav = createStackNavigator();
//Navegación para CRUD de usuarios y Home para usuario logueado.
const AppDrawerNav = createDrawerNavigator();

function logout() {
  SessionStore.logout();
}

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        labelStyle={{ color: '#FFFFFF' }}
        onPress={logout}
        // eslint-disable-next-line react/jsx-no-bind
        icon={() => <MaterialIcons name="logout" color={'#FFFFFF'} size={26} />}
      />
    </DrawerContentScrollView>
  );
}

const AppDrawer = () => {
  return (
    <AppDrawerNav.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#b45309',
      }}
      // eslint-disable-next-line react/jsx-no-bind
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        contentContainerStyle: { backgroundColor: '#b45309' },
        labelStyle: { color: '#FFFFFF' },
      }}>
      {SessionStore.role === 'admin' && (
        <AppDrawerNav.Screen
          name="Home"
          component={TabAdminBar}
          options={{
            // eslint-disable-next-line react/display-name
            drawerIcon: () => (
              <Ionicons name="home" color={'#FFFFFF'} size={26} />
            ),
          }}
        />
      )}
      {SessionStore.role === 'jefe' && (
        <AppDrawerNav.Screen
          name="Home"
          component={TabJefeBar}
          options={{
            // eslint-disable-next-line react/display-name
            drawerIcon: () => (
              <Ionicons name="home" color={'#FFFFFF'} size={26} />
            ),
          }}
        />
      )}
      {SessionStore.role === 'empleado' && (
        <AppDrawerNav.Screen
          name="Home"
          component={TabEmpleadoBar}
          options={{
            // eslint-disable-next-line react/display-name
            drawerIcon: () => (
              <Ionicons name="home" color={'#FFFFFF'} size={26} />
            ),
          }}
        />
      )}
      <AppDrawerNav.Screen
        name="Perfil de usuario"
        component={PerfilUsuarioScreen}
        options={{
          // eslint-disable-next-line react/display-name
          drawerIcon: () => (
            <Ionicons name="person" color={'#FFFFFF'} size={26} />
          ),
        }}
      />
      {SessionStore.role === 'admin' && (
        <>
          <AppDrawerNav.Screen
            name="Registrar usuario"
            component={RegistrarUsuarioScreen}
            options={{
              // eslint-disable-next-line react/display-name
              drawerIcon: () => (
                <Ionicons name="person-add" color={'#FFFFFF'} size={26} />
              ),
            }}
          />
          <AppDrawerNav.Screen
            name="Consultar usuarios"
            component={ConsultarUsuariosScreen}
            options={{
              // eslint-disable-next-line react/display-name
              drawerIcon: () => (
                <FontAwesome name="users" color={'#FFFFFF'} size={26} />
              ),
            }}
          />
        </>
      )}
    </AppDrawerNav.Navigator>
  );
};

const AuthStack = () => {
  return (
    <AuthStackNav.Navigator initialRouteName="Login">
      <AuthStackNav.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </AuthStackNav.Navigator>
  );
};

const RootStack = (props: any) => {
  return (
    <RootStackNav.Navigator>
      {props.isLoggedIn ? (
        <Fragment>
          <RootStackNav.Screen
            options={{ headerShown: false }}
            name="App"
            component={AppDrawer}
          />
        </Fragment>
      ) : (
        <Fragment>
          <RootStackNav.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={AuthStack}
          />
        </Fragment>
      )}
    </RootStackNav.Navigator>
  );
};

export default RootStack;
