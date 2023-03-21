import Link from "next/link";
import { useRouter } from "next/router";

const NavBar: React.FC<unknown> = () => {
    const router = useRouter();

    return (
        <nav>
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
