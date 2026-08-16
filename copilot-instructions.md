# Copilot Instructions for Expo React Native Projects

## Core principles

- Follow the installed Expo SDK and React Native versions exactly. When using Expo-specific APIs, verify behavior against the matching versioned documentation before implementing.
- Prefer TypeScript everywhere and keep types explicit for props, route params, API responses, and domain models.
- Keep code simple, readable, and maintainable. Favor small reusable components and focused modules over large screens with mixed responsibilities.
- Match the existing project conventions before introducing new abstractions or patterns.
- Do not add unnecessary dependencies or duplicate utilities that already exist in the app.

## Expo and React Native standards

- Use Expo Router for app navigation when the project already follows file-based routing.
- Prefer native-first and Expo-supported APIs over custom or browser-only patterns unless the feature is explicitly web-focused.
- Keep Android/iOS parity in mind, but use platform-aware logic only when necessary.
- Use theme tokens, spacing constants, and shared UI primitives instead of hardcoded values.
- Respect lifecycle patterns for splash screens, app readiness, permissions, deep linking, and app state changes.
- Keep performance in mind, especially for list-heavy screens, animations, image loading, and async work.

## Data fetching and server state

- Use React Query for all server data, cache management, refetching, and mutation workflows.
- Keep query keys descriptive and stable; use consistent patterns for list/detail fetches and invalidations.
- Put data-fetching logic in reusable hooks or service modules rather than inside components.
- Handle loading, error, and empty states explicitly in the UI.
- For remote resources, keep responsibilities separated by feature:
	- `features/<resource>/api.ts` owns the backend contract, endpoint paths, request types, and HTTP functions.
	- `features/<resource>/hooks.ts` owns TanStack Query hooks, query keys, pagination, cache behavior, and conversion of API failures into thrown query errors.
	- `features/<resource>/schema.ts` owns Zod validation for form values and server responses.
	- Screens own presentation and user interaction only: loading, empty, error, refresh, list rendering, and navigation.
- Prefer a feature-specific hook when a screen contains reusable query behavior such as pagination, sorting, filtering, or cache invalidation.
- Keep UI concerns out of hooks and raw HTTP details out of screens. Query keys must include every parameter that affects the result.
- Prefer optimistic updates and targeted invalidations over broad refetches when appropriate.
- Do not store server state in Redux when React Query already owns the data lifecycle; Redux should be reserved for app-level state, not remote cache state.

## Forms and validation

- Use React Hook Form for form state management and input handling in all UI forms.
- Combine it with Zod schemas for validation and type-safe form definitions.
- Prefer schema-driven validation over ad hoc custom checks spread across components.
- Keep validation messages user-friendly and localized where the app supports localization.
- Ensure forms handle loading, disabled states, touched/dirty states, and accessibility appropriately.
- Avoid duplicating validation logic across multiple form fields or components.

## State management

- Use Redux Toolkit when the app needs reliable global state for user preferences, navigation state, or cross-screen app state.
- Keep Redux slices small, focused, and domain-oriented.
- Separate Redux state from server-fetched data: Redux should hold only app-level, durable state, while React Query handles remote data, caching, invalidation, and request lifecycle.
- Do not store server responses, query cache data, form state, or transient UI state in Redux.
- Prefer selectors and typed hooks over direct store access in components.
- Do not create redundant global state when local component state or React Query is the better fit.

## UI and styling

- Keep styling consistent with the existing design system, theme, and component library.
- Prefer reusable UI primitives and composition patterns over repeated inline styles.
- Keep accessibility in mind: semantic structure, touch targets, contrast, and screen-reader support should be considered for all interactive elements.
- Favor design tokens and shared color/spacing values over ad hoc styling.
- Minimize platform-specific styling unless it is required for correct UX or behavior.

## Architecture and code quality

- Separate concerns clearly: UI, domain logic, API/data access, validation, and shared utilities should live in appropriate modules.
- Keep business logic outside of presentation components when it can be reused or tested independently.
- Prefer composition over inheritance and avoid over-abstracting patterns that are not reused.
- Use descriptive names, avoid magic numbers, and document non-obvious logic.
- Prefer minimal, explicit changes over broad rewrites.

## Reliability and app stability

- Guard against null and invalid runtime state, especially in navigation, route params, and async data.
- Handle errors gracefully for network failures, permission denials, and unexpected API responses.
- Clean up subscriptions and effects correctly to avoid memory leaks and stale state.
- Keep side effects predictable and avoid doing expensive work in render functions.
- Ensure code is stable in both development and production-like scenarios.

## Security and performance

- Never hardcode secrets, tokens, or sensitive values in application code.
- Fetch only the data that is needed and avoid storing unnecessary data locally.
- Optimize images, fonts, and media for mobile performance.
- Minimize unnecessary renders and expensive computations, especially inside lists or frequently updated screens.
- Respect user privacy and avoid collecting or exposing data beyond what is required.

## Validation and tooling

- Keep the codebase lint-clean, TypeScript-safe, and aligned with the project’s existing scripts and tooling.
- Prefer existing project conventions and config instead of creating one-off patterns.
- When changing behavior, validate with the smallest relevant checks, such as linting, type-checking, or a focused app run.
- If a feature requires native configuration or platform-specific setup, call it out clearly and keep the scope narrow.

## Project-specific guidance

- Follow the app’s theming, localization, and component abstractions instead of introducing one-off patterns.
- Preserve the repo’s existing Expo architecture and keep new code aligned with the current stack and folder structure.
- Use the repository-level instructions in adjacent config files as the source of truth for project-specific constraints.
- If you find a useful pattern, rule, or project convention worth adding to this file while developing the app, ask me before updating it so we can keep the guidance intentional and aligned with the project.
- When new libraries are installed or major architectural changes are introduced, ask me before adding new rules to this file so we can review the impact together.
- If a task is ambiguous, choose the simplest correct solution that fits the current architecture and explains the tradeoff clearly when a larger refactor would be needed.
