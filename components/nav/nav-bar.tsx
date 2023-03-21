import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter();

    return (
        <nav>
            <img className="nav-bar__logo" src="/vercel.svg" />
            <Link className={router.pathname === "/" ? "active" : ""} href="/">
                Home
            </Link>
            <Link
                className={router.pathname === "/about" ? "active" : ""}
                href="/about"
            >
                About
            </Link>
        </nav>
    );
};

export default NavBar;
