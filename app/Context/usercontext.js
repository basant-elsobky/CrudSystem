"use client"

import { createContext, useEffect, useState } from "react";
import supabase from "../Config/supabaseclient";


const userContext = createContext()

function UserContextProvider({ children }) {
    // useEffect(() => {
    //     const getData = async () => {
         
    //         const { data, error } = await supabase
    //           .from('Image')
    //           .select()
           
    //         if (error) {
             
    //         }  if (data ) {
              
              
    //           setproducts(data)
            
    //         }
    //     }
    //     getData();
    //   }, []);

    

    const [user, setUser] = useState(null)



    return (
        <userContext.Provider value={{ user,setUser  }}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserContextProvider }
