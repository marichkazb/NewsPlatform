import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from "./CustomInput";
import {useHistory} from "react-router-dom";
import axios from "axios";
import httpService from '../../services/http.service'
import {postValidationSchema} from "../../validators/todoValidator";


const EditTodo = (props) => {
    const [ dataForUpdate, setDataForUpdate] = useState({
        title: '',
        description: '',
        year: '',
        isPrivate: true,
        isCompleted: true
    })

    let history = useHistory();

    const getData = async (id) => {
        const { data, status } = await httpService.get({url :`todos/${id}`})
        setDataForUpdate(data.data)
        console.log(data.data)
    }

    useEffect( () => {
        (async () => {
            await getData(props.match.params.id)
        })();
    }, [])


    // const onSubmit = async (values: any) => {
    //     console.log(values)
    //     await axios
    //         .put(`http://localhost:5000/api/todos/${props.match.params.id}`, values)
    //         .then(res => {
    //         if (res.status === 200) {
    //             history.push('/todo-list')
    //         } else console.log("Operation crashed")
    //     })
    // }


    const onSubmit = async (values: any) => {
        console.log(values)
        await httpService
            .put({url: `todos/${props.match.params.id}`, data: values})
            .then(res => {
                if (res.status === 200) {
                    history.push('/todo-list')
                } else console.log("Operation crashed")
            })
    }

    console.log(dataForUpdate)



    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.signupContainer}>
                    <Text style={{fontSize: 26,}}>Edit your Todo!</Text>

                    <Formik
                        initialValues={dataForUpdate}
                        onSubmit={onSubmit}
                        validationSchema={postValidationSchema}
                        enableReinitialize
                    >


                        {({ handleSubmit, isValid, values }) => (

                            <>
                                <Text style={styles.name}>Title</Text>
                                <Field
                                    component={CustomInput}
                                    name="title"
                                    placeholder='todo.title'
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
                                    <Field type="checkbox" name="private" />
                                </View>


                                <View style={styles.checkboxContainer}>
                                    <Text>Completed</Text>
                                    <Field type="checkbox" name="completed"  />
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
        backgroundColor: '#ddfff4'

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
export default EditTodo
