import React,{useState} from 'react'
import { Text ,View} from 'react-native'
import { TextInput,Button, Subheading } from 'react-native-paper'
import { auth } from '../firebase'
import { useNavigation} from '@react-navigation/native'

const SignUp=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState('')

    const navi= useNavigation()

    const createAccount= ()=>{
     setLoading(true)
      auth.createUserWithEmailAndPassword(email,password)
      .then(userCredentials=>{
           const user=userCredentials.user;
           user.updateProfile({displayName:name})
           console.log('Registered',user.email);
           navi.navigate('ChatList')
      })
      .catch(error=>setErr(error.message))
      setLoading(false)
    }

    

    return(
        <View style={{margin:15}}>
           {!!err && email!='' && password!='' && <Subheading style={{color:'red',textAlign:'center',marginBottom:16}}>
                 {err}
            </Subheading> }
           <TextInput 
                label='Name' 
                value={name} 
                onChangeText={(nm)=>setName(nm)}/> 
           <TextInput 
                label='Email' 
                style={{marginTop:11}}
                value={email} 
                keyboardType='email-address'
                onChangeText={(em)=>setEmail(em)}/> 
           <TextInput 
                label='Password' 
                style={{marginTop:11}}
                secureTextEntry
                value={password} 
                onChangeText={(ps)=>setPassword(ps)}/> 
           <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-around'}}>
            <Button compact onPress={()=>{navi.navigate('SignIn')}} >Sıgn In</Button>
            <Button mode='contained' onPress={()=>createAccount()} loading={loading}>Sgn Up</Button>
           </View>
        </View>
    )
}

export default SignUp;