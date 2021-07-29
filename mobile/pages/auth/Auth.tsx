import React, {useEffect, useState} from 'react'
import { RootToaster, Toast } from 'react-native-root-toaster';
import {LinearGradient} from "expo-linear-gradient";



import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native'
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import httpService from "../../services/http.service";

const Auth = () => {

    let history = useHistory();

    const redirect = (to) => {
        history.push({
            pathname: to,
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
                    <View style={{
                        flexDirection: 'row',
                        margin: 50,
                        display: 'flex',
                    }}>
                        <View style={{
                            flex:2,
                            margin: 70,
                            marginLeft: 100
                        }}>

                    <Text style={{
                        fontSize: 32,
                        paddingTop: 130,
                        justifyContent: 'center',
                        color: '#fff',
                        paddingBottom: 30

                    }}>
                        Welcome to our news App!
                    </Text>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff',
                            paddingTop: 20
                        }}>- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet nisi a metus porttitor egestas sed in est. Mauris et ante nec dui egestas rutrum sed et velit. Praesent pellentesque sapien id leo tempus, et tincidunt mi maximus.  </Text>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff',
                            paddingTop: 20
                        }}>- Mauris tempus rutrum velit, mattis placerat lorem feugiat vel. Quisque consectetur diam at varius lobortis. Nullam id leo aliquet, bibendum magna in, cursus augue. Cras justo arcu, lacinia nec varius in, gravida eu ipsum.</Text>
                        </View>


                        <View style={{
                            marginTop: 160,
                            padding: 40,
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <View style={{

                            }}>
                            <Text
                                onPress={ () => history.push(  './register', { from: "/auth" })  }
                                style={styles.btn}
                            > REGISTER </Text>
                            </View>

                            <View >
                                <Text
                                onPress={ () => history.push(  './login')  }
                                style={styles.btn}>    LOGIN    </Text>
                            </View>


                        </View>


                    </View>
                </LinearGradient>
              </>

    )
}

export default Auth

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 150,
        paddingTop: 0
    },

    btn: {
        backgroundColor: '#172A3A',
        fontSize: 20,
        borderRadius: 19,
        color: '#fff',
        padding: 20,
        paddingHorizontal: 70,
        margin: 10

    }

});
