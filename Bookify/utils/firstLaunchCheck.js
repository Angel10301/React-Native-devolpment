import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem ('hasLaunched');
    if (!hasLaunched) {
        await AsyncStorage,setItem('hasLaunched','true');
        return true;
    }
    return false;
};