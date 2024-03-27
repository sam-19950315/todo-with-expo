import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  const handleDragEnd = ({ data }) => {
    setTasks(data);
  };

  const handleAddTask = () => {
    if (editedTaskName.trim() !== '') {
      const taskId = tasks.length + 1;
      const newTask = { id: taskId, name: editedTaskName, isCompleted: false };
      setTasks([...tasks, newTask]);
      setEditedTaskName('');
    }
  };

  const handleEditTask = (id, newName) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, name: newName };
        } else {
          return task;
        }
      });
    });
  };

  const onPressActionOptions = (id) => {
    const task = tasks.find(task => task.id === id);
    const update = () => {
      return task.isCompleted ? '未完了に元に戻す' : '完了しました';
    };

    Alert.alert(`${task.name}`, '', [
      {
        text: update(),
        style: 'cancel',
        onPress: () => handleUpdateTask(id),
      },
      {
        text: '削除します',
        style: 'destructive',
        onPress: () => onPressRemoveAlert(id),
      },
      {
        text: 'キャンセル',
        style: 'cancel',
      },
    ]);
  };

  const handleUpdateTask = (id) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        } else {
          return task;
        }
      });
    });
  };

  const handleRemoveTask = (id) => {
    setTasks(prevTasks => {
      return prevTasks.filter(task => task.id !== id);
    });
  };

  const onPressRemoveAlert = (id) => {
    const task = tasks.find(task => task.id === id);
    Alert.alert(`${task.name}`, `を本当に削除しますか？`, [
      {
        text: 'いいえ',
        style: 'cancel',
      },
      { text: 'はい', onPress: () => handleRemoveTask(id) },
    ]);
  };

  const handleEditPress = (taskId, taskName) => {
    setEditingTask(taskId);
    setEditedTaskName(taskName);
  };

  const handleEditSubmit = () => {
    if (editedTaskName.trim() !== '') {
      handleEditTask(editingTask, editedTaskName);
      setEditingTask(null);
      setEditedTaskName('');
    }
  };

  const TaskItem = ({ item, onLongPress, onPressAction }) => {
    return (
      <TouchableOpacity onLongPress={onLongPress}>
        <View style={styles.row}>
          {editingTask === item.id ? (
            <TextInput
              style={styles.taskItemList}
              value={editedTaskName}
              onChangeText={setEditedTaskName}
              autoFocus={true}
              onBlur={handleEditSubmit}
            />
          ) : (
            <TouchableOpacity onPress={() => handleEditPress(item.id, item.name)}>
              <Text style={styles.taskItemList}>{item.name}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onPressAction(item.id)}>
            <Icon style={styles.actionButton} name="more-horiz" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <GestureHandlerRootView style={{ flex: 1 }}>
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
                value={editedTaskName}
                onChangeText={setEditedTaskName}
                onSubmitEditing={handleAddTask}
              />
            </View>
            <DraggableFlatList
              data={tasks}
              renderItem={({ item, drag }) => 
                <TaskItem
                  item={item}
                  onLongPress={drag}
                  onPressAction={onPressActionOptions}
                />
              }
              keyExtractor={(item) => `${item.id}`}
              onDragEnd={handleDragEnd}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskItemList: {
    flex: 1,
    fontSize: 16,
  },
  actionButton: {
    padding: 10,
  },
});

export default registerRootComponent(App);
