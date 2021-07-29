import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native'
import { useHistory } from 'react-router-dom';
import httpService from "../../services/http.service";
import axios from "axios";



const TodoList = () => {

    let history = useHistory();

    const redirect = () => {
        history.push({
            pathname: './create-todo',
        })
    }

    const handleEdit = (id) => {
        history.push(`/edit-todo/${id}`)
    }

    // const [userData, setUserData] = useState([]);
    // useEffect(() => {
    //     (async () => {
    //         const {data, status} = await httpService.get({url: `users/user-data`})
    //         if (status === 200) {
    //             setUserData(data);
    //         }
    //     })();
    // }, [])
    // console.log(userData)

    const [userData, setUserData] = useState([]);
        useEffect(() => {
        (async () => {
             const {data, status} = await axios.get('http://localhost:5000/api/users/get-data/')
                console.log('Data:', data)
            if (status === 200) {
                setUserData(data);
             }
       })();
     }, [])
     console.log('userData:', userData)


    const [todos, setTodos] = useState([])
    useEffect(() => {
       (async () => {
           const {data, status} = await httpService.get({url: `todos/`})
           if (status === 200) {
               setTodos(data);
           }
       })();
    }, [])
    console.log('todos:', todos)





    const handleDelete =  (todo: { _id: string; }) => {
        console.log(todo)
             httpService.delete({url :`todos/${todo._id}`})
                .then(res => {
        console.log(res);
            if (res.status === 200) {
                console.log({todos});
                const filteredList = todos.filter(item => item["_id"] !== res.data.id);
                setTodos(filteredList);
            }
        })
    }

    const handleAccDelete =  (user: { _id: string; }) => {
        console.log(user)
        httpService.delete({url :`users/`})
            .then(res => {
                localStorage.removeItem('token');
                history.push({
                    pathname: './',
                })

                console.log(res);
                if (res.status === 200) {
                    console.log({todos});
                }
            })
    }




    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    width: 340,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <Button
                    onPress={redirect}
                    title="Create new Todo!"
                />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text> Data: {userData} </Text>
                <Button
                    onPress={() => handleAccDelete()}
                    title="Exit account"
                />
                    </View>
                </View>

                <View style={styles.formContainer}>
                    {todos.map((todo, index) =>

                    <View key={index} style={{flexDirection: 'row'}}>
                    <View style={{width: 350, marginRight: 40, borderTopColor: '#aeaeae',
                        borderTopWidth: 2,
                        marginLeft: 0,paddingTop: 19, paddingBottom: 19}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                            {todo.title}, {todo.year}
                        </Text>

                        <Text>
                            {todo.description}
                        </Text>

                        <Text style={{fontSize: 11}}>
                            {todo.isCompleted ? 'Completed' : 'Not completed'},{todo.isPrivate ? 'Private' : 'Not Private' }
                        </Text>

                    </View>




                    <View style={{flexDirection: 'row', paddingTop: 19}}>
                        <Text
                            style={styles.edit}
                            onPress={() => handleEdit(todo._id)}
                        >
                            Edit
                        </Text>
                        <Text
                            style={styles.edit}
                            onPress={() => handleDelete(todo)}
                        >
                            Delete
                        </Text>
                    </View>
                    </View>
                    )}
                </View>


                <View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default TodoList;



const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#aeaeae',
        padding: 20,
        margin: 20,
        height: 600,
        width: 800

    },

    formContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 15,
        margin: 10,

    },

    edit: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 0
    }



})