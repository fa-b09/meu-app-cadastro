import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { isLoggedIn, login } from '../utils/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verificarLogin = async () => {
      const logado = await isLoggedIn();
      if (logado) router.replace('/clientes');
    };
    verificarLogin();
  }, []);

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Preencha todos os campos.');
      return;
    }

    if (username !== 'admin' || password !== '1234') {
      setError('Usuário ou senha inválidos.');
      return;
    }

    await login(username);
    router.replace('/clientes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#e0e0e0' },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 12, marginBottom: 12, borderRadius: 4, borderWidth: 1, borderColor: '#ccc' },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});