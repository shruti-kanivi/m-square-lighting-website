import React, { useState } from 'react';

export default function ExcelViewer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Load SheetJS from CDN if not already loaded
      if (!window.XLSX) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Load JSZip for reading Excel images
      if (!window.JSZip) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const arrayBuffer = await file.arrayBuffer();
      
      // Extract images from Excel
      const zip = await window.JSZip.loadAsync(arrayBuffer);
      const imageFiles = [];
      const mediaFolder = zip.folder('xl/media');
      
      if (mediaFolder) {
        const imagePromises = [];
        mediaFolder.forEach((relativePath, file) => {
          imagePromises.push(
            file.async('base64').then(base64 => {
              const ext = relativePath.split('.').pop().toLowerCase();
              let mimeType = 'image/png';
              if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
              else if (ext === 'gif') mimeType = 'image/gif';
              else if (ext === 'svg') mimeType = 'image/svg+xml';
              
              imageFiles.push(`data:${mimeType};base64,${base64}`);
            })
          );
        });
        await Promise.all(imagePromises);
      }

      // Parse Excel data
      const workbook = window.XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = window.XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
      
      if (jsonData.length > 0) {
        // Process the data to reorganize columns and group models
        const processedData = processExcelData(jsonData, imageFiles);
        setData(processedData);
        setUploaded(true);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to parse Excel file: ' + err.message);
      setLoading(false);
    }
  };

  const processExcelData = (rawData, images) => {
    const headers = rawData[0];
    const rows = rawData.slice(1);
    
    // Find column indices
    const modelNameIdx = headers.findIndex(h => /model.*name|name/i.test(h));
    const modelNumberIdx = headers.findIndex(h => /model.*number|number|model/i.test(h));
    const wattageIdx = headers.findIndex(h => /watt|power/i.test(h));
    const diameterIdx = headers.findIndex(h => /diameter|dia/i.test(h));
    const heightIdx = headers.findIndex(h => /height|h$/i.test(h));
    const cutoutIdx = headers.findIndex(h => /cutout|cut.*out/i.test(h));
    
    // Group data by model name and assign images
    const modelGroups = {};
    let imageIndex = 0;
    
    rows.forEach((row, idx) => {
      const modelName = row[modelNameIdx] || '';
      
      if (modelName && modelName.trim()) {
        if (!modelGroups[modelName]) {
          modelGroups[modelName] = {
            modelName: modelName,
            image: images[imageIndex] || null,
            variants: []
          };
          imageIndex++;
        }
        
        modelGroups[modelName].variants.push({
          modelNumber: row[modelNumberIdx] || 'Coming Soon',
          wattage: row[wattageIdx] || 'Coming Soon',
          diameter: row[diameterIdx] || 'Coming Soon',
          height: row[heightIdx] || 'Coming Soon',
          cutout: row[cutoutIdx] || 'Coming Soon'
        });
      }
    });
    
    // Convert to flat array for rendering
    const result = [];
    Object.values(modelGroups).forEach(group => {
      group.variants.forEach(variant => {
        result.push({
          modelName: group.modelName,
          image: group.image,
          ...variant
        });
      });
    });
    
    return result;
  };

  const getCellValue = (value) => {
    if (value === null || value === undefined || value === '' || value === 'Coming Soon') {
      return <span className="text-gray-400 italic">Coming Soon</span>;
    }
    return <span className="text-gray-800">{value}</span>;
  };

  if (!uploaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-xl p-12 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Upload Excel File
          </h1>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer block"
            >
              <div className="text-blue-600 text-5xl mb-4">📊</div>
              <div className="text-lg text-gray-700 mb-2">
                Click to upload DIMENSION.xlsx
              </div>
              <div className="text-sm text-gray-500">
                or drag and drop your Excel file here
              </div>
            </label>
          </div>
          {loading && (
            <div className="mt-4 text-center text-blue-600">
              Loading and extracting images...
            </div>
          )}
          {error && (
            <div className="mt-4 text-center text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Product Specifications
          </h1>
          <button
            onClick={() => {
              setUploaded(false);
              setData([]);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Upload New File
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-r border-blue-500">
                    Model Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-r border-blue-500">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-r border-blue-500">
                    Model Number
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-r border-blue-500">
                    Wattage
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-r border-blue-500">
                    Diameter
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-r border-blue-500">
                    Height
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    Cutout
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIdx) => (
                  <tr 
                    key={rowIdx} 
                    className={`${rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 border-b border-gray-200 font-medium text-gray-900">
                      {row.modelName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {row.image ? (
                        <img 
                          src={row.image}
                          alt={row.modelName} 
                          className="max-w-xs max-h-48 h-auto rounded shadow-md"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Coming Soon</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {getCellValue(row.modelNumber)}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {getCellValue(row.wattage)}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {getCellValue(row.diameter)}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {getCellValue(row.height)}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {getCellValue(row.cutout)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-600 text-sm">
          Total Models: {data.length}
        </div>
      </div>
    </div>
  );
}