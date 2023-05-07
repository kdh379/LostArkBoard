import { Card } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { engravingAtom, equipmentAtom, profileAtom } from "./character.atom";
import { convertEngraving } from "utils/script/engraving-converter";

import style from "./_armories.module.scss";
import { getGradeColor } from "utils/script/equipment";

const CARD_PADDING = {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    paddingLeft: "0.6rem",
    paddingRight: "0.6rem",
};

const getArmorIconStyle = (grade: string) => {
    switch (grade) {
        case "고대":
            return style["armor__icon--6"];
        case "유물":
            return style["armor__icon--5"];
        case "전설":
            return style["armor__icon--4"];
        case "영웅":
            return style["armor__icon--3"];
        case "희귀":
            return style["armor__icon--2"];
        case "고급":
            return style["armor__icon--1"];
        default:
            return "";
    }
};

const isArmor = (type: string) => {
    return ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(type);
};

const getUsefulStats = (stats: StatEntity[]) => {
    const combatStats = stats.filter((stat) => {
        return ["치명", "특화", "신속", "제압", "인내", "숙련"].includes(
            stat.Type
        );
    });

    combatStats.sort((a, b) => {
        return parseInt(b.Value) - parseInt(a.Value);
    });

    // combatStats Value중 가장 큰 값 2개를 반환.
    // 100 이상인 값은 위 조건 상관없이 반환.
    const usefulStats = combatStats.filter((stat, index) => {
        return (
            parseInt(stat.Value) >= 100 ||
            index === 0 ||
            index === 1 ||
            parseInt(stat.Value) === 0
        );
    });

    return usefulStats;
};

const isStat = (stat: StatEntity) => {
    return stat.Type === "공격력" || stat.Type === "최대 생명력";
};

function Engraving() {
    const engraving = useRecoilValue(engravingAtom);

    return (
        <div className="flex flex-col gap-2">
            <Card bodyStyle={CARD_PADDING}>
                <div className="flex flex-col gap-2">
                    {convertEngraving(engraving).map((engraving) => (
                        <div
                            key={engraving.name}
                            className="flex gap-x-2 items-center"
                        >
                            {/* <Image
                                src={engraving.icon}
                                width={32}
                                height={32}
                                alt={engraving.name}
                                className="rounded-full"
                            /> */}
                            <span className="font-bold text-xl">
                                {engraving.level}
                            </span>
                            <span>{engraving.name}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

function CombatStats() {
    const { Stats } = useRecoilValue(profileAtom);

    return (
        <Card bodyStyle={CARD_PADDING}>
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 justify-between">
                    {getUsefulStats(Stats).map((stat) => (
                        <div
                            className="flex-1 flex flex-col justify-between"
                            key={stat.Type}
                        >
                            <span>{stat.Type}</span>
                            <span className="font-bold text-2xl">
                                {stat.Value}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    {Stats.map((stat) => {
                        if (isStat(stat)) {
                            return (
                                <div
                                    className="flex gap-2 justify-between items-center"
                                    key={stat.Type}
                                >
                                    <span className="flex-1">{stat.Type}</span>
                                    <span className="flex-1 font-bold">
                                        {stat.Value}
                                    </span>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </Card>
    );
}

function Equipment() {
    const equipments = useRecoilValue(equipmentAtom);

    return (
        <div className="">
            <Card className="flex flex-col" bodyStyle={CARD_PADDING}>
                <div className="flex flex-col gap-3">
                    {equipments
                        .filter((equipment) => isArmor(equipment.Type))
                        .map((equipment) => (
                            <div
                                key={equipment.Type}
                                className="flex gap-x-2 items-center"
                            >
                                <Image
                                    src={equipment.Icon}
                                    width={64}
                                    height={64}
                                    alt={equipment.Type}
                                    className={classNames(
                                        style.armor__icon,
                                        getArmorIconStyle(equipment.Grade)
                                    )}
                                />
                                <div>
                                    <span
                                        className={classNames(
                                            `font-bold text-${getGradeColor(
                                                equipment.Grade
                                            )}`
                                        )}
                                    >
                                        {equipment.Name}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </Card>
        </div>
    );
}

export function Armories() {
    return (
        <div className="flex flex-wrap">
            <div className="flex flex-col gap-3 min-w-[12rem]">
                <CombatStats />
                <Engraving />
            </div>
            <div className="flex-1 pl-3">
                <Equipment />
            </div>
            <div className="bg-purple-600"></div>
        </div>
    );
}
