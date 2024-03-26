import { FluxStore } from "@uwu/shelter-defs"


export type MessageDelete = {
    id: string,
    channelId: string,
    guildId: string | undefined,
}

export type MessageCreate = {
    id: string,
    content: string | null,
    channelId: string
}
export type Member = {}
export type User = {
    avatar: string,
    bot: boolean,
    discriminator: string,
    id: string,
    username: string,
    globalName: string | null,
    publicFlags: number,
}
export type ApiMessage = {
    guild_id: string | null,
    channel_id: string,
    type: number,
    id: string,
    member: Member | null,
    content: string,
    edited_timestamp: string | Date, // string timestamp: 2024-03-26T11:11:18.246468+00:00 	
    flags: number,
    author: User
}
export type MessageUpdate = {
    guildId: string | null,
    message: ApiMessage,
}

export type DispatchPayload<name extends string, T> = {
    type: name
} & T;

export type AnyDispatchPayload =
    DispatchPayload<"MESSAGE_DELETE", MessageDelete> |
    DispatchPayload<"MESSAGE_CREATE", MessageCreate> |
    DispatchPayload<"MESSAGE_UPDATE", MessageUpdate> |
    DispatchPayload<"CHANNEL_SELECT", {
        channelId: string,
        jumpType: any,
        guildId: null | string,
    }> |
    DispatchPayload<"LOAD_MESSAGES_SUCCESS", {}> |
    DispatchPayload<"UPDATE_CHANNEL_DIMENSIONS", {
        channelId: string,
        offsetHeight: any,
        scrollHeight: any,
        scrollTop: any,
    }> |
    DispatchPayload<"MESSAGE_END_EDIT", {}> |
    DispatchPayload<"", {}>

export const messageReRenderTriggers: Array<AnyDispatchPayload["type"]> = [
    "MESSAGE_CREATE",
    "CHANNEL_SELECT",
    "LOAD_MESSAGES_SUCCESS",
    "UPDATE_CHANNEL_DIMENSIONS",
    "MESSAGE_END_EDIT",
    "MESSAGE_UPDATE",
];
type ClientMessage = {
    content: string,
    channel_id: string,
    editedTimestamp: Date,
    id: string,
    timestamp: Date,
    messageReference: {
        channel_id: string,
        guild_id: string,
        message_id: string,
    },
    toJS(): ApiMessage
}

export type ChannelMessages = {
    channelId: string,
    ready: boolean,
    _array: Array<ClientMessage>,
    jumpTargetId: string | null,
    jumpTargetOffset: number
    jumpSequenceId: number
    jumped: boolean
    jumpedToPresent: boolean
    jumpType: "ANIMATED" | string,
    error: boolean,
    hasMoreAfter: boolean
    hasMoreBefore: boolean
    hasFetched: boolean
    jumpReturnTargetId: string | null,
    loadingMore: boolean
    revealedMessageId: string | null,
    get(messageId: string): ClientMessage | undefined
    forEach(func: (message: ClientMessage, index: number) => void): void
}

export type SelectedChannelStore = {
    getCurrentlySelectedChannelId(): string | undefined
}

export function getSelectedChannelStore(): FluxStore<SelectedChannelStore> {
    return shelter.flux.storesFlat.SelectedChannelStore as FluxStore<SelectedChannelStore>
}

export type MessageStore = {
    getLastMessage()
    getLastEditableMessage()
    getMessage(channelId: string, messageId: string): ClientMessage | undefined
    getLastCommandMessage()
    focusedMessageId()
    getMessages(channelId: string): ChannelMessages
    hasCurrentUserSentMessage()
    hasCurrentUserSentMessageSinceAppStart()
    hasPresent()
    isLoadingMessages()
    isReady()
    jumpedMessageId()
}


export function getMessageStore(): FluxStore<MessageStore> {
    return shelter.flux.storesFlat.MessageStore as FluxStore<MessageStore>
}