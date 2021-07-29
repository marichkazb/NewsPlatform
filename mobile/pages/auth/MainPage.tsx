import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native'

import TodoList from "../../pages/todo/Todolist";
import Navbar from "../Navbar";



const MainPage = () => {

    return(
        <SafeAreaView>
            <Navbar/>
            <View style={styles.container}>
            <View style={styles.category}>
                <Text style={styles.heading}>✨Choose, what to read today✨</Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: 200,
                }}>
                    <Text style={styles.readingFilter}>Politics</Text>
                    <Text style={styles.readingFilter}>Art</Text>
                    <Text style={styles.readingFilter}>Art</Text>
                    <Text style={styles.readingFilter}>Technology</Text>
                    <Text style={styles.readingFilter}>Politics</Text>
                </View>
            </View>


            <View style={styles.category}>
                <Text style={styles.heading}>Fresh news for today!🚀</Text>
            </View>

            <View style={styles.category}>
                <Text style={styles.heading}>My posted news!😎</Text>
                <TodoList/>
            </View>

            </View>

        </SafeAreaView>
    )
}

export default MainPage



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 70,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 20,
        marginTop: 0,
        display: 'flex'
    },

    category: {
        margin: 30,
        borderWidth: 1,
        flex: 1,
        alignItems: 'center'

    },

    readingFilter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        margin: 20,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '600'
    },

    heading: {
        fontSize: 22,
        fontWeight: '700',


    },
});
