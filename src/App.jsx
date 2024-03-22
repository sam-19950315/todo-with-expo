import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

const App = () => {
  const [task, setTask] = useState({ name: '' });
  const [tasks, setTasks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const addTask = () => {
    if (task.name.trim() !== '') {
      setTasks([...tasks, task]);
      setTask({ name: '' });
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
            onChangeText={(text) => setTask({ name: text, isCompleted: false })}
          />
        </View>
        <SwipeListView
          data={tasks}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.taskItem}>
              <Text style={isCompleted ? styles.doneTaskItem : null}>{item.name}</Text>
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
