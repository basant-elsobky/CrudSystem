import { createContext } from "react";
import supabase from "../Config/supabaseclient";
const userContext = createContext()
function usercontext({children}) {
    const [user, setUser] = useState(null)
  return (
    <>
      <userContext.Provider value={{user,setUser}} >
            {children}
        </userContext.Provider>
    </>
  )
}

export default usercontext
