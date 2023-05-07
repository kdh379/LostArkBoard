import { SkinFilled, SkinOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import Image from "next/image";

import style from "./_character.module.scss";
import { useRecoilValue } from "recoil";
import { profileAtom } from "./character.atom";

export function Profile() {
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
        { name: "영지", value: `Lv.${TownLevel} ${TownName}` },
    ];

    // Image 확대
    return (
        <div className="flex relative h-72 overflow-x-clip">
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
                            <Tag className="w-14 text-center">{info.name}</Tag>
                            <span className="opacity-50">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style["character-image"]}>
                {CharacterImage !== "" && (
                    <Image
                        className="object-cover object-top"
                        src={CharacterImage}
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
