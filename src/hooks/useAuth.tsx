import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase-config";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut
} from "firebase/auth";
import type { User } from "firebase/auth";
import { DEPARTMENTS } from "@/config/departments";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  department: string | null;
  deptName: string | null;
  userEmail: string | null;
  login: (email: string, password: string, departmentId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<string | null>(sessionStorage.getItem("cp_department"));
  const [deptName, setDeptName] = useState<string | null>(sessionStorage.getItem("cp_dept_name"));
  const [userEmail, setUserEmail] = useState<string | null>(sessionStorage.getItem("cp_user_email"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      if (!firebaseUser) {
        sessionStorage.removeItem("cp_logged_in");
        sessionStorage.removeItem("cp_department");
        sessionStorage.removeItem("cp_dept_name");
        sessionStorage.removeItem("cp_user_email");
        setDepartment(null);
        setDeptName(null);
        setUserEmail(null);
      } else {
        sessionStorage.setItem("cp_logged_in", "true");
        // Restore local React state from sessionStorage if it was loaded directly from Firebase
        if (!department) {
          const storedDept = sessionStorage.getItem("cp_department");
          const storedDeptName = sessionStorage.getItem("cp_dept_name");
          const storedEmail = sessionStorage.getItem("cp_user_email");
          if (storedDept) setDepartment(storedDept);
          if (storedDeptName) setDeptName(storedDeptName);
          if (storedEmail) setUserEmail(storedEmail);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [department]);

  const login = async (email: string, password: string, departmentId: string) => {
    let firebaseEmail = email.trim();
    // Sub-addressing mapping for Firebase
    if (firebaseEmail === "hr@crescoprime.com" && ["crypto", "operations", "commodities"].includes(departmentId)) {
      firebaseEmail = `hr+${departmentId}@crescoprime.com`;
    }

    const userCredential = await signInWithEmailAndPassword(auth, firebaseEmail, password);
    
    sessionStorage.setItem("cp_logged_in", "true");
    sessionStorage.setItem("cp_department", departmentId);
    sessionStorage.setItem("cp_dept_name", DEPARTMENTS[departmentId].name);
    sessionStorage.setItem("cp_user_email", email.trim());

    setDepartment(departmentId);
    setDeptName(DEPARTMENTS[departmentId].name);
    setUserEmail(email.trim());
    setUser(userCredential.user);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    sessionStorage.removeItem("cp_logged_in");
    sessionStorage.removeItem("cp_department");
    sessionStorage.removeItem("cp_dept_name");
    sessionStorage.removeItem("cp_user_email");
    setDepartment(null);
    setDeptName(null);
    setUserEmail(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, department, deptName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
