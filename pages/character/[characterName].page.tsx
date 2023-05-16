import { Empty, Spin, Tabs } from "antd";
import { useRouter } from "next/router";
import { Profile } from "./profile";
import { Armories } from "./armories";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

import {
    avatarAtom,
    engravingAtom,
    equipmentAtom,
    profileAtom,
    skillsAtom,
} from "./character.atom";
import { Helmet } from "@components/helmet";
import { useArmories } from "hooks/queries/armories";

export default function CharacterPage() {
    const router = useRouter();
    const { characterName } = router.query;

    const { data: response, isLoading } = useArmories({
        characterName: characterName as string,
    });

    const setProfile = useSetRecoilState(profileAtom);
    const setEquipment = useSetRecoilState(equipmentAtom);
    const setAvatars = useSetRecoilState(avatarAtom);
    const setSkills = useSetRecoilState(skillsAtom);
    const setEngraving = useSetRecoilState(engravingAtom);

    useEffect(() => {
        if (!response?.data) return;

        setProfile(response.data.ArmoryProfile);
        setEquipment(response.data.ArmoryEquipment);
        setAvatars(response.data.ArmoryAvatars);
        setSkills(response.data.ArmorySkills);
        setEngraving(response.data.ArmoryEngraving);
    }, [
        response,
        setProfile,
        setEquipment,
        setAvatars,
        setSkills,
        setEngraving,
    ]);

    if (isLoading) {
        return (
            <Spin
                className="w-full h-full flex items-center justify-center"
                size="large"
            />
        );
    }

    if (!response?.data) {
        return (
            <div className="flex flex-col pt-40 items-center">
                <Empty description />
                <span className="strong--4">{characterName}</span>
                <span>캐릭터를 찾을 수 없습니다.</span>
            </div>
        );
    }

    return (
        <>
            <Helmet title={characterName as string} />
            <div className="px-4">
                <Profile />
                <Tabs
                    type="line"
                    defaultActiveKey="1"
                    className="mt-4"
                    items={[
                        {
                            label: <span className="font-bold">전투</span>,
                            key: "1",
                            children: <Armories />,
                        },
                    ]}
                ></Tabs>
            </div>
        </>
    );
}
