type HttpReqRes<T_Res = unknown, T_Req = unknown, T_Param = unknown> = {
    response: T_Res;
    request?: T_Req;
    params?: T_Param;
};

export interface APIInterface {
    "character.armories": HttpReqRes<
        ArmoriesEntity,
        undefined,
        { characterName: string }
    >;
    "news.events": HttpReqRes<EventEntity[]>;
    "news.notices": HttpReqRes<NoticeEntity[]>;
    "game-contents.calendar": HttpReqRes<GameContentsEntity[]>;
}
