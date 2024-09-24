/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { getFamilyMembers } from "../Services/FamilyService";

const FamilyContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFamilyContext = () => useContext(FamilyContext);


export const FamilyContextProvider = ({ children }) => {

    const { user } = useAuthContext();


    const [family, setFamily] = useState({});

    useEffect(() => {
        getFamilyMembers(user?.family.id)
            .then(family => {
                setFamily(family);
            })
            .catch(err => {
                console.error('Error fetching family:', err);
            });
    }
    , [user]);

    if(!user) {
        return null;
    }
    if(!user.family) {
        return null;
    }
    return (
        <FamilyContext.Provider value={family}>
            {children}
        </FamilyContext.Provider>
    )

}

export default FamilyContext;