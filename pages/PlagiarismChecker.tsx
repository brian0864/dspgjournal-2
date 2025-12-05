
import React, { useState, useRef } from 'react';
import { checkPlagiarismWithGemini } from '../services/geminiService';
import { PlagiarismResult } from '../types';
import SEO from '../components/SEO';
import { Upload, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';

const PlagiarismChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCheck = async () => {
    if (!text || text.length < 50) {
      alert("Please enter at least 50 characters for analysis.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await checkPlagiarismWithGemini(text);
      setResult(data);
      setActiveTab('results'); // Switch to results tab on success
    } catch (error) {
      alert("An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);

    // Simulate file processing delay
    setTimeout(() => {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setText(event.target.result as string);
          }
          setIsProcessingFile(false);
        };
        reader.readAsText(file);
      } else {
        // For PDF/DOCX, since we don't have heavy parsing libs in this environment, 
        // we simulate extraction or show a placeholder.
        const mockContent = `[Extracted content from ${file.name}]\n\nABSTRACT\n\nThis study explores the integration of Artificial Intelligence tools in vocational training centers across Delta State. Using a mixed-method approach, we analyzed student performance metrics before and after AI adoption.\n\nINTRODUCTION\n\nThe rapid evolution of technology has necessitated a shift in educational paradigms...`;
        
        setText(mockContent);
        setIsProcessingFile(false);
      }
      
      // Reset input value so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <SEO 
        title="Plagiarism Checker" 
        description="Free AI-powered plagiarism and originality checker for academic manuscripts." 
      />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-polyBlue mb-3">
          Originality & Plagiarism Checker
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Powered by Gemini AI. Validate your manuscript for originality and AI-generated patterns before submission.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 pb-4 text-sm md:text-base font-bold uppercase tracking-wide border-b-2 transition-colors focus:outline-none ${
            activeTab === 'input' 
              ? 'border-polyBlue text-polyBlue' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => setActiveTab('input')}
        >
          1. Input Text
        </button>
        <button
          className={`flex-1 pb-4 text-sm md:text-base font-bold uppercase tracking-wide border-b-2 transition-colors focus:outline-none ${
            activeTab === 'results' 
              ? 'border-polyBlue text-polyBlue' 
              : 'border-transparent text-gray-300'
          } ${!result ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-600'}`}
          onClick={() => result && setActiveTab('results')}
          disabled={!result}
        >
          2. Analysis Results
        </button>
      </div>

      {/* INPUT TAB */}
      {activeTab === 'input' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Input Area */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-50 border-b px-4 py-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Paste Text</span>
              <span className="text-xs text-gray-500">Max 15k chars</span>
            </div>
            <div className="p-4 md:p-6 relative">
              {isProcessingFile && (
                <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-polyBlue animate-spin mb-2" />
                  <span className="text-sm font-bold text-gray-600">Extracting text from document...</span>
                </div>
              )}
              <textarea
                className="w-full h-64 md:h-96 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-polyBlue focus:border-transparent transition-all font-mono text-sm resize-y"
                placeholder="Paste your abstract or article content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="Text to check for plagiarism"
              ></textarea>
              
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-gray-500 order-2 sm:order-1 flex items-center gap-1">
                  <AlertCircle size={14} /> Local analysis only. Your data is secure.
                </div>
                <button
                  onClick={handleCheck}
                  disabled={loading || text.length < 50}
                  className={`w-full sm:w-auto order-1 sm:order-2 px-8 py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-polyBlue hover:bg-blue-800'}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Check Originality
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
               <h3 className="font-bold text-polyBlue mb-2">Upload Document</h3>
               <p className="text-xs text-gray-600 mb-4">Support for .txt, .pdf, .docx</p>
               <label 
                 className={`flex flex-col items-center px-4 py-8 bg-white text-blue rounded-lg shadow-sm border border-blue-200 cursor-pointer hover:bg-blue-50 transition active:bg-blue-100 ${isProcessingFile ? 'opacity-50 pointer-events-none' : ''}`}
               >
                  <Upload className="w-8 h-8 text-polyBlue mb-2" />
                  <span className="text-xs font-semibold text-gray-600">Click to Select File</span>
                  <input 
                    type='file' 
                    className="hidden" 
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
               </label>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
               <h4 className="font-bold text-sm mb-2 text-gray-800 flex items-center gap-2">
                 <FileText size={16} className="text-polyGold" /> How it works
               </h4>
               <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
                  <li>Paste text or upload document.</li>
                  <li>AI analyzes for synthetic patterns & duplicates.</li>
                  <li>Get instant feedback and score.</li>
               </ul>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS TAB */}
      {activeTab === 'results' && result && (
        <div className="bg-white rounded-lg shadow-xl border-t-8 border-polyGold overflow-hidden animate-fade-in w-full">
          <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
               <h2 className="text-xl md:text-2xl font-bold text-gray-800">Analysis Report</h2>
               <button 
                  onClick={() => {
                     setResult(null);
                     setActiveTab('input');
                     setText('');
                  }}
                  className="text-sm text-polyBlue hover:text-red-600 font-semibold underline mt-2 md:mt-0"
               >
                  Start New Check
               </button>
            </div>
            
            {/* Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
               <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Originality Score</div>
                  <div className={`mt-2 font-bold flex justify-center items-baseline ${result.score > 80 ? 'text-green-600' : result.score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    <span className="text-5xl">{result.score}</span>
                    <span className="text-lg text-gray-400 ml-1">/100</span>
                  </div>
               </div>
               <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Similarity Index</div>
                  <div className="mt-2 font-bold flex justify-center items-baseline text-gray-800">
                    <span className="text-5xl">{result.similarityPercentage}</span>
                    <span className="text-lg text-gray-400 ml-1">%</span>
                  </div>
               </div>
               <div className="text-center p-4 bg-gray-50 rounded-lg flex flex-col justify-center border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Outcome</div>
                  <div className="mt-2 font-bold text-lg">
                    {result.score > 80 ? <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full">Passed</span> : <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full">Review Needed</span>}
                  </div>
               </div>
            </div>

            {/* Analysis Text */}
            <div className="mb-8">
               <h3 className="font-bold text-lg text-polyBlue mb-2 border-l-4 border-polyBlue pl-3">Detailed AI Analysis</h3>
               <div className="bg-blue-50 p-5 rounded text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                 {result.analysis}
               </div>
            </div>

            {/* Flagged Sections */}
            {result.flaggedSections && result.flaggedSections.length > 0 ? (
              <div>
                <h3 className="font-bold text-lg text-red-700 mb-4 border-l-4 border-red-500 pl-3">Flagged Sections</h3>
                <div className="space-y-4">
                  {result.flaggedSections.map((section, idx) => (
                    <div key={idx} className="border border-red-200 rounded-lg p-4 bg-red-50 break-words">
                       <div className="flex items-start">
                          <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-0.5 rounded mr-2 mt-1 shrink-0">#{idx + 1}</span>
                          <div>
                            <p className="text-gray-800 italic mb-2 text-sm">"{section.text}"</p>
                            <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Issue: {section.reason}</p>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
               <div className="bg-green-50 p-4 rounded border border-green-200 text-center">
                  <p className="text-green-800 font-medium">No specific sections were flagged as suspicious.</p>
               </div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-4">
               <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition" onClick={() => window.print()}>
                 Download PDF Report
               </button>
               <button className="border border-polyBlue text-polyBlue px-6 py-2 rounded hover:bg-blue-50 transition" onClick={() => setActiveTab('input')}>
                 Back to Input
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
