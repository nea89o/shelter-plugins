import { AnyDispatchPayload, getMessageStore, getSelectedChannelStore, messageReRenderTriggers } from './types';
import css from './index.css';
const { flux, } = shelter;

const unintercept = flux.intercept(block)
const uninjectCss = shelter.ui.injectCss(css)

export function onLoad() {
	for (const trigger of messageReRenderTriggers)
		flux.dispatcher.subscribe(trigger, onReRenderEvent)
}

const oldTimeStamp = "2001-01-01T00:00:00.069Z"

function block(payload: AnyDispatchPayload) {
	if (payload.type !== "MESSAGE_DELETE")
		return
	let messageStore = getMessageStore()
	let storedMessage = messageStore.getMessage(payload.channelId, payload.id)
	if (!storedMessage) return
	let replacementPayload: AnyDispatchPayload = {
		type: "MESSAGE_UPDATE",
		guildId: payload.guildId,
		message: { ...storedMessage.toJS(), edited_timestamp: oldTimeStamp }
	}
	paintRed(storedMessage.channel_id, storedMessage.id)
	return (replacementPayload)
}

function paintRed(channelId: string, messageId: string) {
	let dom = document.getElementById(`chat-messages-${channelId}-${messageId}`)
	if (!dom) return
	dom.classList.add("nea-deleted-message")
}

function onReRenderEvent(payload: AnyDispatchPayload) {
	if (payload.type === "CHANNEL_SELECT" || payload.type === "UPDATE_CHANNEL_DIMENSIONS") {
		let channel = payload.channelId;
		let messages = getMessageStore().getMessages(channel)
		for (const message of messages._array) {
			if (message.editedTimestamp?.toISOString() === oldTimeStamp)
				paintRed(message.channel_id, message.id)
		}
	}
}

export function onUnload() {
	unintercept()
	uninjectCss()
	for (const trigger of messageReRenderTriggers)
		flux.dispatcher.unsubscribe(trigger, onReRenderEvent)
}
