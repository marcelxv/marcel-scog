# Design Document

## Overview

The YouTube video presentation will be integrated into the existing hero section by adding a video presentation card positioned strategically within the current two-column layout. The design will maintain the existing aesthetic while providing an engaging way for visitors to access Marcel's video content.

## Architecture

The video integration will follow a component-based architecture:

- **VideoPresentation Component**: A new reusable component that handles video display and interaction
- **Modal/Overlay System**: For displaying the video without navigation
- **Hero Section Enhancement**: Integration point within the existing hero layout

The implementation will use React's component composition pattern to seamlessly integrate with the existing hero section structure.

## Components and Interfaces

### VideoPresentation Component

```typescript
interface VideoPresentationProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  className?: string;
  variant?: 'card' | 'button' | 'inline';
}
```

**Responsibilities:**
- Display video thumbnail or play button
- Handle click interactions to open video
- Provide loading and error states
- Maintain accessibility standards

### VideoModal Component

```typescript
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}
```

**Responsibilities:**
- Display YouTube video in an overlay
- Handle modal open/close states
- Provide keyboard navigation support
- Ensure responsive video embedding

### Integration Points

The video presentation will be integrated into the hero section in one of these strategic locations:

1. **Below Action Buttons**: Add as a third action item in the button group
2. **Floating Element**: Position as a floating video card near the ID card
3. **Additional Section**: Create a dedicated video section within the hero grid

## Data Models

### Video Configuration

```typescript
interface VideoConfig {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
}
```

### Component State

```typescript
interface VideoState {
  isModalOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
}
```

## Error Handling

### Video Loading Errors
- **Fallback**: Display static thumbnail with external link
- **User Feedback**: Show error message with retry option
- **Graceful Degradation**: Maintain hero section functionality

### Network Issues
- **Timeout Handling**: 10-second timeout for video loading
- **Offline Support**: Cache thumbnail for offline viewing
- **Progressive Enhancement**: Core hero functionality works without video

### Accessibility Errors
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling in modal

## Testing Strategy

### Unit Tests
- Component rendering with different props
- Click event handling
- Modal open/close functionality
- Error state management

### Integration Tests
- Hero section layout with video component
- Responsive behavior across breakpoints
- Video modal interaction flow
- Accessibility compliance

### Visual Regression Tests
- Hero section appearance with video element
- Modal overlay design consistency
- Mobile and desktop layouts
- Dark/light theme compatibility

### Performance Tests
- Component loading time impact
- Video thumbnail loading optimization
- Modal animation performance
- Memory usage during video playback

## Implementation Approach

### Phase 1: Core Component Development
1. Create VideoPresentation component with basic functionality
2. Implement VideoModal with YouTube embed
3. Add basic styling consistent with design system

### Phase 2: Hero Section Integration
1. Identify optimal placement within hero layout
2. Integrate video component without disrupting existing elements
3. Ensure responsive behavior across all breakpoints

### Phase 3: Enhancement and Polish
1. Add hover effects and animations
2. Implement loading states and error handling
3. Optimize for performance and accessibility

### Design System Integration

The video component will use the existing design tokens:

- **Colors**: Primary, secondary, and neutral color palette
- **Typography**: Consistent font weights and sizes
- **Spacing**: Standard spacing scale (4, 8, 12, 16, 24px)
- **Shadows**: Existing shadow system for depth
- **Border Radius**: Consistent with other UI elements (8px, 12px, 16px)

### Responsive Design

- **Mobile (< 768px)**: Compact button or small card format
- **Tablet (768px - 1024px)**: Medium-sized card with thumbnail
- **Desktop (> 1024px)**: Full-featured card with hover effects

The video modal will be fully responsive with appropriate sizing for each breakpoint.