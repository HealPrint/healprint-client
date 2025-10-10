# TypeScript Types Organization

This folder contains all centralized TypeScript type definitions for the HealPrint application.

## File Structure

```
types/
├── auth.types.ts        # Authentication and user types
├── chat.types.ts        # Chat and conversation types
├── marketplace.types.ts # Product and marketplace types
├── common.types.ts      # Common/shared types
└── index.ts             # Central export point
```

## Usage

Import types from the centralized `@/types` barrel export:

```typescript
import type { User, ChatMessage, Product } from '@/types';
```

### ✅ Good Practice

```typescript
// Import from centralized types
import type { User, LoginCredentials } from '@/types';

function login(credentials: LoginCredentials): Promise<User> {
  // ...
}
```

### ❌ Bad Practice

```typescript
// Don't define types inline or in component files
interface User {  // ❌ Duplicate type definition
  id: string;
  email: string;
}
```

## Type Categories

### Auth Types (`auth.types.ts`)
- `User` - User profile data
- `LoginCredentials` - Login form data
- `SignupData` - Registration form data
- `AuthResponse` - Authentication API response
- `AuthContextType` - Auth context interface

### Chat Types (`chat.types.ts`)
- `ChatMessage` - Individual chat message
- `ChatResponse` - Chat API response
- `Message` - Message with metadata
- `ConversationHistory` - Full conversation data
- `ConversationSummary` - Conversation preview
- `ChatHistoryContextType` - Chat history context interface

### Marketplace Types (`marketplace.types.ts`)
- `Product` - Product details
- `CartItem` - Item in shopping cart
- `OrderData` - Order information
- `FilterOptions` - Product filtering options
- `MarketplaceState` - Marketplace state
- `MarketplaceContextType` - Marketplace context interface

### Common Types (`common.types.ts`)
- `ApiError` - API error structure
- `Config` - Application configuration
- `ToastProps` - Toast notification props
- `HealthProfile` - User health profile data

## Guidelines

1. **Single Source of Truth**: All types should be defined once in the appropriate category file
2. **Use Type Imports**: Always use `import type { ... }` for type-only imports
3. **Barrel Exports**: Import from `@/types` instead of individual files
4. **Naming Convention**: Use PascalCase for interfaces and types
5. **Documentation**: Add JSDoc comments for complex types

## Adding New Types

1. Determine the appropriate category file
2. Add the type definition with JSDoc comments if needed
3. Export it from the category file
4. Add it to `index.ts` barrel export
5. Update this README if adding a new category

## Example

```typescript
// types/auth.types.ts
/**
 * Represents a user's session data
 */
export interface UserSession {
  userId: string;
  token: string;
  expiresAt: string;
}

// types/index.ts
export type {
  User,
  LoginCredentials,
  UserSession,  // Add new type here
} from './auth.types';

// Usage in components
import type { UserSession } from '@/types';

function validateSession(session: UserSession): boolean {
  // ...
}
```

## Benefits

- **Consistency**: Same types used across the entire application
- **Maintainability**: Update types in one place
- **IntelliSense**: Better autocomplete and type checking
- **Refactoring**: Easier to refactor and track type usage
- **Documentation**: Centralized reference for all app types

