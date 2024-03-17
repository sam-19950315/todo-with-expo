import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="タスクの追加"
          value={task}
          returnKeyType="done"
          onSubmitEditing={addTask}
          onChangeText={(text) => setTask(text)}
        />
      </View>
      <SwipeListView
        data={tasks}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item}</Text>
          </View>
        )}
        renderHiddenItem={({ index }) => (
          <View style={styles.hiddenItemContainer}>
            <TouchableOpacity style={[styles.taskButton, styles.doneButton]}>
              <Icon name="done" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.taskButton, styles.deleteButton]}
              onPress={() => removeTask(index)}
            >
              <Icon name="delete" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 100,
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
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default registerRootComponent(App);
