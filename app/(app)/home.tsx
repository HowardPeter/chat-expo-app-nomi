import { View, Text, Button, Pressable, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext';
import { StatusBar } from 'expo-status-bar'
import ChatList from '@/components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '@/firebaseConfig';

export default function home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid)
      getUsers();
  })
  const getUsers = async () => {
    //fetch user
    const q = query(userRef, where('userId', '!=', user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  }
  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />
      {
        users.length > 0 ?
          <ChatList currentUser={user} users={users} />
          :
          <View className='flex items-center' style={{ top: hp(30) }}>
            <ActivityIndicator size='large' />
          </View>
      }
    </View>
  )
}