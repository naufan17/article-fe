import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Toggle } from "@/components/ui/toggle";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Link as LinkIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  StrikethroughIcon,
  CodeIcon,
  ListOrdered,
  List,
  Undo as UndoIcon,
  Redo as RedoIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      }),
      Underline,
      Link.configure({
        openOnClick: true
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: '<p>Write something...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)      
    }
  }, [content, editor])

  return (
    <div className="w-full border border-slate-200 rounded-md">
      {editor && (
        <>
          <div className="flex bg-white border-b border-slate-200 gap-1 p-1 flex-wrap">
            <Toggle
              pressed={editor.isActive('undo')}
              onPressedChange={() => editor.chain().focus().undo().run()}
              className="flex items-center"
              aria-label="Undo"
            >
              <UndoIcon className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('redo')}
              onPressedChange={() => editor.chain().focus().redo().run()}
              className="flex items-center"
              aria-label="Redo"
            >
              <RedoIcon className="w-4 h-4" />
            </Toggle>
            <Separator orientation="vertical" className="mx-1 bg-slate-200"/>
            <Toggle 
              pressed={editor.isActive('bold')}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className="flex items-center" 
              aria-label="Bold"
            >
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle 
              pressed={editor.isActive('italic')}
              onPressedChange={() => editor.chain().focus().toggleItalic().run()}
              className="flex items-center" 
              aria-label="Italic"
            >
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle 
              pressed={editor.isActive('underline')}
              onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
              className="flex items-center" 
              aria-label="Underline"
            >
              <UnderlineIcon className="w-4 h-4" />
            </Toggle>
            <Toggle 
              pressed={editor.isActive('strike')}
              onPressedChange={() => editor.chain().focus().toggleStrike().run()}
              className="flex items-center" 
              aria-label="Strike"
            >
              <StrikethroughIcon className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('code')}
              onPressedChange={() => editor.chain().focus().toggleCode().run()}
              className="flex items-center"
              aria-label="Code"
            >
              <CodeIcon className="w-4 h-4" />
            </Toggle>
            <Separator orientation="vertical" className="mx-1 bg-slate-200" />
            <Toggle 
              pressed={editor.isActive('text-align', 'left')}
              onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
              className="flex items-center" 
              aria-label="Left"
            >
              <AlignLeft className="w-4 h-4" />
            </Toggle>
            <Toggle 
              pressed={editor.isActive('text-align', 'center')}
              onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
              className="flex items-center" 
              aria-label="Center"
            >
              <AlignCenter className="w-4 h-4" />
            </Toggle>
            <Toggle 
              pressed={editor.isActive('text-align', 'right')}
              onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
              className="flex items-center" 
              aria-label="Right"
            >
              <AlignRight className="w-4 h-4" />
            </Toggle>
            <Toggle 
              pressed={editor.isActive('text-align', 'justify')}
              onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
              className="flex items-center" 
              aria-label="Justify"
            >
              <AlignJustify className="w-4 h-4" />
            </Toggle>
            <Separator orientation="vertical" className="mx-1 bg-slate-200" />
            <Toggle
              pressed={editor.isActive('bulletList')}
              onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
              className="flex items-center"
              aria-label="Bullet List"
            >
              <List className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('orderedList')}
              onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
              className="flex items-center"
              aria-label="Ordered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Toggle>
            <Separator orientation="vertical" className="mx-1 bg-slate-200" />
            <Toggle 
              pressed={editor.isActive('link')}
              onPressedChange={() => {
                const url = editor.isActive('link') ? "" : window.prompt('Enter URL') || "";
                editor.chain().focus().toggleLink({ href: url }).run();
              }}
              className="flex items-center" 
              aria-label="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </Toggle>
          </div>
          <EditorContent editor={editor} className="editor-wrapper"/>
          <div className="text-sm p-4 font-medium text-slate-800">
            {editor.state.doc.content.size -2 } words
          </div>
        </>
      )}
    </div>
  )
}
