import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
          <div className="text-center space-y-4 p-6 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10">
            <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
            <p className="text-gray-400">Please try refreshing the page</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
