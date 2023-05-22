import { Card, Progress, Tag } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { equipmentAtom } from "./character.atom";

import {
    parseAccessoryToolTip,
    parseArmorToolTip,
    parseBraceletToolTip,
} from "utils/script/tooltip-converter";

import style from "./_equipment.module.scss";

import { useEffect, useState } from "react";
import { CARD_PADDING, getQualityColor } from "@utils/script/style";
import { useGradeColor } from "hooks/grade";

declare type Elixir = {
    name: string;
    value: string;
    level: number;
};

declare type ArmorSet = {
    name: string;
    level: number;
};

declare type DefaultEquipment = {
    name: string;
    type: string;
    grade: string;
    icon: string;
};

interface Armor extends DefaultEquipment {
    qualityValue: number;
    elixirList: Elixir[];

    armorSet?: ArmorSet;
}

interface Accessory extends DefaultEquipment {
    qualityValue: number;
    possibleEffects: {
        name: string;
        value: string;
    }[];
    combatStats: {
        name: string;
        value: string;
    }[];
}

interface Bracelet extends DefaultEquipment {
    possibleEffects: {
        name: string;
        value: string;
    }[];
    specialStats: {
        name: string;
        value: string;
        description: string;
    }[];
}

const isArmor = (type: string) => {
    return ["투구", "상의", "하의", "장갑", "어깨", "무기"].includes(type);
};

const isAccessory = (type: string) => {
    return ["목걸이", "반지", "귀걸이", "어빌리티 스톤"].includes(type);
};

const isBracelet = (type: string) => {
    return ["팔찌"].includes(type);
};

interface EquipmentProps {
    icon: string;
    name: string;
    grade: string;
    qualityValue: number;
    middleTag?: string[];
    bottomTag?: string[];
}

function Equipment(props: EquipmentProps) {
    const { icon, name, grade, qualityValue, middleTag, bottomTag } = props;

    const qualityColor = getQualityColor(qualityValue);
    const gradeStyle = useGradeColor(grade);

    return (
        <div
            key={name}
            className="xl:h-[72px] min-w-[360px] max-w-[400px] flex gap-x-3 items-center my-3 w-full"
        >
            <div className={gradeStyle.style}>
                <Image
                    src={icon}
                    width={74}
                    height={74}
                    alt={name}
                    className="rounded-lg w-16 h-16 min-w-max"
                />
            </div>
            <div className="flex-1 flex flex-col gap-1 h-full items-start">
                <div className={classNames(`font-bold`)}>
                    <label>{name}</label>
                </div>
                <div className="flex items-center  gap-y-1 w-full">
                    {middleTag?.map((tag) => {
                        return (
                            <Tag className="font-bold" key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                    {qualityValue && qualityValue >= 0 && (
                        <div className="w-full flex items-center">
                            <span
                                className="font-bold pr-2"
                                style={{
                                    color: qualityColor,
                                }}
                            >
                                {qualityValue}
                            </span>
                            <Progress
                                percent={qualityValue}
                                showInfo={false}
                                trailColor="#ffffff"
                                strokeColor={qualityColor}
                                className=""
                                size="small"
                            />
                        </div>
                    )}
                </div>
                <div className="flex gap-1 xl:flex-nowrap flex-wrap">
                    {bottomTag?.map((tag) => {
                        return (
                            <Tag
                                className="font-bold"
                                key={tag}
                                color={
                                    tag.includes("감소") ? "error" : "default"
                                }
                            >
                                <span>{tag}</span>
                            </Tag>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

interface EquipmentCardProps {
    className?: string;
}

export default function EquipmentCard(props: EquipmentCardProps) {
    const equipments = useRecoilValue(equipmentAtom);
    const [armorList, setArmorList] = useState<Armor[]>([]);
    const [accessoryList, setAccessoryList] = useState<Accessory[]>([]);
    const [braceletList, setBraceletList] = useState<Bracelet[]>([]);

    useEffect(() => {
        setArmorList((_) => {
            const list = equipments
                .filter((equipment) => isArmor(equipment.Type))
                .map((equipment) => {
                    const toolTip = parseArmorToolTip(equipment.Tooltip);

                    return {
                        type: equipment.Type,
                        grade: equipment.Grade,
                        name: equipment.Name,
                        icon: equipment.Icon,
                        elixirList: toolTip.elixir,
                        qualityValue: toolTip.qualityValue,
                        armorSet: toolTip.armorSet ?? undefined,
                    };
                });

            // 무기를 가장 마지마지에 둔다.
            const weaponIndex = list.findIndex(
                (equipment) => equipment.type === "무기"
            );
            const weapon = list.splice(weaponIndex, 1)[0];
            list.push(weapon);

            return list;
        });

        setAccessoryList(
            equipments
                .filter((equipment) => isAccessory(equipment.Type))
                .map((equipment) => {
                    const toolTip = parseAccessoryToolTip(equipment.Tooltip);

                    return {
                        type: equipment.Type,
                        grade: equipment.Grade,
                        name: equipment.Name,
                        icon: equipment.Icon,
                        qualityValue: toolTip.qualityValue,
                        possibleEffects: toolTip.possibleEffects,
                        combatStats: toolTip.combatStats,
                    };
                })
        );
        setBraceletList(
            equipments
                .filter((equipment) => isBracelet(equipment.Type))
                .map((equipment) => {
                    const toolTip = parseBraceletToolTip(equipment.Tooltip);

                    return {
                        type: equipment.Type,
                        grade: equipment.Grade,
                        name: equipment.Name,
                        icon: equipment.Icon,
                        possibleEffects: toolTip.possibleEffects,
                        specialStats: toolTip.specialStats,
                    };
                })
        );
    }, [equipments]);
    return (
        <Card className={props.className} bodyStyle={CARD_PADDING}>
            <div className="flex flex-wrap items-start gap-5">
                <div className="flex-1">
                    {armorList.map((armor) => (
                        <Equipment
                            key={armor.name}
                            icon={armor.icon}
                            name={armor.name}
                            grade={armor.grade}
                            qualityValue={armor.qualityValue}
                            middleTag={
                                armor.armorSet
                                    ? [
                                          `${armor.armorSet.name} Lv.${armor.armorSet.level}`,
                                      ]
                                    : []
                            }
                            bottomTag={armor.elixirList.map(
                                (elixir) => `${elixir.name} Lv.${elixir.level}`
                            )}
                        />
                    ))}
                </div>
                <div className="flex-1">
                    {accessoryList.map((accessory) => (
                        <Equipment
                            key={accessory.name}
                            icon={accessory.icon}
                            name={accessory.name}
                            grade={accessory.grade}
                            qualityValue={accessory.qualityValue}
                            middleTag={accessory.possibleEffects.map(
                                (effect) => effect.name
                            )}
                            bottomTag={accessory.combatStats.map(
                                (stat) => `${stat.name} ${stat.value}`
                            )}
                        />
                    ))}
                    {braceletList?.map((bracelet) => (
                        <Equipment
                            key={bracelet.name}
                            icon={bracelet.icon}
                            name={bracelet.name}
                            grade={bracelet.grade}
                            qualityValue={-1}
                            middleTag={bracelet.possibleEffects.map(
                                (effect) => `${effect.name} ${effect.value}`
                            )}
                            bottomTag={bracelet.specialStats.map(
                                (stat) => `${stat.name} ${stat.value}`
                            )}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
}
