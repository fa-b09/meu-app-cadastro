import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClienteData } from '../types/ClienteData';

export const salvarCliente = async (cliente: ClienteData) => {
  const dados = await AsyncStorage.getItem('clientes');
  const lista = dados ? JSON.parse(dados) : [];
  lista.push(cliente);
  await AsyncStorage.setItem('clientes', JSON.stringify(lista));
};

export const buscarClientes = async (): Promise<ClienteData[]> => {
  const dados = await AsyncStorage.getItem('clientes');
  return dados ? JSON.parse(dados) : [];
};

export const editarCliente = async (id: string, novosDados: Partial<ClienteData>) => {
  const dados = await AsyncStorage.getItem('clientes');
  const lista = dados ? JSON.parse(dados) : [];
  const atualizada = lista.map((c: ClienteData) =>
    c.id === id ? { ...c, ...novosDados, dataAlteracao: new Date().toISOString() } : c
  );
  await AsyncStorage.setItem('clientes', JSON.stringify(atualizada));
};

export const excluirCliente = async (id: string) => {
  const dados = await AsyncStorage.getItem('clientes');
  const lista = dados ? JSON.parse(dados) : [];
  const filtrada = lista.filter((c: ClienteData) => c.id !== id);
  await AsyncStorage.setItem('clientes', JSON.stringify(filtrada));
};

export const limparTodosClientes = async () => {
  await AsyncStorage.removeItem('clientes');
};