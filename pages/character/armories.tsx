import { Card } from "antd";
import classNames from "classnames";
import Image from "next/image";

interface ArmoriesProps extends CombatStatsProps, EngravingProps {}

interface CombatStatsProps {
    stats: StatEntity[];
}

interface EngravingProps {
    engraving: ArmoryEngravingEntity;
}

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

function Engraving(props: EngravingProps) {
    const { engraving } = props;

    return (
        <div className="flex flex-col gap-2">
            <Card className="bg-surface" bodyStyle={CARD_PADDING}>
                <div className="flex flex-col gap-2"></div>
            </Card>
        </div>
    );
}

function CombatStats(props: CombatStatsProps) {
    const { stats } = props;

    return (
        <Card className="bg-surface" bodyStyle={CARD_PADDING}>
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 justify-between">
                    {getUsefulStats(stats).map((stat) => (
                        <div
                            className="flex-1 flex flex-col justify-between"
                            key={stat.Type}
                        >
                            <span>{stat.Type}</span>
                            <span className="strong--3">{stat.Value}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    {stats.map((stat) => {
                        if (isStat(stat)) {
                            return (
                                <div
                                    className="flex gap-2 justify-between items-center"
                                    key={stat.Type}
                                >
                                    <div className="flex-1">{stat.Type}</div>
                                    <div className="flex-1 strong--5">
                                        {stat.Value}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </Card>
    );
}

export function Armories(props: ArmoriesProps) {
    const { stats, engraving } = props;

    return (
        <div className="flex flex-warp gap-4">
            <div className="flex flex-col w-52 gap-4">
                <CombatStats stats={stats} />
                <Engraving engraving={engraving} />
            </div>
        </div>
    );
}
