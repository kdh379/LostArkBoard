import NavBar from "@components/nav/nav-bar";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="flex-1 h-full overflow-auto pt-2 pb-5">
                {children}
            </div>
        </>
    );
};
