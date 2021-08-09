import React, {useEffect, useState} from 'react'


import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button, StatusBar,
} from 'react-native'
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import httpService from "../../services/http.service";
import {Field, Formik} from "formik";
import CustomInput from "../todo/CustomInput";
import {postValidationSchema} from '../../validators/todoValidator'
import {loginValidationSchema, registerValidationSchema} from "../../validators/registerValidation";
import {LinearGradient} from "expo-linear-gradient";

const Register = () => {

    let history = useHistory();

    // const onSubmit = async (values :any) => {
    //     await httpService
    //         .post({url: `users/register`, data: values} )
    //         .then(res => {
    //             if (res.status === 200) {
    //                 history.push('/todo-list')
    //             } else console.log("Operation crashed")
    //         })
    // }


    const onSubmit = async (values :any) => {
            await axios
                .post('http://localhost:5000/api/users/register', values)
                .then(res => {
            console.log(res)
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        history.push('./')
                } else console.log("Operation crashed")
            })
        }





    return(
            <>
                <LinearGradient
                    colors={['#75DDDD', '#172A3A']}
                    useAngle={true}
                    angle={90}
                    start={{x: 6, y: 2}}
                    end={{x: 1, y: 1}}
                    style={styles.container} >

        <View style={styles.signupContainer}>
            <Text style={{fontSize: 26, marginBottom: 30}}>Register</Text>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    verify_password: ''


                }}
                onSubmit={onSubmit}
                validationSchema={registerValidationSchema}
            >


                {({ handleSubmit, isValid, values }) => (
                    <>
                        <Text style={styles.name}>Username</Text>
                        <Field
                            component={CustomInput}
                            name="username"
                            placeholder="Enter username"
                        />
                        <Text style={styles.name}>Email</Text>
                        <Field
                            component={CustomInput}
                            name="email"
                            placeholder="Enter email"


                        />
                        <Text style={styles.name}>Password</Text>
                        <Field
                            component={CustomInput}
                            name="password"
                            placeholder="Enter password"
                            type='password'
                            secureTextEntry
                        />

                        <Text style={styles.name}>Verify password</Text>
                        <Field
                            component={CustomInput}
                            name="verify_password"
                            placeholder="Enter password"
                            type = 'password'
                            secureTextEntry
                        />

                        <View style={{paddingTop: 40}}>
                            <Button
                                onPress={handleSubmit}
                                title="Register"
                                disabled={!isValid}
                                color='#172A3A'
                            />
                        </View>


                    </>
                )}
            </Formik>
        </View>
                </LinearGradient>

            </>
)
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center'



    },
    signupContainer: {
        alignItems: 'center',
        padding: 30,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#fff',
        height: 540,
        width: 350,
        backgroundColor: 'rgba(255,255,255, 0.3)'



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

    btn: {
        backgroundColor: '#172A3A',
        fontSize: 17,
        borderRadius: 19,
        color: '#fff',
        padding: 10,
        paddingHorizontal: 30,
        margin: 10,
        marginTop: 0

    }
})


export default Register