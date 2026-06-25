import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, Copy, Check, Terminal } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
  showDetails: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
    showDetails: false
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an unhandled rendering crash:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleCopyError = async () => {
    if (!this.state.error) return;
    const errorText = `
Error Message: ${this.state.error.message}
Stack Trace: ${this.state.error.stack || 'No stack trace available'}
Component Stack: ${this.state.errorInfo?.componentStack || 'No component stack available'}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorText);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  private toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev }));
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          id="global-error-root"
          className="min-h-screen bg-[#090d16] text-[#e2e8f0] flex flex-col items-center justify-center p-6 font-sans antialiased relative overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 100%)'
          }}
        >
          {/* Modern mesh alignment ring */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <div 
            id="error-card-container"
            className="w-full max-w-2xl bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-xl relative z-10 shadow-2xl overflow-hidden"
          >
            {/* Soft decorative accent lines */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" />
            
            {/* Error Graphic Header Area */}
            <div id="error-status-header" className="flex flex-col items-center text-center mb-8">
              <div 
                id="error-icon-shield"
                className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400 mb-5 relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-md opacity-50 animate-pulse" />
                <AlertCircle className="w-8 h-8 relative z-10" />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                Console Interruption
              </h1>
              <p className="text-slate-400 text-sm max-w-md">
                The Executive Verification Dashboard encountered an unexpected runtime failure. System integrity remains protected.
              </p>
            </div>

            {/* Error Message Showcase Box */}
            <div 
              id="error-message-box" 
              className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5 mb-8 text-left"
            >
              <div className="flex items-center space-x-2 text-red-400 font-bold font-mono text-[11px] uppercase tracking-wider mb-2">
                <Terminal className="w-4 h-4" />
                <span>Exception Caught</span>
              </div>
              <div className="text-slate-300 font-mono text-xs select-all break-words leading-relaxed">
                {this.state.error?.name || 'Error'}: {this.state.error?.message || 'Unknown runtime error occurred.'}
              </div>
            </div>

            {/* Action Control Panel */}
            <div id="error-action-controls" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                id="btn-error-reload"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-xs font-mono font-medium tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/10 transition-all duration-200 transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RELAUNCH APPLICATION</span>
              </button>

              <button
                id="btn-error-copy"
                onClick={this.handleCopyError}
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700/80 border border-white/5 text-slate-300 rounded-xl text-xs font-mono font-medium tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                {this.state.copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY ERROR LOGS</span>
                  </>
                )}
              </button>
            </div>

            {/* Developer Details Accordion */}
            <div id="error-details-accordion" className="border-t border-white/5 pt-6 text-left">
              <button
                id="btn-error-details-toggle"
                onClick={this.toggleDetails}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center space-x-1.5 focus:outline-none cursor-pointer"
              >
                <span>{this.state.showDetails ? '[-] HIDE DIAGNOSTIC TRACE' : '[+] SHOW DIAGNOSTIC TRACE'}</span>
              </button>

              {this.state.showDetails && (
                <div 
                  id="error-diagnostic-details"
                  className="mt-4 bg-[#05070c] border border-white/5 rounded-2xl p-5 select-text overflow-x-auto max-h-[180px] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent animate-fade-in"
                >
                  <pre className="text-[10px] text-slate-400 font-mono leading-relaxed whitespace-pre">
                    {`Message: ${this.state.error?.message || 'N/A'}\n\nStack:\n${this.state.error?.stack || 'No Stack trace available.'}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack || 'No component stack.'}`}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div id="error-footer-branding" className="mt-8 text-center text-slate-500 font-mono text-[10px] tracking-wider uppercase select-none pointer-events-none">
            SAI TEJA REVURI PORTFOLIO • DIAGNOSTIC CONSOLE
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
