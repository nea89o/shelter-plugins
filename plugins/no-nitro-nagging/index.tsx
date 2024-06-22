export function onLoad() {}

const unloads = [
  shelter.flux.intercept((dispatch) => {
    if (
      dispatch.type === "MESSAGE_CREATE" &&
      dispatch.message?.author?.id == "1" &&
      dispatch.message?.author?.username == "Nitro Notification"
    ) {
      shelter.util.log("Prevented evil from spreading", dispatch);
      return false;
    }
  }),
];

export function onUnload() {
  unloads.forEach((it) => it());
}
