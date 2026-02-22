# Glacier

Glacier is a high-performance, offline-first personal finance desktop application. It is built with a strictly decoupled architecture focusing on data privacy, local execution, and rapid UI responsiveness.

## Architecture

The system is divided into two core domains operating within a single compiled native binary using Wails:

* **Iceberg (Backend):** A standalone Go application utilizing an embedded SQLite database. It handles all system I/O, local storage, and business logic.
* **Polar (Frontend):** A standalone Angular workspace that handles state management and user interface presentation.

Communication between Iceberg and Polar is handled natively via Inter-Process Communication (IPC), bypassing traditional HTTP overhead.

## Prerequisites

Ensure the following dependencies are installed on your development machine:

* [Go](https://go.dev/dl/) (v1.21 or newer)
* [Node.js](https://nodejs.org/en/) (v18 or newer) and npm
* [Angular CLI](https://angular.io/cli) (Install globally via `npm install -g @angular/cli`)
* [Wails CLI](https://wails.io/docs/gettingstarted/installation) (v2.4.0 or newer)
* A C-Compiler (Required for `go-sqlite3` CGO bindings. Windows requires MinGW-w64; Linux/macOS utilize built-in `gcc`).

## Development Setup

1. Clone the repository and navigate to the project root.
2. Ensure the `polar` dependencies are installed:
   ```bash
   cd polar
   npm install
   cd ..
   ```
3. Run the application in development mode with live reloading:
   ```bash
   wails dev
   ```

## Build for Production

To compile Glacier into a single, standalone executable for your operating system:

```bash
wails build -upx
```
The compiled binary will be available in the `build/bin/` directory.

## License

This project is licensed under the PolyForm Noncommercial License 1.0.0. See the LICENSE.md file for details.