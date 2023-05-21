import { useRecoilValue } from "recoil";
import { gemsAtom } from "./character.atom";
import { Card, Popover, Tag } from "antd";
import { useEffect, useState } from "react";
import { useGradeColor } from "hooks/grade";
import Image from "next/image";
import { CARD_PADDING } from "@utils/script/style";

interface ArmoryGemProps {
    className?: string;
}

declare type GemType = "멸화" | "홍염";

interface Gem {
    icon: string;
    grade: string;
    type: GemType;
    level: number;
    effects: GemEffect;
}

declare type GemEffect = {
    name: string;
    value: string;
    icon: string;
};

function GemPopover(props: GemEffect) {
    const { name, value, icon } = props;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <Image
                    alt={name}
                    src={icon}
                    width={32}
                    height={32}
                    className="rounded-md"
                />
                <div className="flex flex-col gap-1">
                    <span className="font-bold">{name}</span>
                    <div>{value}</div>
                </div>
            </div>
        </div>
    );
}

function Gem(props: Gem) {
    const { icon, grade, type, level, effects } = props;

    const color = useGradeColor(grade);

    return (
        <div className="flex flex-col gap-1 items-center justify-center">
            <Popover
                trigger="hover"
                overlayInnerStyle={{ backgroundColor: "#2e3338" }}
                content={<GemPopover {...effects} />}
            >
                <div className={`w-12 h-12 ${color.style}`}>
                    <Image
                        alt={`${grade} ${type} ${level}`}
                        src={icon}
                        width={64}
                        height={64}
                        className="rounded-lg cursor-pointer"
                    />
                </div>
            </Popover>
            <Tag className="mx-auto">
                {level}
                {type}
            </Tag>
        </div>
    );
}

export default function ArmoryGem(props: ArmoryGemProps) {
    const { Gems, Effects } = useRecoilValue(gemsAtom);

    const [gemList, setGemList] = useState<Gem[]>([]);

    useEffect(() => {
        setGemList((_) => {
            const list = Gems.map((gem) => {
                const effects = Effects.find(
                    (effect) => effect.GemSlot === gem.Slot
                );

                return {
                    icon: gem.Icon,
                    grade: gem.Grade,
                    type: gem.Name.includes("멸화")
                        ? "멸화"
                        : ("홍염" as GemType),
                    level: gem.Level,
                    effects: {
                        name: effects?.Name ?? "",
                        value: effects?.Description ?? "",
                        icon: effects?.Icon ?? "",
                    },
                };
            });

            // list.type은 멸화, 홍염 순으로 정렬
            // level은 높은 순으로 정렬
            // grade는 높은 순으로 정렬
            const prev = [...list].sort((a, b) => {
                if (a.type === b.type) {
                    if (a.level === b.level) {
                        return parseInt(b.grade) - parseInt(a.grade);
                    }

                    return b.level - a.level;
                }

                return a.type === "멸화" ? -1 : 1;
            });

            return prev;
        });
    }, [Gems, Effects]);

    return (
        <Card className={props.className} bodyStyle={CARD_PADDING}>
            <div className="w-full flex flex-wrap gap-6">
                <div className="flex flex-wrap gap-4">
                    {gemList
                        .filter((gem) => gem.type === "멸화")
                        .map((gem, index) => (
                            <Gem key={index} {...gem} />
                        ))}
                </div>
                <div className="flex flex-wrap gap-4">
                    {gemList
                        .filter((gem) => gem.type === "홍염")
                        .map((gem, index) => (
                            <Gem key={index} {...gem} />
                        ))}
                </div>
            </div>
        </Card>
    );
}
