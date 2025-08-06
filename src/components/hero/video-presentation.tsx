'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { VideoModal } from './video-modal';
import { VideoErrorBoundary } from './video-error-boundary';

// TypeScript interfaces for video configuration
export interface VideoConfig {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
}

export interface VideoPresentationProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  className?: string;
  variant?: 'card' | 'button' | 'inline';
  onVideoClick?: (videoId: string) => void;
}

export interface VideoState {
  isModalOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
  networkError: boolean;
  retryCount: number;
  isImageLoaded: boolean;
}

export function VideoPresentation({
  videoId,
  title,
  thumbnail,
  className = '',
  variant = 'card',
  onVideoClick,
}: VideoPresentationProps) {
  const [videoState, setVideoState] = useState<VideoState>({
    isModalOpen: false,
    isLoading: false,
    hasError: false,
    networkError: false,
    retryCount: 0,
    isImageLoaded: false,
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  // Network connectivity check
  const checkNetworkConnectivity = useCallback(async (): Promise<boolean> => {
    try {
      // Try to fetch a small resource to check connectivity
      const response = await fetch('https://www.youtube.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
      });
      return true;
    } catch {
      // If fetch fails, check navigator.onLine as fallback
      return navigator.onLine;
    }
  }, []);

  // Enhanced error handling with retry logic
  const handleVideoError = useCallback(
    (error: Error | string) => {
      console.error('Video presentation error:', error);

      setVideoState(prev => ({
        ...prev,
        hasError: true,
        isLoading: false,
        networkError: typeof error === 'string' && error.includes('network'),
      }));

      // Announce error to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Video loading failed. ${title} is currently unavailable.`;
      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    [title]
  );

  // Retry mechanism with exponential backoff
  const handleRetry = useCallback(async () => {
    const maxRetries = 3;
    const currentRetry = videoState.retryCount;

    if (currentRetry >= maxRetries) {
      handleVideoError('Maximum retry attempts reached');
      return;
    }

    setVideoState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false,
      networkError: false,
      retryCount: prev.retryCount + 1,
    }));

    // Check network connectivity first
    const isConnected = await checkNetworkConnectivity();
    if (!isConnected) {
      handleVideoError('network connectivity issue');
      return;
    }

    // Exponential backoff delay
    const delay = Math.pow(2, currentRetry) * 1000;

    retryTimeoutRef.current = setTimeout(() => {
      setVideoState(prev => ({
        ...prev,
        isLoading: false,
        hasError: false,
      }));
    }, delay);
  }, [videoState.retryCount, checkNetworkConnectivity, handleVideoError]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoClick = useCallback(async () => {
    // Reset error state and start loading
    setVideoState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false,
      networkError: false,
    }));

    try {
      // Check network connectivity before attempting to load video
      const isConnected = await checkNetworkConnectivity();
      if (!isConnected) {
        throw new Error('No network connection available');
      }

      // Call the optional callback
      if (onVideoClick) {
        onVideoClick(videoId);
      }

      // Brief loading state for better UX
      setTimeout(() => {
        setVideoState(prev => ({
          ...prev,
          isModalOpen: true,
          isLoading: false,
        }));
      }, 150);
    } catch (error) {
      handleVideoError(
        error instanceof Error ? error.message : 'Failed to load video'
      );
    }
  }, [videoId, onVideoClick, checkNetworkConnectivity, handleVideoError]);

  const handleCloseModal = useCallback(() => {
    setVideoState(prev => ({ ...prev, isModalOpen: false }));

    // Return focus to the video trigger element
    if (buttonRef.current) {
      buttonRef.current.focus();
    } else if (componentRef.current) {
      const triggerElement = componentRef.current.querySelector(
        '[role="button"], button'
      ) as HTMLElement;
      if (triggerElement) {
        triggerElement.focus();
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleVideoClick();
      }
    },
    [handleVideoClick]
  );

  // Handle image loading states
  const handleImageLoad = useCallback(() => {
    setVideoState(prev => ({ ...prev, isImageLoaded: true }));
  }, []);

  const handleImageError = useCallback(() => {
    setVideoState(prev => ({
      ...prev,
      hasError: true,
      isImageLoaded: false,
    }));
  }, []);

  // Generate YouTube thumbnail URL if not provided
  const thumbnailUrl =
    thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Base classes using design system tokens
  const baseClasses = `
    relative overflow-hidden cursor-pointer group
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    dark:focus:ring-primary-400 dark:focus:ring-offset-accent-500
    ${videoState.isLoading ? 'pointer-events-none' : ''}
  `;

  // Variant-specific styling using design system
  const variantClasses = {
    card: `
      bg-white dark:bg-neutral-100 rounded-xl shadow-md hover:shadow-xl
      border border-neutral-200 dark:border-neutral-300
      hover:scale-105 hover:border-primary-300 dark:hover:border-primary-600
      hover:-translate-y-1 p-4 max-w-sm
      hover:shadow-lg dark:hover:shadow-xl
    `,
    button: `
      bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800
      text-white rounded-lg px-5 py-2.5 font-medium text-sm
      shadow-sm hover:shadow-md dark:shadow-sm dark:hover:shadow-md
      hover:scale-[1.02] transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    inline: `
      bg-neutral-100 dark:bg-neutral-200 rounded-lg
      hover:bg-neutral-200 dark:hover:bg-neutral-300
      hover:scale-102 p-2
    `,
  };

  if (variant === 'button') {
    return (
      <VideoErrorBoundary
        onError={(error, errorInfo) => {
          console.error('Video button component crashed:', error, errorInfo);
        }}
      >
        <button
          ref={buttonRef}
          onClick={handleVideoClick}
          onKeyDown={handleKeyDown}
          className={`${baseClasses} ${variantClasses.button} ${className}`}
          aria-label={`Play video: ${title}${videoState.hasError ? ' (currently unavailable)' : ''}`}
          aria-describedby={`video-button-description-${videoId}`}
          disabled={
            videoState.isLoading ||
            (videoState.hasError && videoState.retryCount >= 3)
          }
        >
          <div className="flex items-center justify-center gap-1.5">
            {videoState.isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span className="transition-all duration-300">
              {videoState.hasError ? 'Video Unavailable' : title}
            </span>
          </div>
        </button>

        {/* Hidden description for screen readers */}
        <div id={`video-button-description-${videoId}`} className="sr-only">
          {videoState.hasError
            ? `Video presentation is currently unavailable. ${videoState.networkError ? 'Please check your internet connection.' : 'Please try again later.'}`
            : 'Opens video presentation in a modal dialog'}
        </div>

        {/* Video Modal */}
        <VideoModal
          isOpen={videoState.isModalOpen}
          onClose={handleCloseModal}
          videoId={videoId}
          title={title}
        />
      </VideoErrorBoundary>
    );
  }

  return (
    <VideoErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Video component crashed:', error, errorInfo);
        // Could send to error reporting service here
      }}
    >
      <div
        ref={componentRef}
        onClick={handleVideoClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Play video: ${title}${videoState.hasError ? ' (currently unavailable)' : ''}`}
        aria-describedby={`video-description-${videoId}`}
        aria-expanded={videoState.isModalOpen}
        aria-disabled={
          videoState.isLoading ||
          (videoState.hasError && videoState.retryCount >= 3)
        }
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {/* Video thumbnail */}
        <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-200 rounded-lg overflow-hidden mb-3">
          {thumbnailUrl && !videoState.hasError && (
            <Image
              src={thumbnailUrl}
              alt={`${title} video thumbnail`}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                videoState.isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          )}

          {/* Image loading placeholder */}
          {!videoState.isImageLoaded && !videoState.hasError && (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-300 animate-pulse flex items-center justify-center">
              <svg
                className="w-8 h-8 text-neutral-400 dark:text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="bg-white bg-opacity-90 group-hover:bg-opacity-100 rounded-full p-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
              {videoState.isLoading ? (
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-6 h-6 text-primary-600 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* Error state with enhanced accessibility */}
          {videoState.hasError && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-200"
              role="alert"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="text-center text-neutral-600 dark:text-neutral-500 p-4">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-neutral-500 dark:text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {videoState.networkError ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v6m0 8v6m8-10h-6m-8 0h6"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  )}
                </svg>
                <p className="text-sm font-medium mb-1">
                  {videoState.networkError
                    ? 'Connection Issue'
                    : 'Video Unavailable'}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-3">
                  {videoState.networkError
                    ? 'Please check your internet connection'
                    : 'The video content is temporarily unavailable'}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleRetry}
                    disabled={videoState.retryCount >= 3}
                    className="px-3 py-1 text-xs bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
                    aria-label={`Retry loading video (attempt ${videoState.retryCount + 1} of 3)`}
                  >
                    {videoState.retryCount >= 3
                      ? 'Max retries reached'
                      : 'Try Again'}
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1"
                    aria-label="Watch video on YouTube (opens in new tab)"
                  >
                    Watch on YouTube
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {videoState.isLoading && (
            <div className="absolute inset-0 bg-white dark:bg-neutral-100 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-text-600 dark:text-text-700 font-medium">
                  Loading video...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Video title and description */}
        <div className="text-center">
          <h3 className="font-semibold text-text-900 dark:text-text-900 mb-1 transition-colors duration-300">
            {title}
          </h3>
          <p
            id={`video-description-${videoId}`}
            className="text-sm text-text-600 dark:text-text-700 transition-colors duration-300"
          >
            Watch Marcel&apos;s presentation
            {videoState.hasError && (
              <span className="block text-xs text-red-600 dark:text-red-400 mt-1">
                {videoState.networkError
                  ? 'Connection issue'
                  : 'Currently unavailable'}
              </span>
            )}
          </p>

          {/* Subtle interaction hint */}
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="inline-flex items-center text-xs text-primary-600 dark:text-primary-700 font-medium">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Click to play
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <VideoModal
          isOpen={videoState.isModalOpen}
          onClose={handleCloseModal}
          videoId={videoId}
          title={title}
        />
      </div>
    </VideoErrorBoundary>
  );
}
