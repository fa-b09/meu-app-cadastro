 import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuPrincipal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>

      <TouchableOpacity style={styles.buttonCadastro} onPress={() => router.push('/cadastro')}>
        <Text style={styles.buttonText}>Cadastrar Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonClientes} onPress={() => router.push('/clientes')}>
        <Text style={styles.buttonText}>Ver Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSair} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6a4c93',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  buttonCadastro: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  buttonClientes: {
    backgroundColor: '#512da8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  buttonSair: {
    backgroundColor: '#c62828',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});