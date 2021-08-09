import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Button, ScrollView,
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from "./CustomInput";
import {useHistory} from "react-router-dom";
import axios from "axios";
import httpService from '../../services/http.service'
import {postValidationSchema} from "../../validators/todoValidator";
import Navbar2 from "../Navbar/Navbar";
import {LinearGradient} from "expo-linear-gradient";
import {Picker} from "@react-native-picker/picker";
import TodoList from "./Todolist";
import Footer from "../footer";


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
        const { data, status } = await httpService.get({url :`todos/one/${id}`})
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
                    history.push('/')
                } else console.log("Operation crashed")
            })
    }

    console.log(dataForUpdate)

    const [selectedCategory, setSelectedCategory] = useState();




    return (
        // <>
        //     <StatusBar barStyle="dark-content" />
        //     <SafeAreaView style={styles.container}>
        //         <View style={styles.signupContainer}>
        //             <Text style={{fontSize: 26,}}>Edit your Todo!</Text>
        //
        //             <Formik
        //                 initialValues={dataForUpdate}
        //                 onSubmit={onSubmit}
        //                 validationSchema={postValidationSchema}
        //                 enableReinitialize
        //             >
        //
        //
        //                 {({ handleSubmit, isValid, values }) => (
        //
        //                     <>
        //                         <Text style={styles.name}>Title</Text>
        //                         <Field
        //                             component={CustomInput}
        //                             name="title"
        //                             placeholder='todo.title'
        //                         />
        //                         <Text style={styles.name}>Description</Text>
        //                         <Field
        //                             component={CustomInput}
        //                             name="description"
        //                             placeholder="Enter description"
        //                             multiline
        //                             numberOfLines={10}
        //                             style={styles.desc}
        //                         />
        //
        //                         <Text style={styles.name}>Year</Text>
        //                         <Field
        //                             component={CustomInput}
        //                             name="year"
        //                             placeholder="Enter year"
        //                             multiline
        //                         />
        //
        //                         <View style={styles.checkboxContainer}>
        //                             <Text>Private</Text>
        //                             <Field type="checkbox" name="private" />
        //                         </View>
        //
        //
        //                         <View style={styles.checkboxContainer}>
        //                             <Text>Completed</Text>
        //                             <Field type="checkbox" name="completed"  />
        //                         </View>
        //
        //
        //                         <Button
        //                             onPress={handleSubmit}
        //                             title="Create"
        //                         />
        //                     </>
        //                 )}
        //             </Formik>
        //         </View>
        //     </SafeAreaView>
        // </>


        <SafeAreaView>
            <Navbar2 />
            <View style={styles.container}>

                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                    <View style={{flex: 2}}>

                        <LinearGradient
                            colors={['#75DDDD', '#172A3A']}
                            useAngle={true}
                            angle={90}
                            start={{x: 6, y: 2}}
                            end={{x: 1, y: 1}}
                            style={{justifyContent: 'center', alignItems: 'center', flex: 2, marginRight: 20, marginTop: 30, height: 500}}
                        >
                            <View style={styles.category}>
                                <Text style={styles.heading}>Tell your the world your thoughts!🚀</Text>
                                <View style={{width: '40%', height: 600, paddingVertical: 30}}>
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
                                                <Text style={styles.name}>Duration to read</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="time"
                                                    placeholder="Enter time to read the article"
                                                    multiline
                                                />


                                                <Text style={styles.name}>Choose category</Text>
                                                <Picker
                                                    style={{marginVertical: 20, marginTop: 0, padding: 10, borderRadius: 6}}
                                                    selectedValue={selectedCategory}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setSelectedCategory(itemValue)
                                                    }>
                                                    <Picker.Item label="Art" value="Art" />
                                                    <Picker.Item label="Sports" value="Sports" />
                                                    <Picker.Item label="Politics" value="Politics" />
                                                    <Picker.Item label="Travel" value="Travel" />
                                                    <Picker.Item label="Future" value="Future" />
                                                    <Picker.Item label="Culture" value="Culture" />
                                                    <Picker.Item label="Education" value="Education" />
                                                </Picker>


                                                <View style={styles.checkboxContainer}>
                                                    <Text>Private</Text>
                                                    <Field type="checkbox" name="isPrivate" />
                                                </View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40}}>

                                                    <View style={{width: '40%', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Button
                                                            onPress={handleSubmit}
                                                            title="Create"
                                                            color='#75DDDD'
                                                        />
                                                    </View>
                                                </View>

                                            </>
                                        )}
                                    </Formik>
                                </View>
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
                            style={{justifyContent: 'center', alignItems: 'center', flex: 2, minHeight: 540, marginTop: 30}}

                        >
                            <View style={styles.category2}>
                                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'stretch', margin: 40}}>
                                    <Text style={{
                                        fontSize: 22,
                                        fontWeight: '700',
                                        paddingHorizontal: 10,
                                        color: '#fff'}}>
                                        My posted news!😎
                                    </Text>
                                </View>
                                <ScrollView style={{width: '100%', height: 540}}>
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
        marginHorizontal: 0,
        padding: 10,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff',
        borderRadius: 6,
    },

    name: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: -7,
        fontWeight: '700'
    },

    checkboxContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
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
        width: '99.9%',
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
})
export default EditTodo
