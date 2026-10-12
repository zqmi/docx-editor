'use client';

import { useEffect } from 'react';
import { useDocxEditor } from '@zqmi/docx-editor-react';
import type { DocxEditorInstance } from '@zqmi/docx-editor-core/editor';

export function EditorBridge({
  onEditor,
}: {
  onEditor: (editor: DocxEditorInstance | null) => void;
}) {
  const editor = useDocxEditor();
  useEffect(() => {
    onEditor(editor);
    return () => onEditor(null);
  }, [editor, onEditor]);
  return null;
}
