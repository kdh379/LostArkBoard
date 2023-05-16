import { Card, Progress, Tag } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { equipmentAtom } from "./character.atom";

import {
    parseAccessoryToolTip,
    parseArmorToolTip,
} from "utils/script/tooltip-converter";

import style from "./_equipment.module.scss";
import { useEffect, useState } from "react";
import { getQualityColor } from "utils/script/color";

const CARD_PADDING = {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    paddingLeft: "0.6rem",
    paddingRight: "0.6rem",
};

const getArmorGradeStyle = (grade: string) => {
    switch (grade) {
        case "에스더":
            return style["equipment__icon--7"];
        case "고대":
            return style["equipment__icon--6"];
        case "유물":
            return style["equipment__icon--5"];
        case "전설":
            return style["equipment__icon--4"];
        case "영웅":
            return style["equipment__icon--3"];
        case "희귀":
            return style["equipment__icon--2"];
        case "고급":
            return style["equipment__icon--1"];
        default:
            return "";
    }
};

declare type Elixir = {
    name: string;
    value: string;
    level: number;
};

declare type armorSet = {
    name: string;
    level: number;
};

declare type Armor = {
    name: string;
    type: string;
    grade: string;
    icon: string;
    qualityValue: number;
    elixirList: Elixir[];

    armorSet?: armorSet;
};

declare type Accessory = {
    name: string;
    type: string;
    grade: string;
    icon: string;
    qualityValue: number;
    possibleEffects: {
        name: string;
        value: string;
    }[];
    combatStats: {
        name: string;
        value: string;
    }[];
};

const isArmor = (type: string) => {
    return ["투구", "상의", "하의", "장갑", "어깨", "무기"].includes(type);
};

const isAccessory = (type: string) => {
    return ["목걸이", "반지", "귀걸이", "팔찌", "어빌리티 스톤"].includes(type);
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

    return (
        <div
            key={name}
            className={classNames(style.equipment, getArmorGradeStyle(grade))}
        >
            <Image
                src={icon}
                width={64}
                height={64}
                alt={name}
                className="self-center"
            />
            <div className="flex flex-col gap-x-2 w-56">
                <label className={classNames(`font-bold`)}>{name}</label>
                <div className="flex items-center">
                    {middleTag?.map((tag) => {
                        return (
                            <Tag className="font-bold" key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
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
                    />
                </div>
                <div className="flex">
                    {bottomTag?.map((tag) => {
                        return (
                            <Tag className="font-bold" key={tag}>
                                <span>{tag}</span>
                            </Tag>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function EquipmentCard() {
    const equipments = useRecoilValue(equipmentAtom);
    const [armorList, setArmorList] = useState<Armor[]>([]);
    const [accessoryList, setAccessoryList] = useState<Accessory[]>([]);

    useEffect(() => {
        setArmorList(
            equipments
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
                })
        );
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
    }, [equipments]);

    // TODO Equipment 높이 균일하게 맞추기
    return (
        <Card bodyStyle={CARD_PADDING}>
            <div className="flex flex-nowrap items-start">
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
                </div>
            </div>
        </Card>
    );
}
