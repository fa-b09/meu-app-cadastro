import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = typeof window !== 'undefined';

export const login = async (username: string): Promise<void> => {
  if (isWeb) {
    localStorage.setItem('usuarioLogado', username);
  } else {
    await AsyncStorage.setItem('usuarioLogado', username);
  }
};

export const logout = async (): Promise<void> => {
  if (isWeb) {
    localStorage.removeItem('usuarioLogado');
  } else {
    await AsyncStorage.removeItem('usuarioLogado');
  }
};

export const isLoggedIn = async (): Promise<boolean> => {
  if (isWeb) {
    const user = localStorage.getItem('usuarioLogado');
    return Boolean(user);
  } else {
    const user = await AsyncStorage.getItem('usuarioLogado');
    return Boolean(user);
  }
};