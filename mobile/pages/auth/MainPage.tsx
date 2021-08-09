import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button, ScrollView, TouchableOpacity,
} from 'react-native'

import TodoList from "../../pages/todo/Todolist";
import Navbar2 from "../Navbar/Navbar";
import {Hoverable, Pressable} from "react-native-web-hover";
import {LinearGradient} from "expo-linear-gradient";
import {useHistory} from "react-router-dom";
import httpService from "../../services/http.service";

import Footer from "../footer";
import Icon, {PlusOutlined} from "@ant-design/icons";

const MainPage = () => {





    let history = useHistory();

    const redirect = () => {
        history.push({
            pathname: './create-todo',
        })
    }



    const [todos, setTodos] = useState([])
    useEffect(() => {
        (async () => {
            const {data, status} = await httpService.get({url: `todos/all`})
            if (status === 200) {
                setTodos(data);
            }
        })();
    }, [])
    console.log('all-todos:', todos)





    return(
        <SafeAreaView>
            <Navbar2 />
            <View style={styles.container}>

                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                        <View style={{flex: 3}}>
                        <View>
                            <View style={{justifyContent: 'flex-start', margin: 30, marginTop: 0}}>
                                <View>
                                <Text style={styles.heading}>✨Choose, what to read today✨</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={styles.readingFilter}>Politics</Text>
                                    <Text style={styles.readingFilter}>Art</Text>
                                    <Text style={styles.readingFilter}>Art</Text>
                                    <Text style={styles.readingFilter}>Technology</Text>
                                    <Text style={styles.readingFilter}>Politics</Text>
                                </View>
                            </View>
                         </View>


                <LinearGradient
                    colors={['#75DDDD', '#172A3A']}
                    useAngle={true}
                    angle={90}
                    start={{x: 6, y: 2}}
                    end={{x: 1, y: 1}}
                    style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: 20}}

                >
                    <View style={styles.category}>
                        <Text style={styles.heading}>Fresh news for today!🚀</Text>

                        <ScrollView style={{width: '100%', height: 400, paddingTop: 30}}>
                            {todos.map((todo, index) =>

                                <View key={index} style={{flexDirection: 'row',  marginHorizontal: 90, marginBottom: 0,}}>
                                    <View style={{
                                        borderTopColor: '#172A3A',
                                        borderTopWidth: 0.3,
                                        padding: 20,
                                        flexDirection: 'row',
                                        justifyContent:'flex-start',
                                        width: '100%',

                                    }}>

                                        <View>
                                            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                                                {todo.title}
                                            </Text>

                                            <Text>
                                                {todo.description}
                                            </Text>

                                            <Text style={{fontSize: 11, color: '#172A3A'}}>
                                                🕔 {todo.time} min to read
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            )}
                    </ScrollView>

                    </View>
                </LinearGradient>
                        </View>

                    <View>
                <LinearGradient
                    colors={['#75DDDD', '#172A3A']}
                    useAngle={true}
                    angle={90}
                    start={{x: 6, y: 2}}
                    end={{x: 1, y: 1}}
                    style={{justifyContent: 'center', alignItems: 'center', flex: 0.5, minHeight: 690, marginTop: 30, paddingHorizontal: 50}}

                >

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            height: 60,
                            backgroundColor: '#75DDDD',
                            borderRadius: 100,
                        }}
                        onPress={redirect}
                    > <PlusOutlined size={60} color='#fff' />
                    </TouchableOpacity>
                    <View style={styles.category2}>
                        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'stretch'}}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: '700',
                            paddingHorizontal: 10,
                            color: '#fff'}}>
                            My posted news!😎
                        </Text>
                        {/*<Button*/}
                        {/*    onPress={redirect}*/}
                        {/*    title="Create!"*/}
                        {/*    color='#75DDDD'*/}
                        {/*/>*/}



                        </View>




                        <ScrollView style={{width: '100%', height: 600}}>
                        <TodoList/>
                        </ScrollView>
                    </View>
                </LinearGradient>
                    </View>

            </View>
            </View>
            <Footer />
        </SafeAreaView>
    )
}

export default MainPage



const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 70,
        alignItems: 'flex-start',
        margin: 20,
        marginTop: 0,
        display: 'flex',
        overflow: 'hidden',
        marginBottom: 40
    },

    category: {
        margin: 9,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '97%',
        height: '97%',
    },

    category2: {
        margin: 13,
        flex: 1,
        alignItems: 'center',
        width: '99%',
        height: '99%',
        color: '#fff'
    },

    readingFilter: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#22AAA6',
        borderRadius: 20,
        fontSize: 13,
        padding: 10,
        fontWeight: '600'
    },

    heading: {
        fontSize: 22,
        fontWeight: '700',
        paddingHorizontal: 10,
        marginTop: 20



    },

    edit: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 0
    }
});
