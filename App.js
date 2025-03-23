import { StatusBar } from "expo-status-bar";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
} from "react-native";
import { useCollection } from "react-firebase-hooks/firestore";
import { ImagePicker } from "expo-image-picker";

export default function App() {
  const [text, setText] = useState("");
  const [editObj, setEditObj] = useState(null);
  const [values] = useCollection(collection(db, "notes"));
  const data = values?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  async function buttonHandler() {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, "notes"), { text });
      setText("");
    } catch (er) {
      console.log(er);
    }
  }

  async function deleteDocument(id) {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.log(error + "Error deleting document");
    }
  }

  function updateDocument(item) {
    setEditObj(item);
    setText(item.text);
  }

  async function saveUpdate() {
    if (!text.trim()) return;
    await updateDoc(doc(db, "notes", editObj.id), { text });
    setText("");
    setEditObj(null);
  }

  async function launchImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.canceled) {
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      {editObj && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.TextInput}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveUpdate}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={styles.TextInput}
        value={text}
        onChangeText={setText}
        placeholder="Write a note..."
      />
      <TouchableOpacity style={styles.addButton} onPress={buttonHandler}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => updateDocument(item)}>
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDocument(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity>
        <Text style={styles.buttonText}>Picker image</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  TextInput: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  noteItem: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
