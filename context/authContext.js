import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            // console.log('user: ', user);
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        return unsub;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId});
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            let msg = error.message;
            if (msg.includes('auth/invalid-email')) {
                msg = 'Email is invalid';
            }
            if (msg.includes('auth/invalid-credential')) {
                msg = 'Wrong email or password';
            }
            return { success: false, msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    const register = async (email, password, username, profileUrl) => {
        try {
            const respond = await createUserWithEmailAndPassword(auth, email, password);
            console.log('respond.user: ', respond?.user);

            await setDoc(doc(db, "users", respond?.user?.uid), {
                username,
                profileUrl,
                userId: respond?.user?.uid
            });
            return { success: true, data: respond?.user };
        } catch (error) {
            let msg = error.message;
            if (msg.includes('auth/invalid-email')) {
                msg = 'Email is invalid';
            }
            if (msg.includes('auth/email-already-in-use')) {
                msg = 'This email is already in use';
            }
            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return value;
}