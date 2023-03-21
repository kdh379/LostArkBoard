import NavBar from "@components/nav/nav-bar";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    );
};
