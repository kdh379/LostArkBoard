import { SkinFilled, SkinOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import Image from "next/image";

import style from "./_character.module.scss";
import { useRecoilValue } from "recoil";
import { profileAtom } from "./character.atom";
import { useEffect, useState } from "react";

const DEFAULT_PROFILE_IMAGE: { [key: string]: string } = {
    마법사: "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/magician.png",
    ["무도가(여)"]:
        "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/fighter.png",
    ["무도가(남)"]: "",
    ["전사(남)"]:
        "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/warrior.png",
    스페셜리스트:
        "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/specialist.png",
    ["헌터(남)"]:
        "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/hunter.png",
    암살자: "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/delain.png",
};

export function Profile() {
    const [defaultProfileImage, setDefaultProfileImage] = useState<string>("");

    const {
        CharacterClassName,
        CharacterImage,
        CharacterLevel,
        CharacterName,
        ExpeditionLevel,
        GuildName,
        ItemAvgLevel,
        PvpGradeName,
        ServerName,
        Title,
        TownLevel,
        TownName,
    } = useRecoilValue(profileAtom);

    const HEADER_INFO_LIST = [
        ServerName,
        `Lv.${CharacterLevel}`,
        CharacterClassName,
    ];

    const EXTRA_INFO_LIST = [
        { name: "원정대", value: `Lv.${ExpeditionLevel}` },
        { name: "PVP", value: PvpGradeName },
        { name: "길드", value: GuildName },
        { name: "영지", value: `Lv.${TownLevel ?? "0"} ${TownName}` },
    ];

    useEffect(() => {
        setDefaultProfileImage(DEFAULT_PROFILE_IMAGE[CharacterClassName]);
    }, [CharacterClassName]);

    // Image 확대
    return (
        <div className="flex relative overflow-x-clip bg-background">
            <div className="flex flex-col gap-3 z-20 my-2">
                <div className="flex">
                    {HEADER_INFO_LIST.map((info, index) => (
                        <div className="flex gap-2 items-center" key={index}>
                            <Tag className="text-sm font-bold px-2 py-1">
                                {info}
                            </Tag>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="strong--2">{CharacterName}</span>
                    <span className="opacity-50 font-bold">{Title}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <SkinFilled className="strong--2" />
                    <span className="strong--2">{ItemAvgLevel}</span>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                    {EXTRA_INFO_LIST.map((info, index) => (
                        <div className="flex items-center text-sm" key={index}>
                            <Tag className="xl:w-14 w-20 text-center">
                                {info.name}
                            </Tag>
                            <span className="opacity-50">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style["character-image"]}>
                {CharacterImage !== "" && (
                    <Image
                        className="object-cover object-top absolute"
                        src={CharacterImage ?? defaultProfileImage}
                        alt={CharacterName}
                        width={600}
                        height={600}
                        priority
                    />
                )}
            </div>
        </div>
    );
}
