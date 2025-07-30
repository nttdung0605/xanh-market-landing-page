import { useQuery } from '@tanstack/react-query';

const SimpleTest = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      console.log('Simple test queryFn called');
      return { message: 'Hello from React Query!' };
    },
  });

  return (
    <div className="p-4 border rounded bg-yellow-100">
      <h3 className="text-lg font-bold mb-4">React Query Test</h3>
      
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default SimpleTest;