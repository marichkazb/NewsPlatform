import React, {useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native'
import { Formik, Field } from 'formik'
import CustomInput from "./CustomInput";
import {useHistory} from "react-router-dom";
import httpService from '../../services/http.service';
import {postValidationSchema} from "../../validators/todoValidator";


const NewTodo = () => {

    let history = useHistory();

    // const onSubmit = async (values :any) => {
    //     console.log(values)
    //     await axios
    //         .post('http://localhost:5000/api/todos', values)
    //         .then(res => {
    //         if (res.status === 200) {
    //             history.push('./todo-list')
    //         } else console.log("Operation crashed")
    //     })
    // }


    const onSubmit = async (values :any) => {
        console.log(values)
        await httpService
            .post({url: `todos`, data: values} )
            .then(res => {
                if (res.status === 200) {
                    history.push('./todo-list')
                } else console.log("Operation crashed")
            })
    }





    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.signupContainer}>
                    <Text style={{fontSize: 26,}}>Create new Todo!</Text>
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            year: '',
                            isPrivate: true,
                            isCompleted: true

                        }}
                        onSubmit={onSubmit}
                        validationSchema={postValidationSchema}
                    >


                        {({ handleSubmit, isValid, values }) => (
                            <>
                                <Text style={styles.name}>Title</Text>
                                <Field
                                    component={CustomInput}
                                    name="title"
                                    placeholder="Enter title"
                                />
                                <Text style={styles.name}>Description</Text>
                                <Field
                                    component={CustomInput}
                                    name="description"
                                    placeholder="Enter description"
                                    multiline
                                    numberOfLines={10}
                                    style={styles.desc}


                                />
                                <Text style={styles.name}>Year</Text>
                                <Field
                                    component={CustomInput}
                                    name="year"
                                    placeholder="Enter year"
                                    multiline
                                />

                                <View style={styles.checkboxContainer}>
                                    <Text>Private</Text>
                                    <Field type="checkbox" name="isPrivate" />
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Text>Completed</Text>
                                    <Field type="checkbox" name="isCompleted" />
                                </View>

                                <Button
                                    onPress={handleSubmit}
                                    title="Create"
                                />
                            </>
                        )}
                    </Formik>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20

    },
    signupContainer: {
        alignItems: 'center',
        padding: 30,
        borderWidth: 0.5,
        borderColor: 'black',
        height: 600,
        width: 350,
        backgroundColor:'#ddf0ff'

    },

    desc: {
        height: 200,
        width: '100%',
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff'

    },

    name: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: -7
    },

    checkboxContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
export default NewTodo
