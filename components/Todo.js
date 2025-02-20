import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checkbox from './checkbox';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Todo({

    id,
    text,
    isCompleted,
    isToday,
    hour
}) {
    const [localHour, setLocalHour] = React.useState(new Date(hour));
    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const handleDeleteTodo = async () => {
        dispatch(deleteTodoReducer(id));
        try {
            await AsyncStorage.setItem('Todos', JSON.stringify(
                todos.filter(todo => todo.id !== id)
            ));
            console.log('Todo deleted correctly');
        } catch (e) {
            console.log(e);
        }
    };
    return (

        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Checkbox
                id={id}
                text={text}
                isCompleted={isCompleted}
                isToday={isToday}
                hour={hour}
            />
            <View>
                <Text style={isCompleted ? [styles.text, { textDecorationLine: 'line-through', color: '#737373' }] : styles.text}>{text}</Text>
                <Text style={isCompleted ? [styles.time, { textDecorationLine: 'line-through', color: '#737373' }] : styles.time}>{moment(localHour).format('LT')}</Text>
            </View>
</View>

            <TouchableOpacity onPress={handleDeleteTodo}>
                <MaterialIcons name="delete-outline" size={24} color="#73737340" style={styles.delete} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",

    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#737373'
    },
    time: {
        fontSize: 13,
        color: '#a3a3a3',
        fontWeight: '500'
    }

})



