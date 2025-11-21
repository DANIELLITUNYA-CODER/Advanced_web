# Import Graph - Module Dependencies

This document describes the module structure and dependencies for Upload 2 – Modules & State implementation.

## Module Structure

### Entry Point
- **bootstrap.js**: Application entry point, initializes store and router

### Core Utilities
- **utils/pubsub.js**: Event subscription system (no dependencies)
- **utils/deepFreeze.js**: Immutability helper (no dependencies)

### State Management
- **state/store.js**: Immutable store with pub/sub
  - → utils/pubsub.js
  - → utils/deepFreeze.js
  - → state/reducers/formReducer.js
  - → state/reducers/dataReducer.js

- **state/actions.js**: Action constants and creators (no dependencies)

- **state/reducers/formReducer.js**: Form state reducer
  - → state/actions.js

- **state/reducers/dataReducer.js**: Data state reducer
  - → state/actions.js

- **state/selectors/formSelectors.js**: Form state selectors (no dependencies)
- **state/selectors/dataSelectors.js**: Data state selectors (no dependencies)

### Domain Models
- **models/validation.js**: Pure validation functions (no dependencies)
- **models/transform.js**: Pure data transformation functions (no dependencies)

### Services
- **services/api.js**: API service stubs for async data fetching (no dependencies)

### UI Layer
- **ui/View.js**: Base View class with mount/unmount lifecycle (no dependencies)

- **ui/viewFactory.js**: View registry and factory
  - → ui/views/HomeView.js
  - → ui/views/DataView.js
  - → ui/views/FormView.js

- **ui/views/HomeView.js**: Home page view
  - → ui/View.js

- **ui/views/DataView.js**: Data display view
  - → ui/View.js
  - → services/api.js
  - → models/transform.js
  - → state/actions.js
  - → state/selectors/dataSelectors.js

- **ui/views/FormView.js**: Form view with validation
  - → ui/View.js
  - → state/actions.js
  - → state/selectors/formSelectors.js
  - → models/validation.js

### Routing
- **router/route-table.js**: Hash to view ID mapping (no dependencies)

- **router/index.js**: Router with hashchange handling
  - → router/route-table.js
  - → ui/viewFactory.js

## Dependency Graph (Mermaid)

\`\`\`mermaid
graph TD
    Bootstrap[bootstrap.js]
    
    %% Utilities
    PubSub[utils/pubsub.js]
    DeepFreeze[utils/deepFreeze.js]
    
    %% State
    Store[state/store.js]
    Actions[state/actions.js]
    FormReducer[state/reducers/formReducer.js]
    DataReducer[state/reducers/dataReducer.js]
    FormSelectors[state/selectors/formSelectors.js]
    DataSelectors[state/selectors/dataSelectors.js]
    
    %% Models
    Validation[models/validation.js]
    Transform[models/transform.js]
    
    %% Services
    API[services/api.js]
    
    %% UI
    ViewBase[ui/View.js]
    ViewFactory[ui/viewFactory.js]
    HomeView[ui/views/HomeView.js]
    DataView[ui/views/DataView.js]
    FormView[ui/views/FormView.js]
    
    %% Router
    RouteTable[router/route-table.js]
    Router[router/index.js]
    
    %% Bootstrap dependencies
    Bootstrap --> Store
    Bootstrap --> Router
    
    %% Store dependencies
    Store --> PubSub
    Store --> DeepFreeze
    Store --> FormReducer
    Store --> DataReducer
    
    %% Reducer dependencies
    FormReducer --> Actions
    DataReducer --> Actions
    
    %% Router dependencies
    Router --> RouteTable
    Router --> ViewFactory
    
    %% ViewFactory dependencies
    ViewFactory --> HomeView
    ViewFactory --> DataView
    ViewFactory --> FormView
    
    %% View dependencies
    HomeView --> ViewBase
    DataView --> ViewBase
    DataView --> API
    DataView --> Transform
    DataView --> Actions
    DataView --> DataSelectors
    FormView --> ViewBase
    FormView --> Actions
    FormView --> FormSelectors
    FormView --> Validation
    
    %% Styling
    classDef utils fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef state fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef models fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef ui fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef router fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    
    class PubSub,DeepFreeze utils
    class Store,Actions,FormReducer,DataReducer,FormSelectors,DataSelectors state
    class Validation,Transform,API models
    class ViewBase,ViewFactory,HomeView,DataView,FormView ui
    class RouteTable,Router router
\`\`\`

## Key Principles

1. **Pure Functions**: validation.js and transform.js contain only pure functions with no side effects
2. **Immutability**: Store uses deepFreeze to ensure state immutability
3. **Separation of Concerns**: Clear separation between state, UI, domain logic, and routing
4. **Unidirectional Data Flow**: Actions → Reducers → Store → Selectors → Views
5. **Testability**: Pure functions and clear dependencies enable comprehensive unit testing

## Module Statistics

- Total Modules: 21
- Utility Modules: 2
- State Management: 7
- Domain Models: 3
- UI Components: 6
- Routing: 3
- Tests: 4

## Import/Export Pattern

All modules use ES6 module syntax:
- Named exports for utility functions and classes
- Relative imports with .js extensions
- No circular dependencies
- No external dependencies (except Vitest for testing)
