import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import TodoList from '../components/todolist';
import { todoData } from '../data/todos';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch} from 'react-redux';


export default function Home() {
    const todos = useSelector(state => state.todos.todos);
    /* const[localData,setLocalData]=React.useState(
        todoData.sort((a,b)=>{return a.isCompleted - b.isCompleted})
    ); */
    const [isHidden, setHidden]=React.useState(false);
    const navigation=useNavigation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        const getTodos = async () => {
        try {
        const todos = await AsyncStorage.getItem("@Todos"); 
        if(todos !== null) {
        dispatch(setTodosReducer (JSON.parse(todos)));

        }
        }catch (e) {
        console.log(e);
        }
        }
        getTodos();
        }, []);

        const handletHidePress = async () => {
            if (isHidden) {
                setHidden(false);
                const todos = await AsyncStorage.getItem('Todos');
                if(todos !== null){
                    dispatch(setTodosReducer(JSON.parse(todos)));
                }
                return;
            }
            setHidden(!isHidden);
            dispatch(hideComplitedReducer());
        }

return (
    <View style={styles.container}>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handletHidePress}>
        <Text style={{color: "#3478f6"}}>Hide completed</Text>
        </TouchableOpacity>
        </View>

        <TodoList todoData={todos.filter(todo=>todo.isToday)}/>

        <Text style={styles.title}>Tomorrow</Text>
        <TodoList todoData={todos.filter(todo=>!todo.isToday)}/>

        <TouchableOpacity onPress={()=>navigation.navigate("Add")} style={styles.button}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        
    </View>
);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    pic: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignSelf: 'flex-end'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#000', 
        position: 'absolute', 
        bottom: 50,
        right: 15,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
        },
        plus: {
        fontSize: 40,
        color: '#fff',
        position: 'absolute',
        top: -7,
        left: 10,
        }
});
