'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, AlertTriangle, X } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Don't show error boundary for Chrome extension errors
    if (error.message?.includes('chrome.runtime.sendMessage') || 
        error.message?.includes('chrome-extension://')) {
      console.warn('Chrome extension error caught by error boundary, ignoring:', error.message)
      return { hasError: false, error: null, errorInfo: null }
    }
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    this.setState({
      error,
      errorInfo
    })
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  const isChromeExtensionError = error.message.includes('chrome.runtime.sendMessage') || 
                                 error.message.includes('chrome-extension://')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <CardTitle className="text-xl font-bold text-red-400">
            {isChromeExtensionError ? 'Browser Extension Conflict' : 'Something went wrong'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {isChromeExtensionError ? (
                <>
                  A browser extension is causing conflicts with the app. This is likely a wallet or crypto extension.
                  <br /><br />
                  <strong>To fix this:</strong>
                  <br />
                  1. Try disabling browser extensions temporarily
                  <br />
                  2. Use an incognito/private window
                  <br />
                  3. Try a different browser
                </>
              ) : (
                'The Interchain Nexus encountered an unexpected error. This might be due to a browser extension conflict.'
              )}
            </AlertDescription>
          </Alert>

          {process.env.NODE_ENV === 'development' && (
            <details className="text-xs text-gray-400">
              <summary className="cursor-pointer">Technical Details</summary>
              <pre className="mt-2 p-2 bg-gray-800 rounded text-xs overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="flex space-x-2">
            <Button 
              onClick={resetError}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex-1"
            >
              Reload Page
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            If the problem persists, try disabling browser extensions or using a different browser.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Global error handler for unhandled errors
export function setupGlobalErrorHandler() {
  if (typeof window !== 'undefined') {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      // Check if it's a Chrome extension error
      const error = event.reason
      if (error && typeof error === 'object' && error.message) {
        if (error.message.includes('chrome.runtime.sendMessage') || 
            error.message.includes('chrome-extension://')) {
          console.warn('Chrome extension error caught and ignored:', error.message)
          event.preventDefault() // Prevent the error from showing
          return
        }
      }
    })

    // Handle general errors
    window.addEventListener('error', (event) => {
      if (event.error && event.error.message) {
        if (event.error.message.includes('chrome.runtime.sendMessage') || 
            event.error.message.includes('chrome-extension://')) {
          console.warn('Chrome extension error caught and ignored:', event.error.message)
          event.preventDefault()
          return
        }
      }
    })
  }
}