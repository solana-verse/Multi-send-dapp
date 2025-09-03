import React, { useRef } from 'react';

interface CSVImportProps {
  onImport: (recipients: Array<{ address: string; amount: string }>) => void;
}

export const CSVImport: React.FC<CSVImportProps> = ({ onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText: string) => {
    try {
      const lines = csvText.trim().split('\n');
      const recipients: Array<{ address: string; amount: string }> = [];

      // Skip header if it exists
      const startIndex = lines[0].toLowerCase().includes('address') || lines[0].toLowerCase().includes('amount') ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const [address, amount] = line.split(',').map(item => item.trim().replace(/"/g, ''));
        
        if (address && amount) {
          recipients.push({ address, amount });
        }
      }

      if (recipients.length > 0) {
        onImport(recipients);
        alert(`Successfully imported ${recipients.length} recipients!`);
      } else {
        alert('No valid recipients found in the CSV file. Please check the format.');
      }
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the format and try again.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const csvContent = "address,amount\n7BgBvyjrZX8YKHKPgE9xuFuW4vbMxAQj6G5RRVJx9mGx,0.5\n8CgBvyjrZX8YKHKPgE9xuFuW4vbMxAQj6G5RRVJx9mGy,1.0\n9DhCvyjrZX8YKHKPgE9xuFuW4vbMxAQj6G5RRVJx9mGz,0.25";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipients_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
      <h3 className="text-sm font-medium text-white mb-3 flex items-center space-x-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        <span>Bulk Import</span>
      </h3>
      
      <div className="space-y-3">
        <p className="text-xs text-gray-400">
          Import multiple recipients from a CSV file. Format: address,amount
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span>Import CSV</span>
          </button>
          
          <button
            onClick={downloadTemplate}
            className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};
