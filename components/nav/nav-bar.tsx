import { Button, ConfigProvider, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter();

    const handlerRedirectHome = () => {
        router.push("/");
    };

    return (
        <header className="flex flex-row justify-between items-center h-16 my-2">
            <div
                className="flex flex-col mx-3 justify-center h-full cursor-pointer"
                onClick={handlerRedirectHome}
            >
                <div className="mb-0 strong--1">LoABoard</div>
            </div>
            <div className="flex-1 mx-3 shadow-sm">
                <Input.Search
                    size="large"
                    placeholder="캐릭터 검색"
                ></Input.Search>
            </div>
        </header>
    );
};

export default NavBar;
