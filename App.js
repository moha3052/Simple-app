import { StatusBar } from 'expo-status-bar';
import { collection, addDoc } from 'firebase/firestore';
import { app, db} from './firebase'
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View, FlatList, Text } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function App() {

  const [text, setText] = useState('');
  const [notes, setNotes] = useState([])
  const [values, loading, error] = useCollection(collection(db, "notes"))
  const data = values?.docs.map((doc) => ({ id: doc.id, ...doc.data()}))

  

  async function buttonHandler(){
    try{
    await addDoc(collection(db, "notes"),{
      text: text,
    })
    }catch(er){
      console.log(er)
    }
  }


  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput} onChangeText={(text => setText(text))}/>
      <Button title="Press me" onPress={buttonHandler} />
      <FlatList
      data={data}
      renderItem={(note) => <Text>{note.item.text}</Text>}/>
      <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5', // Lys grå baggrund for moderne look
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80, // Sæ
  },
  TextInput: {
    backgroundColor: '#d9e4ec', // Blød blågrå farve
    width: 300,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8, // Afrundede hjørner
    borderWidth: 1,
    borderColor: '#b0c4de', // Let skyggeeffekt
    fontSize: 16,
  }
});
