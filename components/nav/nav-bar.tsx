import { Button, ConfigProvider, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter();

    const handlerRedirectHome = () => {
        router.push("/");
    };

    return (
        <header className="bg-transparent flex flex-row justify-between items-center w-full h-16 px-4 mb-3">
            <div
                className="flex flex-col justify-center h-full cursor-pointer"
                onClick={handlerRedirectHome}
            >
                <div className="mb-0 strong--1">LoABoard</div>
            </div>
            <div className="px-3 flex-1 shadow-sm">
                <Input.Search
                    size="large"
                    placeholder="캐릭터 검색"
                ></Input.Search>
            </div>
        </header>
    );
};

export default NavBar;
