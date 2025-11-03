import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ClienteData } from '../../types/ClienteData';
import { logout } from '../../utils/auth';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState<ClienteData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const isWeb = typeof window !== 'undefined';
        const dados = isWeb
          ? localStorage.getItem('clientes')
          : await AsyncStorage.getItem('clientes');

        console.log('Dados brutos de clientes:', dados);

        let lista: ClienteData[] = [];

        if (dados) {
          try {
            const parsed = JSON.parse(dados);
            if (Array.isArray(parsed)) {
              lista = parsed;
            } else {
              console.warn('Formato inválido de dados:', parsed);
            }
          } catch (jsonError) {
            console.error('Erro ao interpretar JSON:', jsonError);
          }
        }

        setClientes(lista);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setTimeout(() => setLoading(false), 300); // suaviza transição
      }
    };

    carregarClientes();
  }, []);

  const handleNovoCliente = () => {
    router.push('/cadastro');
  };

  const handleMenuPrincipal = () => {
    router.push('/menu');
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const handleImprimir = (cliente: ClienteData) => {
    console.log('Imprimir cliente:', cliente);
  };

  const handleCompartilhar = (cliente: ClienteData) => {
    const texto = `
Cliente: ${cliente.nome}
Telefone: ${cliente.telefone}
Endereço: ${cliente.endereco}, ${cliente.bairro}, ${cliente.cidade} - ${cliente.cep}
Entrada: ${cliente.entrada ? new Date(cliente.entrada).toLocaleDateString() : '—'}
Saída: ${cliente.saida ? new Date(cliente.saida).toLocaleDateString() : '—'}
Total: R$ ${cliente.total}
    `;
    console.log('Compartilhar:', texto);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando clientes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clientes Cadastrados</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newButton} onPress={handleNovoCliente}>
          <Text style={styles.buttonText}>NOVO CLIENTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPrincipal}>
          <Text style={styles.buttonText}>MENU PRINCIPAL</Text>
        </TouchableOpacity>
      </View>

      {clientes.length === 0 ? (
        <Text style={styles.empty}>Nenhum cliente cadastrado ainda.</Text>
      ) : (
        clientes.map((cliente, index) => (
          <View key={cliente.id ?? index.toString()} style={styles.card}>
            <Text style={styles.nome}>{cliente.nome ?? '—'}</Text>
            <Text>Telefone: {cliente.telefone ?? '—'}</Text>
            <Text>Endereço: {cliente.endereco ?? '—'}</Text>
            <Text>Bairro: {cliente.bairro ?? '—'}</Text>
            <Text>Cidade: {cliente.cidade ?? '—'}</Text>
            <Text>CEP: {cliente.cep ?? '—'}</Text>
            <Text>Entrada: {cliente.entrada ? new Date(cliente.entrada).toLocaleDateString() : '—'}</Text>
            <Text>Saída: {cliente.saida ? new Date(cliente.saida).toLocaleDateString() : '—'}</Text>
            <Text>Total de Dias: {cliente.dias ?? '—'}</Text>
            <Text>Qtde Peças: {cliente.qtde ?? '—'}</Text>
            <Text>Peças por Dia: {cliente.porDia ?? '—'}</Text>
            <Text>Valor Unitário: R$ {cliente.unitario ?? '—'}</Text>
            <Text>Valor Total: R$ {cliente.total ?? '—'}</Text>
            <Text style={styles.dataCadastro}>
              Cadastrado em: {cliente.dataCadastro ? new Date(cliente.dataCadastro).toLocaleString() : '—'}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleImprimir(cliente)}>
                <FontAwesome name="print" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCompartilhar(cliente)} style={{ marginLeft: 16 }}>
                <FontAwesome name="share-alt" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#6a4c93',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#c62828',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 4,
  },
  newButton: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  menuButton: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dataCadastro: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#6a4c93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
});