// Simple test file to verify VideoPresentation component functionality
// This will be expanded in task 7 with proper testing framework

import React from 'react';
import { VideoPresentation } from './video-presentation';
import type { VideoPresentationProps } from './video-presentation';

// Test component props
const testProps: VideoPresentationProps = {
  videoId: 'kEAG_xi9glE',
  title: "Marcel's Presentation",
  variant: 'card',
};

// Verify component can be instantiated with different variants
const cardVariant = <VideoPresentation {...testProps} variant="card" />;
const buttonVariant = <VideoPresentation {...testProps} variant="button" />;
const inlineVariant = <VideoPresentation {...testProps} variant="inline" />;

// Verify component accepts optional props
const withCallback = (
  <VideoPresentation
    {...testProps}
    onVideoClick={videoId => console.log('Video clicked:', videoId)}
    thumbnail="custom-thumbnail.jpg"
    className="custom-class"
  />
);

// Verify TypeScript interfaces are properly exported
export type TestVideoConfig = import('./video-presentation').VideoConfig;
export type TestVideoState = import('./video-presentation').VideoState;

console.log('VideoPresentation component test compilation successful');
