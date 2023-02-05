import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import TheatreLayout from './components/TheatreLayout';
import { SeatsContext } from './context/context';

export default function App() {
  return (
    <SeatsContext>
      <SafeAreaView style={styles.container}>
        <View style={styles.child}>
          <Text style={styles.title}>Screen Here</Text>
        </View>
        <TheatreLayout rows={3} columns={5} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SeatsContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  child: {
    flex: 1,
    backgroundColor: '#588157',
    justifyContent: 'center',

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
});
