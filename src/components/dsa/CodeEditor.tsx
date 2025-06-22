import React, { useState } from 'react';
import Button from '../ui/Button';
import { Play, Download, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onRun?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here',
  language = 'javascript',
  onRun,
  onLanguageChange,
  className = '',
}) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const handleRunCode = () => {
    // Mock code execution
    const mockOutput = `> Running ${selectedLanguage} code...\n> Compiled successfully\n> Output: \nHello, World!`;
    setOutput(mockOutput);
    
    if (onRun) {
      onRun(code);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadCode = () => {
    const fileExtension = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
    }[selectedLanguage] || 'txt';
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="bg-gray-700 text-white text-sm rounded-md border-0 py-1 px-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCode}
            icon={copied ? <Check size={16} /> : <Copy size={16} />}
            className="text-gray-300 hover:text-white"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadCode}
            icon={<Download size={16} />}
            className="text-gray-300 hover:text-white"
          >
            Download
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRunCode}
            icon={<Play size={16} />}
          >
            Run
          </Button>
        </div>
      </div>
      <div className="relative h-64 md:h-96">
        <textarea
          className="absolute inset-0 bg-gray-900 text-gray-50 font-mono text-sm p-4 w-full h-full resize-none focus:outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        ></textarea>
      </div>
      {output && (
        <div className="mt-4 bg-gray-800 text-gray-200 font-mono text-sm p-4 rounded-lg overflow-auto max-h-64">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;