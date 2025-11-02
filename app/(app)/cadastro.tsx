import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { ClienteData } from '../types/ClienteData';

// @ts-ignore: Permite usar input HTML puro no React Native Web
const InputDate = (props: any) => <input {...props} />;

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [qtde, setQtde] = useState('');
  const [unitario, setUnitario] = useState('');
  const [entradaTexto, setEntradaTexto] = useState('');
  const [saidaTexto, setSaidaTexto] = useState('');
  const [entrada, setEntrada] = useState<Date | null>(null);
  const [saida, setSaida] = useState<Date | null>(null);
  const [dias, setDias] = useState('');
  const [porDia, setPorDia] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    const qtdeNum = Number(qtde);
    const unitNum = Number(unitario);
    const totalCalc = qtdeNum * unitNum;
    setTotal(totalCalc ? totalCalc.toFixed(2) : '');

    if (entrada && saida) {
      const diff = (saida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24);
      const diasFormatado = diff > 0 ? diff.toFixed(0) : '0';
      setDias(diasFormatado);

      const porDiaCalc = diff > 0 ? (qtdeNum / diff).toFixed(2) : '';
      setPorDia(porDiaCalc);
    }
  }, [qtde, unitario, entrada, saida]);

  const handleSalvar = async () => {
    const entradaDate = entradaTexto ? new Date(entradaTexto) : null;
    const saidaDate = saidaTexto ? new Date(saidaTexto) : null;

    if (
      !nome || !endereco || !bairro || !cidade || !cep ||
      !telefone || !qtde || !unitario || !entradaDate || !saidaDate
    ) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setEntrada(entradaDate);
    setSaida(saidaDate);

    const novoCliente: ClienteData = {
      id: Date.now().toString(),
      nome,
      endereco,
      bairro,
      cidade,
      cep,
      telefone,
      entrada: entradaDate.toISOString(),
      saida: saidaDate.toISOString(),
      qtde,
      porDia,
      unitario,
      total,
      dias,
      dataCadastro: new Date().toISOString(),
      dataAlteracao: new Date().toISOString(),
    };

    try {
      const dados = await AsyncStorage.getItem('clientes');
      const lista = dados ? JSON.parse(dados) : [];
      lista.push(novoCliente);
      await AsyncStorage.setItem('clientes', JSON.stringify(lista));
      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
      router.push('/clientes');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const handleClear = () => {
    setNome('');
    setEndereco('');
    setBairro('');
    setCidade('');
    setCep('');
    setTelefone('');
    setQtde('');
    setUnitario('');
    setEntradaTexto('');
    setSaidaTexto('');
    setEntrada(null);
    setSaida(null);
    setDias('');
    setPorDia('');
    setTotal('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Clientes</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nome*</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Endereço*</Text>
        <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Bairro*</Text>
        <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Cidade*</Text>
        <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CEP*</Text>
        <TextInput style={styles.input} value={cep} onChangeText={setCep} keyboardType="numeric" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Telefone*</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Data Entrada*</Text>
        <InputDate
          type="date"
          value={entradaTexto}
          onChange={(e: any) => {
            setEntradaTexto(e.target.value);
            setEntrada(new Date(e.target.value));
          }}
          style={styles.inputWeb}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Data Saída*</Text>
        <InputDate
          type="date"
          value={saidaTexto}
          onChange={(e: any) => {
            setSaidaTexto(e.target.value);
            setSaida(new Date(e.target.value));
          }}
          style={styles.inputWeb}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Qtde Peças*</Text>
        <TextInput
          style={styles.input}
          value={qtde}
          onChangeText={setQtde}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Valor Unitário*</Text>
        <TextInput
          style={styles.input}
          value={unitario}
          onChangeText={setUnitario}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Total de Dias</Text>
        <TextInput style={styles.input} value={dias} editable={false} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Peças por Dia</Text>
        <TextInput style={styles.input} value={porDia} editable={false} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Valor Total</Text>
        <TextInput style={styles.input} value={total} editable={false} />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Salvar" onPress={handleSalvar} />
        <Button title="Limpar" onPress={handleClear} color="#888" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#6a4c93',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    marginBottom: 12,
  },
  label: {
    color: '#fff',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputWeb: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});