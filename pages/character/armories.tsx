import { Card } from "antd";
import { useRecoilValue } from "recoil";
import { engravingAtom, profileAtom } from "./character.atom";
import { convertEngraving } from "utils/script/engraving-converter";

import EquipmentCard from "./equipment";
import ArmoryGem from "./armory-gem";
import Image from "next/image";
import ArmoryCard from "./armory-card";

const CARD_PADDING = {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    paddingLeft: "0.6rem",
    paddingRight: "0.6rem",
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
        <div className="flex-1 flex flex-col gap-2">
            <Card bodyStyle={CARD_PADDING}>
                <div className="flex flex-col gap-2">
                    {convertEngraving(engraving).map((engraving) => (
                        <div
                            key={engraving.name}
                            className="flex gap-x-2 items-center"
                        >
                            <Image
                                src={engraving.icon}
                                width={32}
                                height={32}
                                alt={engraving.name}
                                className="rounded-full"
                            />
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

    if (!Stats) return null;

    return (
        <Card className="flex-1 lg:flex-none" bodyStyle={CARD_PADDING}>
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
                                    <span className="flex-1 min-w-fit">
                                        {stat.Type}
                                    </span>
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

export function Armories() {
    return (
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-3">
            <div className="flex lg:flex-col w-full lg:col-span-1 col-span-2 gap-3 min-w-[12rem]">
                <CombatStats />
                <Engraving />
            </div>
            <EquipmentCard className="lg:col-span-4 col-span-2" />
            <ArmoryGem className="lg:col-span-4 lg:col-start-2 col-span-2" />
            <ArmoryCard className="lg:col-span-4 lg:col-start-2 col-span-2" />
        </div>
    );
}
