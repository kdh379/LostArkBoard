import { Button, ConfigProvider, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

// max-width가 768px 이하일 때 헤더의 레이아웃을 변경합니다.
const NavBar = () => {
    const router = useRouter();

    const handlerRedirectHome = () => {
        router.push("/");
    };

    return (
        <header className="flex flex-row justify-between items-center h-16 my-2">
            <div
                className="lg:flex hidden flex-col mx-3 justify-center h-full cursor-pointer"
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

// TODO Footer 컴포넌트를 만들어야 함.
// 모바일 환경일 시 로고 표시 기능 구현 필요
