import React, {useEffect, useRef, useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button, StatusBar, TextInput, Image, Pressable,
} from 'react-native'
import {SearchBar} from "react-native-elements";
import { Icon } from 'react-native-elements'
import {useHistory} from "react-router-dom";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { Hoverable } from 'react-native-web-hover'
import httpService from "../../services/http.service";
import axios from "axios";





const Navbar2 = () => {

  const [text, setText] = useState('');
  let history = useHistory();



  const [userData, setUserData] = useState([]);
  useEffect(() => {

    (async () => {
      console.log({headers: {'Authorization': `token ${localStorage.getItem('token')}`
        }})
      const {data, status} = await axios.get('http://localhost:5000/api/users/get-data', {headers: {'Authorization': `token ${localStorage.getItem('token')}`
        }} )

      console.log('Data:', data)
      if (status === 200) {
        setUserData(data);
      }
    })();
  }, [])
  console.log('userData:', userData)





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
        }
      })
  }




  return(
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.navbarContainer} >
      <Text style={styles.logo}>Navbar</Text>

            <TextInput
            style={{height: 31, backgroundColor: '#fff', borderWidth: 0.01, borderColor: '#fff', paddingRight: 150, justifyContent: 'flex-start', justifySelf: 'center'}}
            placeholder="  🔍 Search here!"
            onChangeText={text => setText(text)}
            defaultValue={text}
         />

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <InstagramOutlined style={{ fontSize: 20, marginLeft: 16, cursor: 'pointer'}} />
              <FacebookOutlined  style={{ fontSize: 20, marginLeft: 16, cursor: 'pointer'}}/>
              <TwitterOutlined style={{ fontSize: 20, marginLeft: 16, cursor: 'pointer'}} />
              <GithubOutlined style={{ fontSize: 20, marginLeft: 16, cursor: 'pointer'}}/>
            </View>

            <View style={{flexDirection: 'row'}}>

              <View style={{ marginTop: 0}} >
                <Hoverable style={{ flex: 1, height: 33, marginTop: 0, justifySelf: 'center', alignItems: 'center', alignSelf: 'center'}} >
                  {({ hovered }) => (
                    <Button
                      title="todo list"
                      onPress={() => history.push('/todo-list')}
                      color={hovered ? "#22AAA6" : "transparent"}
                      style={{ justifyContent: 'center', alignItems: 'center'}}

                    />
                  )}
                </Hoverable>
              </View>


              <View style={{ marginTop: 0}} >
                <Hoverable style={{ flex: 1, height: 33, marginTop: 0, justifySelf: 'center', alignItems: 'center', alignSelf: 'center'}} >
                  {({ hovered }) => (
                    <Button
                      title="todo list"
                      onPress={() => history.push('/todo-list')}
                      color={hovered ? "#22AAA6" : "transparent"}
                      style={{ justifyContent: 'center', alignItems: 'center'}}

                    />
                  )}
                </Hoverable>
              </View>


              <View style={{ marginTop: 0}} >
                <Hoverable style={{ flex: 1, height: 33, marginTop: 0, justifySelf: 'center', alignItems: 'center', alignSelf: 'center'}} >
                  {({ hovered }) => (
                    <Button
                      title="todo list"
                      onPress={() => history.push('/todo-list')}
                      color={hovered ? "#22AAA6" : "transparent"}
                      style={{ justifyContent: 'center', alignItems: 'center'}}

                    />
                  )}
                </Hoverable>
              </View>

              <View style={{justifyContent:'center', alignItems: 'center'}}>
                <Text style={{color: '#208383', paddingHorizontal: 10,  fontSize: 16}}>{userData.email}</Text>
              </View>

              <View>
                <Button
                    onPress={() => handleAccDelete()}
                    title="Exit account"
                    color='#208383'
                />
              </View>
              {/*<Text onPress={() => history.push('/todo-list')} style={styles.navLink}>TodoList</Text>*/}
              {/*<Text onPress={() => history.push('/todo-list')} style={styles.navLink}>TodoList</Text>*/}
              {/*<Text onPress={() => history.push('/todo-list')} style={styles.navLink}>TodoList</Text>*/}
            </View>

          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Navbar2


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 33,
    backgroundColor: '#75DDDD',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 40,
  },

  navbarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 33,
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  search: {
    backgroundColor: '#fff',
    padding: 0,
    buttonStyle: 'none',
    buttonTextStyling: false,
    height: 20
},
  logo: {
    color: '#fff',
    justifySelf: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    margin: 20,
    textDecoration: 'none',
    fontSize: 32,
    display: 'flex',
    fontWeight: 'bold',
  },

  navLink: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontWeight: '700'
    },


})