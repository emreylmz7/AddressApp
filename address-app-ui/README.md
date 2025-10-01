# Address Management Application

Modern Angular address management application with CRUD operations and bulk import functionality.

## Features

- ✅ List all addresses
- ✅ Add new address
- ✅ Edit existing address
- ✅ Delete address
- ✅ Bulk import addresses from text
- ✅ Search/Filter addresses by city, region, street, or warehouse
- ✅ Responsive design (mobile and desktop)
- ✅ Modern UI with smooth animations

## Tech Stack

- **Angular 18.2** - Standalone components with signals
- **TypeScript 5.5**
- **SCSS** - Modern styling
- **RxJS** - Reactive state management
- **HttpClient** - API communication

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── address-list/          # Main list component with search
│   │   ├── address-form/          # Add/Edit form modal
│   │   └── bulk-import/           # Bulk import modal
│   ├── models/
│   │   └── address.model.ts       # TypeScript interfaces
│   ├── services/
│   │   └── address.service.ts     # API service with signals
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.scss
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure API URL in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'  // Update with your API URL
};
```

### Development Server

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes.

### Build

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

Execute unit tests:
```bash
npm test
```

## API Endpoints

The application expects the following REST API endpoints:

- `GET /api/addresses` - Get all addresses
- `POST /api/addresses` - Create new address
- `PUT /api/addresses/{id}` - Update address
- `DELETE /api/addresses/{id}` - Delete address
- `POST /api/addresses/bulk-import` - Bulk import addresses

### Address Model

```typescript
interface Address {
  id: string;
  region: string;
  city: string;
  warehouse: string;
  street: string;
  phone: string;
  workingHours: string;
}
```

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/address-app-ui/browser` directory to Netlify.

## Angular Best Practices Implemented

- ✅ Standalone components
- ✅ Signals for reactive state management
- ✅ Direct service injection with `inject()`
- ✅ Type-safe interfaces
- ✅ Reactive forms with validation
- ✅ Computed signals for derived state
- ✅ Proper error handling
- ✅ SCSS with BEM-like naming
- ✅ Responsive design
- ✅ Performance optimizations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for interview purposes.
