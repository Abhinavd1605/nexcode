import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Save } from 'lucide-react';

interface CodeEditorProps {
  problemId: number;
  starterCode?: string;
  onSubmit: (code: string, language: string) => void;
  isSubmitting?: boolean;
}

const LANGUAGES = [
  { value: 'python', label: 'Python', defaultCode: '# Write your solution here\ndef solution():\n    pass' },
  { value: 'cpp', label: 'C++', defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}' },
  { value: 'java', label: 'Java', defaultCode: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}' },
  { value: 'javascript', label: 'JavaScript', defaultCode: '// Write your solution here\nfunction solution() {\n    \n}' },
];

export function CodeEditor({ problemId, starterCode, onSubmit, isSubmitting }: CodeEditorProps) {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(starterCode || LANGUAGES[0].defaultCode);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const lang = LANGUAGES.find(l => l.value === newLanguage);
    if (lang && !starterCode) {
      setCode(lang.defaultCode);
    }
  };

  const handleSubmit = () => {
    onSubmit(code, language);
  };

  return (
    <Card className="bg-gradient-card border-code-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Code Editor</CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40 bg-code-bg border-code-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              variant="success"
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-b-lg overflow-hidden border border-code-border">
          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
              fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}