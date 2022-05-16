import { createContext, ReactNode, useContext, useState } from "react";


type ContextMenuType = {
    activeMenu?: () => void,
    isActiveMenu?: boolean
}

export const MenuContext = createContext<ContextMenuType>({});

const MenuProvider = ({ children }: { children: ReactNode }) => {

    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const activeMenu = () => {
        setIsActiveMenu(!isActiveMenu)
    }

    return (
        <MenuContext.Provider value={
            {
                activeMenu: activeMenu,
                isActiveMenu: isActiveMenu
            }
        }
        >
            {children}
           
        </MenuContext.Provider>
    )
}

export const useMenu = () => {
    const context = useContext(MenuContext);

    if (!context) throw new Error('error Provider');

    return context;
}

export default MenuProvider;