import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const App = () => {
  const [task, setTask] = useState({ name: '' });
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.name.trim() !== '') {
      setTasks([...tasks, task]);
      setTask({ name: '' });
    }
  };

  const handleEditTask = (index, newName) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = newName;
    setTasks(updatedTasks);
  };

  const onPressActionOptions = (index) => {
    const update = () => {
      if (tasks[index].isCompleted) {
        return '未完了に元に戻す';
      } else {
        return '完了しました';
      }
    };

    Alert.alert(`${tasks[index].name}`, '', [
      {
        text: update(),
        style: 'cancel',
        onPress: () => handleUpdateTask(index),
      },
      {
        text: '削除します',
        style: 'destructive',
        onPress: () => onPressRemoveAlert(index),
      },
      {
        text: 'キャンセル',
        style: 'cancel',
      },
    ]);
  };

  const handleUpdateTask = (index) => {
    setTasks((prevTasks) => {
      return prevTasks.map((item, i) => {
        if (i === index) {
          return { ...item, isCompleted: !item.isCompleted };
        } else {
          return item;
        }
      });
    });
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const onPressRemoveAlert = (index) => {
    Alert.alert(`${tasks[index].name}`, `を本当に削除しますか？`, [
      {
        text: 'いいえ',
        style: 'cancel',
      },
      { text: 'はい', onPress: () => handleRemoveTask(index) },
    ]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.taskItem}>
        <View style={styles.taskItemList}>
          {tasks[index].isCompleted ? (
            <Text style={styles.doneTaskItem}>{item.name}</Text>
          ) : (
            <TextInput
              style={styles.inputTaskItem}
              value={item.name}
              onChangeText={(newName) => handleEditTask(index, newName)}
            />
          )}
        </View>
        <View>
          <TouchableOpacity onPress={() => onPressActionOptions(index)}>
            <Icon style={styles.actionButton} name="more-horiz" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
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
            onSubmitEditing={handleAddTask}
            onChangeText={(text) => setTask({ name: text, isCompleted: false })}
          />
        </View>
        <FlatList data={tasks} renderItem={renderItem} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskItemList: {
    flex: 1,
  },
  doneTaskItem: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  inputTaskItem: {
    flexGrow: 1,
    width: '100%',
  },
  actionButton: {
    padding: 10,
  },
});

export default registerRootComponent(App);
