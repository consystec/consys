import Promises from 'consys/Promises';
import uuid from 'consys/uuid';
const clipboard = new Promises();

document.body.onpaste = function (e) {
  const filesFromClipboard = [];
  var items = e.clipboardData.items;
  if (items) {
    for (var i = 0; i < items.length; ++i) {
      const itemFile = items[i];
      if (itemFile.kind == 'file' &&
        itemFile.type.indexOf('image/') !== -1) {
        const id = uuid();
        const file = itemFile.getAsFile();
        const name = id + "." + itemFile.type.split("/")[1];
        const blob = new File([file], name, { type: file.type });
        blob.uid = id;
        filesFromClipboard.push(blob);
      }
    }
    if (filesFromClipboard.length > 0) {
      clipboard.resolve(filesFromClipboard);
    }
  }
}
export default clipboard.promise();