import { PropsWithChildren } from "react";
import styles from "./_board-list.module.scss";

interface BoardListProps extends PropsWithChildren {
    title: string;
}

export const BoardList = (props: BoardListProps) => {
    const { title, children } = props;
    return (
        <div>
            <div className="strong--base">{title}</div>
            <div className={styles["board-list"]}>{children}</div>
        </div>
    );
};

export default BoardList;
