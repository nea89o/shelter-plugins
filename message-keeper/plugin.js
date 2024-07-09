(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // plugins/message-keeper/index.tsx
  var message_keeper_exports = {};
  __export(message_keeper_exports, {
    onLoad: () => onLoad,
    onUnload: () => onUnload
  });

  // plugins/message-keeper/types.ts
  var messageReRenderTriggers = [
    "MESSAGE_CREATE",
    "CHANNEL_SELECT",
    "LOAD_MESSAGES_SUCCESS",
    "UPDATE_CHANNEL_DIMENSIONS",
    "MESSAGE_END_EDIT",
    "MESSAGE_UPDATE"
  ];
  function getMessageStore() {
    return shelter.flux.storesFlat.MessageStore;
  }

  // plugins/message-keeper/index.css
  var message_keeper_default = `
.nea-deleted-message {
    background: rgba(80%, 10%, 20%, 40%);
} 

`;

  // plugins/message-keeper/index.tsx
  var {
    flux
  } = shelter;
  var unintercept = flux.intercept(block);
  var uninjectCss = shelter.ui.injectCss(message_keeper_default);
  function onLoad() {
    for (const trigger of messageReRenderTriggers)
      flux.dispatcher.subscribe(trigger, onReRenderEvent);
  }
  var oldTimeStamp = "2001-09-11T12:46:30.000Z";
  function block(payload) {
    if (payload.type !== "MESSAGE_DELETE")
      return;
    let messageStore = getMessageStore();
    if (!messageStore)
      return;
    let storedMessage = messageStore.getMessage(payload.channelId, payload.id);
    if (!storedMessage)
      return;
    let replacementPayload = {
      type: "MESSAGE_UPDATE",
      guildId: payload.guildId,
      message: {
        ...storedMessage.toJS(),
        edited_timestamp: oldTimeStamp
      }
    };
    paintRed(storedMessage.channel_id, storedMessage.id);
    return replacementPayload;
  }
  function paintRed(channelId, messageId) {
    let dom = document.getElementById(`chat-messages-${channelId}-${messageId}`);
    if (!dom)
      return;
    dom.classList.add("nea-deleted-message");
  }
  function onReRenderEvent(payload) {
    if (payload.type === "CHANNEL_SELECT" || payload.type === "UPDATE_CHANNEL_DIMENSIONS") {
      let channel = payload.channelId;
      let messages = getMessageStore()?.getMessages(channel);
      if (!messages)
        return;
      for (const message of messages._array) {
        if (message.editedTimestamp?.toISOString() === oldTimeStamp)
          paintRed(message.channel_id, message.id);
      }
    }
  }
  function onUnload() {
    unintercept();
    uninjectCss();
    for (const trigger of messageReRenderTriggers)
      flux.dispatcher.unsubscribe(trigger, onReRenderEvent);
  }
  return __toCommonJS(message_keeper_exports);
})();
