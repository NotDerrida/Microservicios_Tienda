# Shopping Cart API

This project is a NestJS application that implements a shopping cart functionality. It allows users to create and manage their shopping carts, including adding, updating, and retrieving cart items.

## Features

- Create a new cart item
- Update existing cart items
- Retrieve cart items

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd ecommerce-cart
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application, run the following command:
```
npm run start
```

The application will be running on `http://localhost:3004`.

### Running Tests

To run the unit tests, use:
```
npm run test
```

For end-to-end tests, use:
```
npm run test:e2e
```

## License

This project is licensed under the MIT License.

ecommerce-cart
├── src
│   ├── main.ts
│   ├── app.module.ts
│   └── cart
│       ├── cart.controller.ts
│       ├── cart.controller.spec.ts
│       ├── cart.service.ts
│       ├── cart.service.spec.ts
│       ├── cart.module.ts
│       ├── dto
│       │   ├── create-cart.dto.ts
│       │   └── update-cart.dto.ts
│       ├── entities
│       │   └── cart.entity.ts
│       └── schemas
│           └── cart.schema.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md

ecommerce-cart/
├── .env                         <-- ←←← Aquí van tus variables de entorno
├── dist/
├── node_modules/
├── src/
│   ├── cart/
│   │   ├── cart.controller.ts
│   │   ├── cart.service.ts
│   │   └── schemas/
│   │       └── cart.schema.ts
│   ├── app.module.ts            <-- ←←← Aquí importas CartModule
│   └── main.ts                  <-- ←←← Aquí cargas .env
├── package.json
└── tsconfig.json