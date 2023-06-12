import { useRecoilValue } from "recoil";
import { collectiblesAtom } from "./character.atom";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

import style from "./_collectibles.module.scss";
import { Card, Tag } from "antd";
import { CARD_PADDING } from "@utils/script/style";

interface CollectiblesTitleProps {
    icon: string;
    title: string;
    point: number;
    maxPoint: number;
    isSelected?: boolean;
    onClick?: () => void;
}

interface CollectibleContentProps {
    type: string;
    point: number;
    maxPoint: number;
    collectiblePoints: CollectiblePoint[];
}

function CollectibleTitle(props: CollectiblesTitleProps) {
    const { icon, title, point, maxPoint, isSelected, onClick } = props;
    return (
        <div
            className={classNames(
                "flex items-center gap-4 p-2 cursor-pointer rounded-md opacity-50 transition-[background-color] hover:bg-surface",
                {
                    "is-active bg-surface": isSelected,
                }
            )}
            onClick={onClick}
        >
            <Image src={icon} width={32} height={32} alt={title} />
            <div className="flex flex-col font-bold">
                <span className="text-base">{title}</span>
                <span className="text-xs">
                    {point} / {maxPoint}
                </span>
            </div>
        </div>
    );
}

function CollectibleContent(props: CollectibleContentProps) {
    const { type, point, maxPoint, collectiblePoints } = props;

    return (
        <Card className="flex-1" bodyStyle={CARD_PADDING}>
            <div className="flex justify-between font-bold text-base mb-2">
                <span>{type}</span>
                <span>
                    {point} / {maxPoint}
                </span>
            </div>
            {collectiblePoints.map((content, index) => (
                <div
                    key={index}
                    className={classNames("opacity-50 flex py-1 font-bold", {
                        [style["is-active"]]:
                            content.Point === content.MaxPoint,
                    })}
                >
                    <Tag
                        color={
                            content.Point === content.MaxPoint
                                ? "success"
                                : "default"
                        }
                    >
                        {index + 1}
                    </Tag>
                    <div className="flex-1">{content.PointName}</div>
                    <div className="flex-1 text-left">
                        {content.MaxPoint === 1 &&
                            content.Point === 1 &&
                            "획득"}
                        {content.MaxPoint > 1 && (
                            <>
                                {content.Point}
                                {content.MaxPoint && <> / {content.MaxPoint}</>}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </Card>
    );
}

export default function Collectibles() {
    const collectibles = useRecoilValue(collectiblesAtom);

    const [selectedCollectible, setSelectedCollectible] =
        useState<CollectiblesEntity>(collectibles[0] ?? {});

    return (
        <div>
            <div className="flex">
                <div className="flex flex-col">
                    <div>성향</div>
                    <div>생활스킬</div>
                </div>
                <div>장식품</div>
            </div>
            <div className="flex sm:flex-row gap-3">
                <div className="sm:flex sm:flex-col sm:w-56 grid grid-cols-2 gap-2">
                    {collectibles.map((collectible) => (
                        <CollectibleTitle
                            key={collectible.Type}
                            icon={collectible.Icon}
                            title={collectible.Type}
                            point={collectible.Point}
                            maxPoint={collectible.MaxPoint}
                            isSelected={
                                collectible.Type === selectedCollectible.Type
                            }
                            onClick={() => setSelectedCollectible(collectible)}
                        />
                    ))}
                </div>
                <CollectibleContent
                    type={selectedCollectible.Type}
                    point={selectedCollectible.Point}
                    maxPoint={selectedCollectible.MaxPoint}
                    collectiblePoints={selectedCollectible.CollectiblePoints}
                />
            </div>
        </div>
    );
}
