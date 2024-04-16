import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  const [data, setData] = useState('Nenhum dado recebido ainda.'); // Estado inicial

  const fetchData = async () => {
    console.log('fetchData está sendo chamada');
    try {
      const meuToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtIiwibmFtZSI6ImFtcGljIiwiQVBJX1RJTUUiOjE3MTAyODkyNzV9.zowHR-57mbOZThYG5XbJzk9iklCDfHt9Tg7RYDACsRQ'; // Substitua com o seu token real
      console.log(`Token = ${meuToken}`);
      const url = 'https://atendimento.ampic.ong.br/api/customers/25'; // Substitua com a URL correta
      console.log(`Fazendo solicitação GET para a URL: ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authtoken: meuToken,
        },
      });
      console.log('Resposta recebida', response);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const responseData = await response.json();
      setData(JSON.stringify(responseData, null, 2)); // Formata e armazena os dados recebidos no estado
    } catch (error) {
      console.error(`${error}`);
      setData(`Erro ao buscar dados: ${error}`); // Armazena a mensagem de erro no estado, para exibição
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Recuperar Dados" onPress={fetchData} />
      <Text style={styles.dataText}>{data}</Text>
      {/* Exibe os dados ou o erro na tela */}
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dataText: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
});

export default App;
