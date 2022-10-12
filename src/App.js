import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View, 
  Text, 
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import 'react-native-url-polyfill/auto';
import { Thumbs } from './components/Thumbs';
import {useNetInfo} from "@react-native-community/netinfo";
import { ImageView } from './components/ImageView';

export default function App() {
  const [selectedImg, setSelectedImg] = useState('');
  const [page, setPage] = useState(1);
  const netInfo = useNetInfo();
  
  if (netInfo.isConnected === false) {
    Alert.alert(
      'No internet connection', 
      'Try checking your wifi',
      [
        { text: "OK"}
      ]);
    return (
      <View style={styles.viewError}>
        <Text style={styles.errorText}>No Internet Conection</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <StatusBar 
        animated={true}
        backgroundColor="#212121"
      />
      {selectedImg && <ImageView selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
      <Thumbs setSelectedImg={setSelectedImg} page={page}/>
      <View style={styles.buttonView}>
        <View style={styles.pageButton}>
          <Button title='<' onPress={() => {
            if (page <= 1) {
              setPage(1);
            } else {
              setPage(prev => prev - 1);
            }
          }} 
        />
        </View>
        <View style={styles.pageButton}>
          <Button title='>' onPress={() => setPage(prev => prev + 1)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#212121',
  },
  errorText: {
    fontSize: 30,
    color: '#fff',
  },
  viewError: {
    backgroundColor: '#212121',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    minWidth: "50%",
  }
});
