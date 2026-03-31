# Architecture & Admin Module Implementation

This plan outlines the steps required to modularize the application by adding a dedicated Services Layer, building the Admin Dashboard module, and solidifying the Layouts and Routing structure based on the new endpoints provided.

## User Review Required

> [!WARNING]
> Please review the structural changes below. This refactoring will centralize all API interactions into separate Service layer files instead of calling `api.js` directly within components. This improves maintainability significantly.
> Also, confirm that using `src/features/admin/...` instead of `src/modules/admin/...` is acceptable, as it matches the existing pattern for `auth`, `student`, and `recruiter`.

## Proposed Changes

### 1. Service Layer Modularization

We will organize the API interactions into domain-specific service files under `src/services/`.

#### [NEW] [studentService.js](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/services/studentService.js)
- Handle API calls related to Students: `GET /students/me`, `POST /students/profile`, `PUT /students/profile`, `GET /students/me/applications`, etc.

#### [NEW] [recruiterService.js](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/services/recruiterService.js)
- Handle API calls for Recruiters: `POST /companies`, `POST /jobs`, `PUT /jobs/{id}`, `DELETE /jobs/{id}`, `GET /recruiter/jobs`, `GET /jobs/{jobId}/applications`, `PUT /applications/{id}/status`.

#### [NEW] [adminService.js](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/services/adminService.js)
- Handle Admin actions: `GET /admin/dashboard`, `GET /admin/users`, `DELETE /admin/user/{id}`, `GET /admin/jobs`, `DELETE /admin/job/{id}`, `GET /admin/companies`.

#### [MODIFY] [authService.js](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/features/auth/services/authService.js)
- Move existing `authService.js` to the global `src/services/` or keep inside `features/auth`, but standardize it with the `api.js` instance if not done yet.

---

### 2. Admin Feature Module

We will create the Admin Dashboard, Layout, and Pages matching the `features` pattern.

#### [NEW] [AdminLayout.jsx](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/features/admin/layouts/AdminLayout.jsx)
- Extends the layout patten: imports Sidebar, Header, and renders `<Outlet />`.

#### [NEW] [AdminSidebar.jsx](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/features/admin/components/layout/AdminSidebar.jsx) & [AdminHeader.jsx](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/features/admin/components/layout/AdminHeader.jsx)
- Navigation for Dashboard, Manage Users, Manage Companies, Manage Jobs.

#### [NEW] Pages
- `features/admin/pages/Dashboard.jsx`
- `features/admin/pages/Users.jsx`
- `features/admin/pages/Jobs.jsx`
- `features/admin/pages/Companies.jsx`

---

### 3. Application Routing

We will update `AppRoutes.jsx` to accommodate the nested routing accurately as per Layout definitions.

#### [MODIFY] [AppRoutes.jsx](file:///d:/SpringBoot%20Projects/PlacementAutomationandStudentRequirementSystem/frontend/src/routes/AppRoutes.jsx)
- Update role-based routing structure using `React Router`'s nested route capabilities:
  ```jsx
  <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminLayout /></ProtectedRoute>}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="jobs" element={<AdminJobs />} />
    <Route path="companies" element={<AdminCompanies />} />
  </Route>
  ```
- Ensure the Redirection Logic in `RootRedirect.jsx` points correctly to the dashboard paths of respective roles (`/student/dashboard`, `/recruiter/dashboard`, `/admin/dashboard`).

## Open Questions

1. Do you want the Service files to be grouped inside the global `src/services/` directory, or nested inside their respective features (e.g., `src/features/admin/services/adminService.js`)? *Global `src/services/` is generally preferred for reusability.*
2. Is the UI styling for the `Admin Dashboard` and tables expected to follow the existing color schemes/Tailwind structures used in the Student Layout?

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no syntax or React import errors.

### Manual Verification
- Log in manually as an `ADMIN`, navigating through the Sidebar to verify rendering of components and `<Outlet />`.
- Simulate dummy responses in `adminService.js` if the backend isn't ready to test API parsing logic.
