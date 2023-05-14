import { Empty, Spin, Tabs } from "antd";
import { useRouter } from "next/router";
import { getArmories } from "utils/api/armories";
import { Profile } from "./profile";
import { Armories } from "./armories";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

import {
    avatarAtom,
    engravingAtom,
    equipmentAtom,
    profileAtom,
    skillsAtom,
} from "./character.atom";
import { Helmet } from "@components/helmet";

interface CharacterPageProps {
    armories: ArmoriesEntity;
    isLoading: boolean;
}

export function CharacterPage(props: CharacterPageProps) {
    const { armories, isLoading } = props;

    const router = useRouter();
    const { characterName } = router.query;

    const setProfile = useSetRecoilState(profileAtom);
    const setEquipment = useSetRecoilState(equipmentAtom);
    const setAvatars = useSetRecoilState(avatarAtom);
    const setSkills = useSetRecoilState(skillsAtom);
    const setEngraving = useSetRecoilState(engravingAtom);

    useEffect(() => {
        if (!armories) return;

        setProfile(armories.ArmoryProfile);
        setEquipment(armories.ArmoryEquipment);
        setAvatars(armories.ArmoryAvatars);
        setSkills(armories.ArmorySkills);
        setEngraving(armories.ArmoryEngraving);
    }, [
        armories,
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

    if (!armories) {
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const characterName = context.params?.characterName;

    const response = await getArmories(`/armories/characters/${characterName}`);

    if (!response)
        return {
            props: {
                armories: null,
                isLoading: false,
            },
        };

    return {
        props: {
            armories: response?.data,
            isLoading: false,
        },
    };
}

export default CharacterPage;
