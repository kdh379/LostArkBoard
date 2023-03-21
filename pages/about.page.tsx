import { Helmet } from "@components/helmet";
import NavBar from "@components/nav/nav-bar";

const Potato: React.FC<unknown> = () => {
    return (
        <div>
            <Helmet title="About" />
            <h1>About</h1>
        </div>
    );
};

export default Potato;
