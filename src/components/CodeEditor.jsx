import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, theme }) => {
  const isDark = theme === 'dark';
  
  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <div className={`h-full w-full flex flex-col shadow-inner transition-colors duration-300 ${
      isDark ? 'bg-[#1e1e1e]' : 'bg-white'
    }`}>
      <div className= "px-5 py-3 flex items-center justify-between" >
      
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
      
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={value}
          onChange={handleEditorChange}
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
