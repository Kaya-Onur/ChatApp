import React,{useState} from 'react'
import { Text,View } from 'react-native'
import { TextInput,Button, Subheading } from 'react-native-paper'
import { auth } from '../firebase'
import { useNavigation} from '@react-navigation/native'

const SignIn=()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState('')

    const navi= useNavigation()

    const handleLogin=()=>{
        auth.signInWithEmailAndPassword(email,password)
        .then(userCredentials=>{
             const user=userCredentials.user;
             console.log('Logged',user.email);
             navi.navigate('ChatList')
        })
        .catch(error=>setErr(error.message))
      
     }

    return(
        <View style={{margin:15}}>
             {!!err && email!='' && password!='' && <Subheading style={{color:'red',textAlign:'center',marginBottom:16}}>
                 {err}
            </Subheading> }
           <TextInput 
                label='Email' 
                style={{marginTop:11}}
                value={email} 
                keyboardType='email-address'
                onChangeText={(em)=>setEmail(em)}/> 
           <TextInput 
                label='Password' 
                style={{marginTop:11}}
                value={password} 
                secureTextEntry
                onChangeText={(ps)=>setPassword(ps)}/> 
           <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-around'}}>
            <Button mode='contained' compact onPress={()=>handleLogin()} >Sıgn In</Button>
            <Button  onPress={()=>{navi.navigate('SignUp')}} loading={loading}>Sıgn Up</Button>
           </View>
        </View>
    )
}

export default SignIn;