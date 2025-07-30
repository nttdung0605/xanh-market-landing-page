import { useState, useEffect } from 'react';
import { blogService } from '@/services/blog-api';

const TestMock = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testMockService = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Testing mock service directly...');
      const response = await blogService.getBlogs();
      console.log('Mock service response:', response);
      setResult(response);
    } catch (err) {
      console.error('Mock service error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testMockService();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Mock Service Test</h3>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {result && (
        <div>
          <p>Success! Found {result.data?.items?.length || 0} blogs</p>
          <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <button 
        onClick={testMockService}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Again
      </button>
    </div>
  );
};

export default TestMock;