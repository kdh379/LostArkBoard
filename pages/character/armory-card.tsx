import { Card, Tag } from "antd";
import { useRecoilValue } from "recoil";
import { cardsAtom } from "./character.atom";
import NextImage from "next/image";
import { CARD_PADDING } from "@utils/script/style";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

interface ArmoryCardProps {
    className?: string;
}

interface CardDetailProps {
    details: CardAwakeDetail[];
}

declare type CardAwake = {
    name: string;
    set?: number;
    awake?: number;
};

declare type CardAwakeDetail = {
    name: string;
    effect: {
        name: string;
        value: string;
    }[];
};

const regex = /^(.*?) (\d+)세트(?: \((\d+)각성합계\))?$/;

const slotConfig: { [key: string]: string } = {
    일반: "bg-[0%_0]",
    고급: "bg-[20.1%_0]",
    희귀: "bg-[40.2%_0]",
    영웅: "bg-[60.3%_0]",
    전설: "bg-[80.4%_0]",
};

const awakeConfig: { [key: string]: string } = {
    0: "-left-[100%]",
    1: "-left-[80%]",
    2: "-left-[60%]",
    3: "-left-[40%]",
    4: "-left-[20%]",
    5: "-left-[0%]",
};

function CardEffect(props: CardDetailProps) {
    const { details } = props;

    return (
        <div className="w-full flex flex-wrap gap-4 p-4 bg-background rounded-lg">
            {details.map((card) => (
                <div
                    key={card.name}
                    className="flex-1 min-w-[200px] flex flex-col gap-2"
                >
                    <span className="font-bold">{card.name}</span>
                    {card.effect.map((effect) => (
                        <div key={effect.name}>
                            <Tag className="font-bold">{effect.name}</Tag>
                            <span className="font-bold text-gray-300">
                                {effect.value}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function CardSlot(props: CardEntity) {
    const { Name, AwakeCount, Grade, Icon } = props;

    return (
        <div className="w-[96px] text-center">
            <div className="relative w-full h-[140px]">
                <div
                    className={`absolute left-[1px] bottom-[1px] w-full h-full ${slotConfig[Grade]} bg-cover bg-[url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_card_grade.png)]`}
                ></div>
                <div className="absolute bottom-3 w-full px-2">
                    <div className="relative w-full aspect-[10/3] bg-[url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] bg-cover overflow-hidden">
                        <div
                            className={`absolute overflow-hidden w-full ${awakeConfig[AwakeCount]} h-full bg-[0_100%] bg-[url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] bg-cover`}
                        ></div>
                    </div>
                </div>
                <NextImage
                    alt={Name}
                    src={Icon}
                    width={100}
                    height={140}
                    className="px-1 py-1"
                />
            </div>
            <span className="relative text-xs pt-1 font-bold">{Name}</span>
        </div>
    );
}

export default function ArmoryCard(props: ArmoryCardProps) {
    const { Cards, Effects } = useRecoilValue(cardsAtom);
    const [cardAwake, setCardAwake] = useState<CardAwake[]>([]);
    const [cardAwakeDetail, setCardAwakeDetail] = useState<CardAwakeDetail[]>(
        []
    );

    useEffect(() => {
        if (!Effects) return;

        setCardAwakeDetail([]);

        Effects.forEach((effect) => {
            effect.Items.forEach((item) => {
                const [, name, set, awake] = item.Name.match(regex) || [];

                if (!name) return;

                setCardAwake((prev) => [
                    ...prev.filter((card) => card.name !== name),
                    {
                        name,
                        set: set ? Number(set) : undefined,
                        awake: awake ? Number(awake) : undefined,
                    },
                ]);

                // 동일한 name이 존재할 경우 effect에 추가
                setCardAwakeDetail((prev) => {
                    const index = prev.findIndex((card) => card.name === name);
                    const newEffect = {
                        name: awake ? `${awake}각성` : `${set}세트`,
                        value: item.Description,
                    };

                    if (index === -1) {
                        return [
                            ...prev,
                            {
                                name,
                                effect: [newEffect],
                            },
                        ];
                    }

                    const updatedCard = {
                        ...prev[index],
                        effect: [...prev[index].effect, newEffect],
                    };

                    return [
                        ...prev.slice(0, index),
                        updatedCard,
                        ...prev.slice(index + 1),
                    ];
                });
            });
        });
    }, [Effects]);

    return (
        <Card className={props.className} bodyStyle={CARD_PADDING}>
            <div className="flex justify-between pb-3">
                <div className="flex items-center gap-3">
                    <span className="strong--5">카드</span>
                    {cardAwake?.map((card) => (
                        <Tag
                            key={card.name}
                            color="default"
                            bordered={false}
                            className="text-sm flex gap-1"
                        >
                            <span className="opacity-75">
                                {card.name && card.name}
                            </span>
                            <span className="opacity-100 font-bold">
                                {card.set && `${card.set}세트`}
                            </span>
                            <span className="opacity-100 font-bold">
                                {card.awake && `${card.awake}각`}
                            </span>
                        </Tag>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-between">
                {Cards.map((card) => (
                    <CardSlot key={card.Name} {...card} />
                ))}
                <CardEffect details={cardAwakeDetail} />
            </div>
        </Card>
    );
}
