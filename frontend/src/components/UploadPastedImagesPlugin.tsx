import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

const uploadKey = new PluginKey('history');
export type UploadFn = (image: File) => Promise<any>;

const UploadPastedImagesPlugin = (upload: UploadFn) =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        // Adjust decoration positions to changes made by the transaction
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this);
        if (action && action.add) {
          // Lower image opacity to indicate uploading process
          const widget = document.createElement('img');
          widget.setAttribute('class', 'opacity-40');
          widget.src = action.add.src;
          const deco = Decoration.widget(action.add.pos, widget, {
            id: action.add.id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(null, null, (spec) => spec.id == action.remove.id)
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
      handleDOMEvents: {
        paste(view, event) {
          pasteHandler(view, event, upload);
        },
      },
    },
  });

const pasteHandler = (view, event, upload) => {
  // Get the data of clipboard
  const clipboardItems = event?.clipboardData?.items;
  if (!clipboardItems) return false;
  const items = Array.from(clipboardItems).filter((item: any) => {
    // Filter the image items only
    return item.type.indexOf('image') !== -1;
  });
  if (items.length === 0) {
    return false;
  }

  const item: any = items[0];
  const file = item.getAsFile();
  if (!file) {
    return false;
  }
  if (event?.clipboardData?.types.includes('text/rtf')) {
    // Do not convert pasted rtf to image
    return false;
  }
  startImageUpload(view, file, upload);
  event.preventDefault();
  return true;
};

function findPlaceholder(state, id) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec) => spec.id == id);
  return found.length ? found[0].from : null;
}

function startImageUpload(view, file, upload) {
  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos: tr.selection.from,
        src: reader.result,
      },
    });
    view.dispatch(tr);
  };

  upload(file).then((src) => {
    const pos = findPlaceholder(view.state, id);
    // If the content around the placeholder has been deleted, drop
    // the image
    if (pos == null) return;
    // Otherwise, insert it at the placeholder's position, and remove
    // the placeholder
    view.dispatch(
      view.state.tr
        .replaceWith(pos, pos, view.state.schema.nodes.image.create({ src }))
        .setMeta(uploadKey, { remove: { id } })
    );
  });
}

export default UploadPastedImagesPlugin;