import React,{ useEffect,useState }  from 'react'
import { Text,View,ImageBackground } from 'react-native'
import { Avatar,Title,Subheading,Button } from 'react-native-paper'
import { auth } from '../firebase'

const Settings=()=>{

    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[label,setLabel]=useState('');

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            console.log(user.displayName)
            setName(user?.displayName ?? '')
            setEmail(user?.email ?? '')
            setLabel(user?.displayName.split(' ').reduce((prev,current)=>prev[0]+current[0]+''))
        })
    },[])

    const logOut=()=>{
        auth.signOut();
    }

    return(
        <View style={{flex:1}}>
            <ImageBackground source={require('../assets/bgImage.jpg')} resizeMode="cover" style={{flex: 1,
            justifyContent: "center"}}>
                 <View style={{flex:1,alignItems:'center',marginTop:15}}>
                    <Avatar.Text label={label} />
                    <Title>{name}</Title>
                    <Subheading>{email}</Subheading>
                    <Button onPress={()=>logOut()}>Sign Out</Button>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Settings;