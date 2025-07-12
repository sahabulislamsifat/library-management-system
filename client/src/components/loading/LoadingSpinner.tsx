const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-purple-300 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-purple-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
