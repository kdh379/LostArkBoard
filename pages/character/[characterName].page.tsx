import { Empty, Spin, Tabs } from "antd";
import { useRouter } from "next/router";
import { Profile } from "./profile";
import { Armories } from "./armories";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

import {
    avatarAtom,
    cardsAtom,
    collectiblesAtom,
    engravingAtom,
    equipmentAtom,
    gemsAtom,
    profileAtom,
    skillsAtom,
} from "./character.atom";
import { Helmet } from "@components/helmet";
import { useArmories } from "hooks/queries/armories";
import Skills from "./skill";
import Collectibles from "./collectibles";

export default function CharacterPage() {
    const router = useRouter();
    const { characterName } = router.query;

    const { data, isLoading } = useArmories({
        characterName: characterName as string,
    });

    const setProfile = useSetRecoilState(profileAtom);
    const setEquipment = useSetRecoilState(equipmentAtom);
    const setAvatars = useSetRecoilState(avatarAtom);
    const setSkills = useSetRecoilState(skillsAtom);
    const setEngraving = useSetRecoilState(engravingAtom);
    const setGems = useSetRecoilState(gemsAtom);
    const setCards = useSetRecoilState(cardsAtom);
    const setCollectibles = useSetRecoilState(collectiblesAtom);

    useEffect(() => {
        if (!data) return;

        setProfile(data.ArmoryProfile);
        setEquipment(data.ArmoryEquipment ?? []);
        data.ArmoryAvatars && setAvatars(data.ArmoryAvatars);
        data.ArmorySkills && setSkills(data.ArmorySkills);
        setEngraving(
            data.ArmoryEngraving ?? {
                Engravings: [],
                Effects: [],
            }
        );
        data.ArmoryGem && setGems(data.ArmoryGem);
        data.ArmoryCard && setCards(data.ArmoryCard);
        data.Collectibles && setCollectibles(data.Collectibles);
    }, [
        data,
        setProfile,
        setEquipment,
        setAvatars,
        setSkills,
        setEngraving,
        setGems,
        setCards,
        setCollectibles,
    ]);

    if (isLoading) {
        return (
            <Spin
                className="w-full h-full flex items-center justify-center"
                size="large"
            />
        );
    }

    if (!data) {
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
                            children: <Skills />,
                        },
                        {
                            label: <span className="font-bold">내실</span>,
                            key: "3",
                            children: <Collectibles />,
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
