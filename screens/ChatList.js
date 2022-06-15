import React,{useState,useEffect} from 'react'
import { Text,View,ImageBackground } from 'react-native'
import { List,Avatar,Divider,FAB,Portal,Dialog,Button,TextInput } from 'react-native-paper'
import { auth, firestore } from '../firebase'
import { useNavigation} from '@react-navigation/native'

const ChatList=()=>{

    const[dialogVisible,setDialogVisible]=useState(false)
    const[email,setEmail]=useState('')
    const[friend,setFriend]=useState('')
    const navi= useNavigation()
    const[chats,setChats]=useState([])

    useEffect(()=>{
       auth.onAuthStateChanged(user=>{
            setEmail(user?.email ?? '')
       })
    },[])

    useEffect(()=>{
        firestore.collection('chats').where('users','array-contains',email).onSnapshot((qs)=>{
            setChats(qs.docs)
            console.log(qs.docs)
        })
     },[email])

    const createChats=async()=>{
        if(!email || !friend) return;
        const response=await firestore.collection('chats').add({
            users:[email,friend]
        })
        setDialogVisible(false)
        navi.navigate('Chat',{chatId:response.id})
    }

    return(
        <View style={{flex: 1}}>
            <ImageBackground source={require('../assets/bgImage.jpg')} resizeMode="cover" style={{flex: 1,
            justifyContent: "center"}}>
                <View style={{flex:1}}>
                    {
                        chats.reverse().map((item)=>{
                           
                            return(<React.Fragment>
                                <List.Item
                                    title={item.data().users.find(x=>x!==email)}
                                    description={(item.data().messages ?? [])[0]?.text ?? undefined}
                                    left={()=><Avatar.Text label={item.data().users.find(x=>x!==email)[0]} size={55} />}
                                    onPress={()=>navi.navigate('Chat',{chatId:item.id})}
                                />
                                <Divider inset style={{backgroundColor:'#4DAA9C',height:0.7}}/>
                            </React.Fragment>)
                        })
                    }
                    
                </View>
                <Portal>
                <Dialog visible={dialogVisible} onDismiss={()=>setDialogVisible(false)} >
                    <Dialog.Title>New Chat</Dialog.Title>
                    <Dialog.Content>
                        <TextInput keyboardType='email-address' label="Enter user email" value={friend} onChangeText={(em)=>setFriend(em)}/>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={()=>setDialogVisible(false)}>Cancel</Button>
                    <Button onPress={()=>createChats()}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
                <FAB onPress={()=>setDialogVisible(true)} icon='plus' style={{position:'absolute',bottom:16,right:16}} />
            </ImageBackground>
        </View>
    )
}

export default ChatList;