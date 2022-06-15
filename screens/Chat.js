import { useRoute } from '@react-navigation/native'
import React,{useEffect,useState} from 'react'
import { Text,View } from 'react-native'
import { auth, firestore } from '../firebase';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat=()=>{
    const route=useRoute();
    // console.log("*****************")
    // console.log(route.params.chatId)

    const[messages,setMessages]=useState([]);
    const[uid,setUid]=useState('');
    const[name,setName]=useState('');

    useEffect(()=>{
        return firestore.doc('chats/'+route.params.chatId).onSnapshot((s)=>{
            setMessages(s.data()?.messages ?? []);
            console.log(messages)
        })
    },[route.params.chatId])

    useEffect(()=>{
      return auth.onAuthStateChanged((user)=>{
        setUid(user?.uid);
        setName(user?.displayName)
       })
    },[])

    const onSend = (m = []) => {
        firestore
        .doc('chats/'+route.params.chatId)
        .set({
            messages:GiftedChat.append(messages, m),
        },{merge:true}) 
      }

    return(
        <View style={{flex:1,backgroundColor:'white'}}>
        <GiftedChat
            messages={messages.map(x=>({...x,createdAt:x?.createdAt?.toDate()}))}
            onSend={messages => onSend(messages)}
            user={{
                _id: uid,
                name:name,
            }}
        />
        </View>
    )
}

export default Chat;