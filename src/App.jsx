import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

const App = () => {
  const [task, setTask] = useState({ name: '', isPressed: false });
  const [tasks, setTasks] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

  const addTask = () => {
    if (task.name.trim() !== '') {
      setTasks([...tasks, task.name]);
      setTask({ name: '', isPressed: false });
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handlePress = (index) => {
    console.log(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.editText}>並べ替え</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="タスクの追加"
            value={task.name}
            returnKeyType="done"
            onSubmitEditing={addTask}
            onChangeText={(text) => setTask({ name: text })}
          />
        </View>
        <SwipeListView
          data={tasks}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={isPressed ? styles.doneTaskItem : null}>{item}</Text>
            </View>
          )}
          renderHiddenItem={({ index }) => (
            <View style={styles.hiddenItemContainer}>
              <TouchableOpacity
                style={[styles.taskButton, styles.doneButton]}
                onPress={handlePress(index)}
              >
                <Icon name="done" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.taskButton, styles.editButton]}>
                <Icon name="edit" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.taskButton, styles.deleteButton]}
                onPress={() => removeTask(index)}
              >
                <Icon name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-120}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'skyblue',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 10,
  },
  editText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
  },
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  taskItem: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 50,
  },
  doneTaskItem: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  taskButton: {
    padding: 10,
  },
  doneButton: {
    backgroundColor: 'gray',
  },
  editButton: {
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default registerRootComponent(App);
