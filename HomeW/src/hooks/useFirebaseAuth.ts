import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "../firebase/config";

export const useFirebaseAuth = () => {
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async (email: string, pass: string) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            return true;
        } catch (error: any) {
            setAuthError(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, pass: string) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            return true;
        } catch (error: any) {
            setAuthError(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            console.error("Logout Error:", error.message);
        }
    };

    return {
        login,
        register,
        logout,
        authError,
        isLoading
    };
};
