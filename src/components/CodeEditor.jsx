import Editor from '@monaco-editor/react';
import { useRef, useEffect } from 'react';
import { FaCopy, FaShare } from 'react-icons/fa';

const CodeEditor = ({ value, onChange, theme, errorLine, onCopyCode, onShareCode }) => {
  const isDark = theme === 'dark';
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);
  
  const handleEditorChange = (value) => {
    onChange(value);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // Highlight error line
  useEffect(() => {
    if (editorRef.current && errorLine) {
      const editor = editorRef.current;
      
      // Remove previous decorations
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
        {
          range: new window.monaco.Range(errorLine, 1, errorLine, 1),
          options: {
            isWholeLine: true,
            className: 'errorLineDecoration',
            glyphMarginClassName: 'errorLineGlyph',
            linesDecorationsClassName: 'errorLineGutter',
          },
        },
      ]);

      // Scroll to error line
      editor.revealLineInCenter(errorLine);
    } else if (editorRef.current) {
      // Clear decorations when no error
      editorRef.current.deltaDecorations(decorationsRef.current, []);
      decorationsRef.current = [];
    }
  }, [errorLine]);

  return (
    <div className={`h-full w-full flex flex-col shadow-inner transition-colors duration-300 ${
      isDark ? 'bg-[#1e1e1e]' : 'bg-white'
    }`}>
      <div className= "px-5 py-3 flex items-center justify-around" >
      
        <div className="flex items-center gap-3 ">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
          </div>
          <span className={`font-semibold text-sm ml-2 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>script.js</span>
        </div>
        
        {/* Copy and Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCopyCode();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              isDark
                ? 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Copy Code"
          >
            <FaCopy className="text-xs text-blue-500" />
            Copy
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onShareCode();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              isDark
                ? 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Share Code (Ctrl+S)"
          >
            <FaShare className="text-xs text-orange-500" />
            Share
          </button>
        </div>
      
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={isDark ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            showUnused: false,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            fontSize: 15,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontLigatures: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
