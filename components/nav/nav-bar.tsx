import { Button, ConfigProvider, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const { Search } = Input;

// max-width가 768px 이하일 때 헤더의 레이아웃을 변경합니다.
// submit 버튼을 누르면 character 페이지로 이동합니다.
// form action은 막아야 함.
const NavBar = () => {
    const [characterName, setCharacter] = useState<string>("");

    const router = useRouter();

    const handlerRedirectHome = () => {
        router.push("/");
    };

    const handlerSearchCharacter = (e?: FormEvent) => {
        if (e) e.preventDefault();
        router.push(`/character/${characterName}`);
    };

    const handlerCharacterNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCharacter(e.target.value);
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
                <form onSubmit={(e) => handlerSearchCharacter(e)}>
                    <Search
                        className="bg-surface font-bold"
                        size="large"
                        placeholder="캐릭터 검색"
                        value={characterName}
                        onChange={handlerCharacterNameChange}
                        onSearch={() => handlerSearchCharacter()}
                    ></Search>
                </form>
            </div>
        </header>
    );
};

export default NavBar;

// TODO Footer 컴포넌트를 만들어야 함.
// 모바일 환경일 시 로고 표시 기능 구현 필요
