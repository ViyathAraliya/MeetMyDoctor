import { createContext,useContext,useEffect,useState }  from "react";

const AuthContext=createContext({
    isAutheticated: false,
    loginDetails:null,
    login:()=>{},
    logout:()=>{}
});

export const AuthProvider=({children})=>{
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[loginDetails, setLoginDetails]=useState(null);

    const login=(data)=>{
        console.log(data.loginDetails)
        setIsAuthenticated(true);
       setLoginDetails(data);
        localStorage.setItem("loginDetails",data);
    }

    const logout=()=>{
        setIsAuthenticated(false);
        setLoginDetails(null);
        localStorage.removeItem("loginDetails");
    }

    useEffect(()=>{
        const login_Details=localStorage.getItem("loginDetails");
        if(login_Details){
            setIsAuthenticated(true);
            setLoginDetails(loginDetails);
        }
    },[])

    return(<AuthContext.Provider value={{isAuthenticated,loginDetails,login, logout}}>
        {children}
        </AuthContext.Provider>);
}

export const useAuth=()=>{
    return useContext(AuthContext);
}