# Polar

Polar is the Angular-based frontend interface for the Glacier desktop application. It provides the user interface for both personal finance management and small business inventory tracking.

## Architecture Role

Polar serves as the UI layer that communicates with the Go backend via the Wails bridge.

* State Management: Handles user transitions between Personal and Store profiles.
* Data Visualization: Renders financial trends and inventory stock levels.
* Security: Interfaces with the backend's type-safe sqlc engine.

## Getting Started

To run the frontend within the desktop environment with hot-reloading:

1. Ensure the Wails CLI is installed.
2. From the root project directory, run:
   wails dev

To test UI components in isolation:

1. Navigate to the frontend directory.
2. Run:
   npm install
   ng serve
3. Navigate to http://localhost:4200/ in your browser.

## Project Structure

* src/app/: Contains the core logic for profile switching and dashboards.
* wailsjs/: Contains the auto-generated TypeScript bindings for the Go backend.
