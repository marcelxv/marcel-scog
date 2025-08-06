'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

interface ModalState {
  isVideoLoaded: boolean;
  hasVideoError: boolean;
  isClosing: boolean;
}

export function VideoModal({
  isOpen,
  onClose,
  videoId,
  title,
}: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [modalState, setModalState] = useState<ModalState>({
    isVideoLoaded: false,
    hasVideoError: false,
    isClosing: false,
  });

  // Enhanced close handler with animation
  const handleClose = useCallback(() => {
    setModalState(prev => ({ ...prev, isClosing: true }));

    // Delay actual close to allow animation
    setTimeout(() => {
      onClose();
      setModalState({
        isVideoLoaded: false,
        hasVideoError: false,
        isClosing: false,
      });
    }, 150);
  }, [onClose]);

  // Handle video loading states
  const handleVideoLoad = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isVideoLoaded: true,
      hasVideoError: false,
    }));
  }, []);

  const handleVideoError = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      hasVideoError: true,
      isVideoLoaded: false,
    }));

    // Announce error to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Video failed to load. ${title} is currently unavailable.`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [title]);

  // Enhanced keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }

      // Tab trapping within modal
      if (event.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Add event listener for keyboard navigation
      document.addEventListener('keydown', handleKeyDown);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      // Focus the close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Announce modal opening to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Video modal opened. ${title} is now playing.`;
      document.body.appendChild(announcement);

      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';

      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose, title]);

  // Handle click outside modal to close
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  // Generate YouTube embed URL with proper parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2
            id="video-modal-title"
            className="text-lg font-semibold text-neutral-900 dark:text-white truncate pr-4"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close video modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video container with responsive aspect ratio */}
        <div
          className="relative w-full"
          style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}
        >
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
