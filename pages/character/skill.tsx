import { useRecoilValue } from "recoil";

import { gemsAtom, profileAtom, skillsAtom } from "./character.atom";
import { Card, Tag } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GemProps, GemType, Gem } from "./armory-gem";
import { CARD_PADDING } from "@utils/script/style";
import { useGradeColor } from "hooks/grade";

declare type Skill = {
    name: string;
    level: number;
    icon: string;
    rune: Rune | null;
    tripods: Tripod[];
};

const SKILL_TABLE_COLUMNS = [
    {
        key: "icon",
        width: 10,
    },
    {
        key: "name",
        width: 20,
    },
    {
        key: "level",
        width: 10,
    },
    {
        key: "rune",
        width: 20,
    },
    {
        key: "gem",
        width: 20,
    },
    {
        key: "tripod",
        width: 30,
    },
];

function Skill(props: Skill) {
    const { name, level, icon, rune, tripods } = props;
    const armoryGems = useRecoilValue(gemsAtom);

    const [gems, setGems] = useState<GemProps[]>([]);
    const gradeStyle = useGradeColor(rune?.Grade ?? "일반");

    useEffect(() => {
        setGems([]);

        const filteredEffect = armoryGems.Effects.filter(
            (effect) => effect.Name === name
        );

        armoryGems.Gems.forEach((gem) => {
            filteredEffect.forEach((effect) => {
                effect.GemSlot === gem.Slot &&
                    setGems((prev) => [
                        ...prev,
                        {
                            icon: gem.Icon,
                            grade: gem.Grade,
                            type: gem.Name.includes("멸화")
                                ? "멸화"
                                : ("홍염" as GemType),
                            level: gem.Level,
                            effects: {
                                name: effect.Name,
                                value: effect.Description,
                                icon: effect.Icon,
                            },
                        },
                    ]);
            });
        });
    }, [armoryGems, name]);

    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-y-3 items-center border-b border-b-active pb-3">
            <div className="min-w-[200px] flex gap-2 items-center col-span-1 px-3">
                <Image
                    src={icon}
                    width={32}
                    height={32}
                    alt={name}
                    className="rounded-md w-10 h-10"
                />
                <p className="font-bold text-base min-w-max">{name}</p>
                <p className="font-bold text-base ml-auto mr-3 col-span-1 min-w-max">
                    {level}레벨
                </p>
            </div>
            <div className="min-w-[200px] flex gap-2 items-center col-span-1 px-3">
                {rune && (
                    <div className="flex items-center gap-x-2 pr-2">
                        <div
                            className={`w-12 h-12 relative ${gradeStyle.style}`}
                        >
                            <Image
                                src={rune.Icon}
                                width={64}
                                height={64}
                                alt={rune.Name}
                                className="rounded-md w-full h-full bg-cover absolute"
                            />
                        </div>
                        <p className="font-bold text-sm min-w-max">
                            {rune.Name}
                        </p>
                    </div>
                )}
                <div className="grid grid-cols-2 pl-3 gap-x-5">
                    <div className="col-span-1">
                        {gems
                            .filter((gem) => gem.type === "멸화")
                            .map((gem) => (
                                <Gem
                                    {...gem}
                                    key={gem.effects.name}
                                    displayBottom={false}
                                />
                            ))}
                    </div>
                    <div className="col-span-1">
                        {gems
                            .filter((gem) => gem.type === "홍염")
                            .map((gem) => (
                                <Gem
                                    {...gem}
                                    key={gem.effects.name}
                                    displayBottom={false}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <div className="md:col-span-2 col-span-1 gap-2 items-center grid grid-cols-3 px-3">
                {tripods.map((tripod) => (
                    <div
                        key={tripod.Name}
                        className="flex gap-2 items-center col-span-1"
                    >
                        <Image
                            src={tripod.Icon}
                            width={32}
                            height={32}
                            alt={tripod.Name}
                            className="rounded-md w-10 h-10"
                        />
                        <div className="flex flex-col min-w-max">
                            <p className="font-bold text-sm">{tripod.Name}</p>
                            <p className="font-bold text-sm">
                                Lv.{tripod.Level}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    const armorySkills = useRecoilValue(skillsAtom);
    const armoryProfile = useRecoilValue(profileAtom);
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        setSkills([]);

        const filteredSkills = armorySkills
            .filter((skill) => skill.Level > 1 || skill.Rune)
            .sort((a, b) => b.Level - a.Level);

        setSkills(
            filteredSkills.map((skill) => ({
                name: skill.Name,
                level: skill.Level,
                icon: skill.Icon,
                rune: skill.Rune,
                tripods: skill.Tripods.filter((tripod) => tripod.IsSelected),
            }))
        );
    }, [armorySkills]);

    return (
        <Card bodyStyle={CARD_PADDING}>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <Tag
                        color="default"
                        bordered={false}
                        className="text-base flex gap-1 font-bold"
                    >
                        <p>SP</p>
                        <p>{armoryProfile.UsingSkillPoint}</p>
                        <p>/</p>
                        <p>{armoryProfile.TotalSkillPoint}</p>
                    </Tag>
                </div>
                <div className="flex flex-col gap-y-4">
                    {skills.map((skill) => (
                        <Skill {...skill} key={skill.name} />
                    ))}
                </div>
            </div>
        </Card>
    );
}
