import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Octicons from '@expo/vector-icons/Octicons'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router'
import Loading from '../components/loading'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { useAuth } from '@/context/authContext'

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !userNameRef.current || !profileRef.current) {
      Alert.alert('Sign In', 'Please fill all fields!');
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, userNameRef.current, profileRef.current);
    setLoading(false);

    console.log('get.result: ', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  }
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />

      <View style={{ padding: hp(7), paddingHorizontal: wp(5) }} className='flex-1 gap-12'>
        <View className='items-center'>
          <Image style={{ height: hp(15) }} resizeMode='contain' source={require('../assets/images/register.png')} />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(4) }} className='font-bold tracking-wider text-center text-neural-800'>Sign Up</Text>


          <View className='gap-4'>
            {/* Username */}
            <View style={{ height: hp(7) }} className='flex-row gap-4 bg-neutral-100 rounded-2xl items-center px-4'>
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => userNameRef.current = value}
                style={{ fontSize: hp(2.2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Username'
                placeholderTextColor={'gray'}
              />
            </View>

            {/* Email */}
            <View style={{ height: hp(7) }} className='flex-row gap-4 bg-neutral-100 rounded-2xl items-center px-4'>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2.2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Email address'
                placeholderTextColor={'gray'}
              />
            </View>

            {/* Password */}
            <View style={{ height: hp(7) }} className='flex-row gap-4 bg-neutral-100 rounded-2xl items-center px-4'>
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ fontSize: hp(2.2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Password'
                placeholderTextColor={'gray'}
                secureTextEntry={true}
              />
            </View>

            {/* Profile */}
            <View style={{ height: hp(7) }} className='flex-row gap-4 bg-neutral-100 rounded-2xl items-center px-4'>
              <Octicons name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => profileRef.current = value}
                style={{ fontSize: hp(2.2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Profile picture'
                placeholderTextColor={'gray'}
              />
            </View>

            {/* Sign Up Button */}
            <View>
              {/* If loading is true, display loading view, or else display signup view */}
              {loading ?
                <View className='flex-row justify-center'>
                  <Loading size={hp(6.5)} />
                </View>
                :
                <TouchableOpacity onPress={handleRegister} style={{ height: hp(7) }} className='bg-indigo-500 rounded-2xl items-center justify-center'>
                  <Text style={{ fontSize: hp(2.2) }} className='font-bold text-white'>Sign Up</Text>
                </TouchableOpacity>
              }
            </View>

            {/* Sign Up */}
            <View className='flex-row justify-center'>
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Already have an account? </Text>
              <Pressable onPress={() => router.push('/signIn')}>
                <Text style={{ fontSize: hp(1.8) }} className='font-bold text-indigo-500'>Sign In</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
    </ CustomKeyboardView>
  )
}