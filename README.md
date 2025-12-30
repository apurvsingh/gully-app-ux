# Gully Configuration Angular App

This project is a small Angular application that allows users to **configure and visualize a gully** using real-world dimensions and optionally persist the configuration to a [backend API](https://github.com/apurvsingh/GullyBackendService).

---

## Features

- Parameter-driven gully visualization using **SVG**
- Real-time updates as inputs change
- Bottom-up water fill visualization
- Logical validation of physical constraints
- Template-driven form with validation feedback
- Save gully configuration to backend via HTTP API

---

## Gully Parameters

All measurements are entered in **centimeters (cm)**:

- **Height** – total gully height
- **Width** – internal gully width
- **Pipe Height** – vertical position of pipe center from gully bottom
- **Pipe Diameter** – diameter of the pipe
- **Water Height** – water level inside the gully
- **Name** – identifier for the gully configuration

---

## Validation Rules

The application enforces **logical, real-world constraints** in addition to required-field validation:

- Water height cannot exceed gully height
- Pipe diameter cannot exceed gully height
- Pipe must fit completely inside the gully  
  `(pipeHeight ± pipeDiameter / 2 must be within gully height)`

Invalid configurations:
- Are visually blocked from rendering
- Display clear validation messages
- Cannot be saved to the backend

---

## Architecture Overview

## SVG Rendering Strategy

- SVG is used instead of HTML/CSS for accurate, scalable geometry
- A fixed scale is applied:  
  `1 cm = 4 px`
- The gully body, water level, pipe, and pipe walls are all rendered as SVG primitives

---

## Backend Integration

- Gully configurations are persisted via an HTTP `POST` request
- API endpoint:
  ```
  POST https://localhost:7129/api/v1/gullies
  ```
- Communication is handled via a dedicated Angular service
- Requests and responses are strongly typed
- Backend Solution can be found [here](https://github.com/apurvsingh/GullyBackendService)
---

## Project Structure

```
src/
├── app/
│   ├── gully/
│   │   ├── gully.component.ts
│   │   ├── gully.component.html
│   │   ├── gully.component.css
│   │   └── gully.service.ts
│   ├── models/
│   │   └── gully.model.ts
│   └── app.module.ts
```

---

## Running the Application

### Prerequisites

- Node.js (LTS) version>= v22.12.0
- Angular CLI version 18.2.21
- Backend API running locally (optional)

### Steps

```bash
npm install
ng serve
```

Navigate to:

```
http://localhost:4200
```

If you want backend support, ensure the backend API is running at:

```
https://localhost:7129
```
---
