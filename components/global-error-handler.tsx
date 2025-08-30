"use client"

import { useEffect } from 'react'

export function GlobalErrorHandler() {
  useEffect(() => {
    // Suppress Chrome extension errors more aggressively
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || event.error?.message || ''
      
      if (
        errorMessage.includes('chrome.runtime.sendMessage') ||
        errorMessage.includes('chrome-extension://') ||
        errorMessage.includes('Extension context invalidated') ||
        errorMessage.includes('Cannot read properties of undefined')
      ) {
        console.warn('Chrome extension error suppressed:', errorMessage)
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || event.reason?.toString() || ''
      
      if (
        errorMessage.includes('chrome.runtime.sendMessage') ||
        errorMessage.includes('chrome-extension://') ||
        errorMessage.includes('Extension context invalidated') ||
        errorMessage.includes('Cannot read properties of undefined')
      ) {
        console.warn('Chrome extension promise rejection suppressed:', errorMessage)
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }

    // Override console.error to filter out extension errors
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (
        message.includes('chrome.runtime.sendMessage') ||
        message.includes('chrome-extension://') ||
        message.includes('Extension context invalidated')
      ) {
        console.warn('Chrome extension console error suppressed:', message)
        return
      }
      originalConsoleError.apply(console, args)
    }

    // Add error listeners
    window.addEventListener('error', handleError, true)
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError, true)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true)
      console.error = originalConsoleError
    }
  }, [])

  return null
}
