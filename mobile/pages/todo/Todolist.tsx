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

    // const [userData, setUserData] = useState([]);
    //     useEffect(() => {
    //     (async () => {
    //          const {data, status} = await axios.get('http://localhost:5000/api/users/get-data/')
    //             console.log('Data:', data)
    //         if (status === 200) {
    //             setUserData(data);
    //          }
    //    })();
    //  }, [])
    //  console.log('userData:', userData)


    const [todos, setTodos] = useState([])
    useEffect(() => {
       (async () => {
           const {data, status} = await httpService.get({url: `todos/tasks`})
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
                    pathname: './auth',
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
                    alignItems: 'center', justifyContent: 'center'
                }}>
                {/*<Button*/}
                {/*    onPress={redirect}*/}
                {/*    title="Create new Todo!"*/}
                {/*/>*/}
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                {/*<Button*/}
                {/*    onPress={() => handleAccDelete()}*/}
                {/*    title="Exit account"*/}
                {/*/>*/}
                    </View>
                </View>

                <View style={styles.formContainer}>
                    {todos.map((todo, index) =>

                    <View key={index} style={{flexDirection: 'row'}}>
                    <View style={{ borderTopColor: '#fff',
                        borderTopWidth: 2,
                        marginLeft: 0,paddingTop: 19, paddingBottom: 19, flexDirection: 'row', justifyContent:'space-evenly'}}>

                        <View>
                        <Text style={{fontSize: 17, fontWeight: 'bold',         color: '#fff'
                        }}>
                            {todo.title}
                        </Text>

                        <Text style={{color: '#fff'}}>
                            {todo.description}
                        </Text>

                        <Text style={{fontSize: 11, color: '#fff'}}>
                           🕔 {todo.time} min to read
                        </Text>
                        </View>




                        <View style={{flexDirection: 'row', paddingTop: 19, paddingLeft: -39,  color: '#fff' }}>
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




                    {/*<View style={{flexDirection: 'row', paddingTop: 19, paddingLeft: -39}}>*/}
                    {/*    <Text*/}
                    {/*        style={styles.edit}*/}
                    {/*        onPress={() => handleEdit(todo._id)}*/}
                    {/*    >*/}
                    {/*        Edit*/}
                    {/*    </Text>*/}
                    {/*    <Text*/}
                    {/*        style={styles.edit}*/}
                    {/*        onPress={() => handleDelete(todo)}*/}
                    {/*    >*/}
                    {/*        Delete*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
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
        paddingTop: 10,
        color: '#fff'



    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: '#fff'



    },

    edit: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 0,
        color: '#fff'

    }



})