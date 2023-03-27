import { Button, ConfigProvider, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter();

    const handlerRedirectHome = () => {
        router.push("/");
    };

    return (
        <header className="flex flex-row justify-between items-center h-16 w-full px-4">
            <div
                className="flex flex-col justify-center items-center h-full cursor-pointer"
                onClick={handlerRedirectHome}
            >
                <h1 className="strong--1">LoABoard</h1>
            </div>
            <div className="relative mt-2 rounded-md shadow-sm w-1/3 max-w-xl">
                <Input.Search
                    placeholder="캐릭터 검색"
                    className="bg-default"
                ></Input.Search>
            </div>
        </header>
    );
};

export default NavBar;
