import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username: string) => {
  await AsyncStorage.setItem('usuarioLogado', username);
};

export const logout = async () => {
  await AsyncStorage.removeItem('usuarioLogado');
};

export const isLoggedIn = async (): Promise<boolean> => {
  const user = await AsyncStorage.getItem('usuarioLogado');
  return !!user;
};