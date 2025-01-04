/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { getFamilyMembers } from "../Services/FamilyService";

const FamilyContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFamilyContext = () => useContext(FamilyContext);

export const FamilyContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [family, setFamily] = useState(null);

    useEffect(() => {
        if (!user || !user.family) {
            // Si no hay usuario o no hay información de la familia, salimos del efecto.
            return;
        }

        let isMounted = true; // Bandera para evitar actualizaciones en componentes desmontados

        getFamilyMembers(user.family.id)
            .then((family) => {
                if (isMounted) {
                    setFamily(family);
                }
            })
            .catch((err) => {
                console.error("Error fetching family:", err);
            });

        // Función de limpieza para el efecto
        return () => {
            isMounted = false; // Evitar actualizaciones tras desmontar
        };
    }, [user]);

    if (!user || !user.family) {
        return null;
    }

    if (!family) {
        return null;
    }

    return (
        <FamilyContext.Provider value={family}>
            {children}
        </FamilyContext.Provider>
    );
};

export default FamilyContext;