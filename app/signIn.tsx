import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Octicons from '@expo/vector-icons/Octicons'
import { useRouter } from 'expo-router'
import Loading from '../components/loading'
import CustomKeyboardView from '@/components/CustomKeyboardView'
import { useAuth } from '@/context/authContext'

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', 'Please fill all fields!');
      return;
    }

    setLoading(true);
    
    // login logic
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    
    if(!response.success) {
      Alert.alert('Sign In', response.msg);
    }
  }
  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="dark" />

      <View style={{ padding: hp(8), paddingHorizontal: wp(5) }} className='flex-1 gap-12'>
        <View className='items-center'>
          <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.png')} />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(4) }} className='font-bold tracking-wider text-center text-neural-800'>Sign In</Text>

          {/* Email */}
          <View className='gap-4'>
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
            <View className='gap-4'>
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
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-right text-neutral-500'>Forgot password</Text>
            </View>

            {/* Sign In Button */}
            <View>
              {/* If loading is true, display loading view, or else display signup view */}
              {loading ?
                <View className='flex-row justify-center'>
                  <Loading size={hp(6.5)} />
                </View>
                :
                <TouchableOpacity onPress={handleLogin} style={{ height: hp(7) }} className='bg-indigo-500 rounded-2xl items-center justify-center'>
                  <Text style={{ fontSize: hp(2.2) }} className='font-bold text-white'>Sign In</Text>
                </TouchableOpacity>
              }
            </View>

            {/* Sign Up */}
            <View className='flex-row justify-center'>
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Don't have an account? </Text>
              <Pressable onPress={() => router.push('/signUp')}>
                <Text style={{ fontSize: hp(1.8) }} className='font-bold text-indigo-500'>Sign Up</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
    </CustomKeyboardView >
  )
}