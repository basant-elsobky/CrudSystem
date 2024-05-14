"use client"

import { createContext, useEffect, useState } from "react";
import supabase from "../Config/supabaseclient";


const userContext = createContext()

function UserContextProvider({ children }) {


    

    const [user, setUser] = useState(null)



    return (
        <userContext.Provider value={{ user,setUser  }}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserContextProvider }
