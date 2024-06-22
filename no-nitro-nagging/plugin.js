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

  // plugins/no-nitro-nagging/index.tsx
  var no_nitro_nagging_exports = {};
  __export(no_nitro_nagging_exports, {
    onLoad: () => onLoad,
    onUnload: () => onUnload
  });
  function onLoad() {
  }
  var unloads = [shelter.flux.intercept((dispatch) => {
    if (dispatch.type === "MESSAGE_CREATE" && dispatch.message?.author?.id == "1" && dispatch.message?.author?.username == "Nitro Notification") {
      shelter.util.log("Prevented evil from spreading", dispatch);
      return false;
    }
  })];
  function onUnload() {
    unloads.forEach((it) => it());
  }
  return __toCommonJS(no_nitro_nagging_exports);
})();
