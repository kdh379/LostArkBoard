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
    gemsAtom,
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
    const setGems = useSetRecoilState(gemsAtom);

    useEffect(() => {
        if (!response?.data) return;

        setProfile(response.data.ArmoryProfile);
        setEquipment(response.data.ArmoryEquipment ?? []);
        response.data.ArmoryAvatars && setAvatars(response.data.ArmoryAvatars);
        response.data.ArmorySkills && setSkills(response.data.ArmorySkills);
        setEngraving(
            response.data.ArmoryEngraving ?? {
                Engravings: [],
                Effects: [],
            }
        );
        response.data.ArmoryGem && setGems(response.data.ArmoryGem);
    }, [
        response,
        setProfile,
        setEquipment,
        setAvatars,
        setSkills,
        setEngraving,
        setGems,
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
                            label: <span className="font-bold">장비</span>,
                            key: "1",
                            children: <Armories />,
                        },
                        {
                            label: <span className="font-bold">스킬</span>,
                            key: "2",
                            children: <div>스킬</div>,
                        },
                        {
                            label: <span className="font-bold">내실</span>,
                            key: "3",
                            children: <div>내실</div>,
                        },
                        {
                            label: <span className="font-bold">PVP</span>,
                            key: "4",
                            children: <div>PVP</div>,
                        },
                        {
                            label: (
                                <span className="font-bold">보유 캐릭터</span>
                            ),
                            key: "5",
                            children: <div>기타</div>,
                        },
                    ]}
                ></Tabs>
            </div>
        </>
    );
}
