import { Spin } from "antd";

export default function Loading() {
    return (
        <Spin
            className="w-full h-full flex items-center justify-center"
            size="large"
        />
    );
}
