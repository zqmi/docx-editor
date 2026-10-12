import type { LineRecord, ResolvedRunStyle } from '../layout/index.ts';
import { DEFAULT_RUN_STYLE } from '../layout/run-style.ts';

/**
 * Zero-width space kept inside the empty-line host so a CJK IME has a real text node to
 * attach its composition to. Paint-only — composition readback strips it before diffing.
 */
export const EMPTY_LINE_HOST_ZWSP = '\u200b';

/** Give lines without text a native composition anchor. */
export function appendEmptyLineAnchor(
  element: HTMLElement,
  line: LineRecord,
  scale: number,
  style: ResolvedRunStyle,
  applyFont: (style: ResolvedRunStyle) => void
): void {
  if (line.spans.length !== 0) return;
  // An IME inserts into an empty line. A zero font size hides both the preedit text and the
  // native caret. Populated lines retain their zero strut.
  //
  // A lone `<br>` is enough for Latin `beforeinput`, but Windows CJK IMEs often fail to
  // park composition glyphs on a line whose only child is `<br>` — especially beside a list
  // marker. Confirming then leaves `compositionend.data` with nothing painted to read back,
  // which is the empty / numbered-item Chinese-input failure (#190 and Onsites desk reports).
  // A text-bearing host keeps the preedit on the line so readback (and the user) see it.
  applyFont({
    ...DEFAULT_RUN_STYLE,
    fontFamily: style.fontFamily,
    fontSizePt: style.fontSizePt,
    bold: style.bold,
    italic: style.italic,
  });
  const host = element.ownerDocument.createElement('span');
  host.dataset.docxEmptyLineHost = '';
  host.setAttribute('data-docx-empty-line-host', '');
  host.style.lineHeight = `${line.box.height * scale}px`;
  host.append(element.ownerDocument.createTextNode(EMPTY_LINE_HOST_ZWSP));
  element.append(host);
}
