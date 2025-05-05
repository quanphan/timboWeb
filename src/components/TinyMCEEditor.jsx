import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';

export default function TinyMCEEditor({ label, value, onChange }) {
    const editorRef = useRef(null);
    const [mode, setMode] = useState('edit'); // edit | preview

    return (
        <div className="mb-6">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <div className="space-x-2 text-sm font-semibold text-gray-600">
                        <button
                            onClick={() => setMode('edit')}
                            className={`px-3 py-1 rounded ${mode === 'edit' ? 'bg-orange-500 text-white' : ''}`}
                        >
                            Editor
                        </button>
                        <button
                            onClick={() => setMode('preview')}
                            className={`px-3 py-1 rounded ${mode === 'preview' ? 'bg-orange-500 text-white' : ''}`}
                        >
                            Preview
                        </button>
                    </div>
                </div>
            )}

            <div className="border border-gray-300 rounded overflow-hidden">
                {mode === 'edit' ? (
                    <Editor
                        apiKey="r7e8euknt2ra68lf1sbova1xglxyzr92b3se177p2nw0urhd"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        value={value}
                        onEditorChange={(newValue) => onChange(newValue)}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'link', 'lists', 'code', 'preview', 'fullscreen',
                                'autolink', 'searchreplace', 'visualblocks',
                            ],
                            toolbar:
                                'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | code fullscreen preview',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                ) : (
                    <div className="p-4 prose prose-sm max-w-full bg-gray-50 rounded" dangerouslySetInnerHTML={{ __html: value }} />
                )}
            </div>
        </div>
    );
}
