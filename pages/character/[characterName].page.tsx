import { Card, Empty, Spin, Tabs } from "antd";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getArmories } from "utils/api/armories";
import { Profile } from "./profile";
import { Armories } from "./armories";

export function CharacterPage() {
    const router = useRouter();
    const { characterName } = router.query;

    const { data, isLoading, error } = useSWR(
        `/api/armories/characters/${characterName}`,
        getArmories
    );

    if (isLoading && !data)
        return (
            <div className="flex h-full justify-center items-center">
                <Spin size="large"></Spin>
            </div>
        );

    if (!data?.data)
        return (
            <div className="flex flex-col pt-40 items-center">
                <Empty description />
                <span className="strong--4">{characterName}</span>
                <span>캐릭터를 찾을 수 없습니다.</span>
            </div>
        );

    return (
        <div className="flex flex-col px-4">
            <Profile user={data.data.ArmoryProfile} />
            <Tabs
                type="line"
                defaultActiveKey="1"
                className="mt-4"
                items={[
                    {
                        label: <span className="font-bold">전투</span>,
                        key: "1",
                        children: (
                            <Armories
                                stats={data.data.ArmoryProfile.Stats}
                                engraving={data.data.ArmoryEngraving}
                            />
                        ),
                    },
                ]}
            ></Tabs>
        </div>
    );
}

export default CharacterPage;
