import { Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getProfiles } from "utils/api/armories";
import { Profile } from "./profile";

export const CharacterPage = () => {
    const router = useRouter();
    const { characterName } = router.query;

    const { data, isLoading, error } = useSWR(
        `/api/armories/characters/${characterName}/profiles`,
        getProfiles
    );

    if (isLoading && !data)
        return (
            <div className="flex h-full justify-center items-center">
                <Spin size="large"></Spin>
            </div>
        );

    if (!data) return;

    return (
        <div className="grid sm:grid-cols-2 px-4">
            <Profile user={data.data} />
            <div className="bg-surface z-20"></div>
        </div>
    );
};

export default CharacterPage;
