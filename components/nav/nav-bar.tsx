import Link from "next/link";
import { useRouter } from "next/router";

// 1. 화면 중앙에 Input 이 위치해야 합니다.
// 2. 화면 좌측에 로고가 위치해야 합니다.
// 3. css는 tailwindcss를 사용합니다.
const NavBar = () => {
    const router = useRouter();

    return (
        <header className="flex flex-row justify-between items-center h-16 w-full px-4">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="strong--1">LoaBoard</h1>
            </div>
            <div className="relative mt-2 rounded-md shadow-sm w-1/3 max-w-xl">
                <input
                    type="text"
                    name="chracaterName"
                    className="block w-full px-3 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="캐릭터 검색"
                />
                <div className="absolute px-2 inset-y-0 right-0 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
