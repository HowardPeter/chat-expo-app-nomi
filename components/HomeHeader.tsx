import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { blurhash } from '@/utils/common';
import { useAuth } from '@/context/authContext';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { CustomMenuItem } from './CustomMenuItem';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const ios = Platform.OS == 'ios';
export default function HomeHeader() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();

    const handleProfile = () => { }
    const handleLogout = async () => {
        await logout();
    }
    return (
        <View
            style={{ paddingTop: ios ? top : top + 10 }}
            className='flex-row justify-between px-5 bg-indigo-500 pb-6 rounded-b-3xl shadow'>
            <View>
                <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>Chats</Text>
            </View>

            <View>
                <Menu>
                    <MenuTrigger>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={400}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderCurve: 'continuous',
                                marginTop: 40,
                                backgroundColor: 'white',
                                shadowOpacity: 0.2,
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 0 },
                                width: 160
                            }
                        }}>
                        <CustomMenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color="#737373" />}
                        />
                        <Divider />
                        <CustomMenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color="#737373" />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () => {
    return (
        <View
            style={{
                width: '100%',
                height: 1,
                backgroundColor: '#D1D5DB',
                marginVertical: 8,
            }}
        />
    );
}