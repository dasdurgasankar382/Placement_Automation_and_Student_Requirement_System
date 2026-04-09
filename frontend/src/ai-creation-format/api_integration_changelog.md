# API Integration Changelog

This document tracks all frontend changes related to replacing mock configurations with live Spring Boot backend APIs. 

## Log

### Phase 1: Student Browse Jobs
- **Files Changed:** `src/features/student/pages/Jobs.jsx`
- **What Changed:** 
  - Removed `mockJobs` import.
  - Added `useEffect` fetch logic hitting `GET /jobs` using `api` instance.
  - Mapped backend JSON payload (fields like `role`, `salary`, `skills`) to the component's expected fields (`title`, `salary`, `tags`).
  - Added loading spinner states while data is being fetched.
- **Why:** To populate the Student's "Browse Jobs" page with real live data from the Spring Boot backend instead of static mock files test data.

### Phase 2: Recruiter Create Job
- **Files Changed:** `src/features/recruiter/pages/CreateJob.jsx`
- **What Changed:** 
  - Imported real `createJob` API hook.
  - Removed UI fields (`type`, `location`, `experience`) that were not accepted by the backend JSON schema.
  - Added an HTML `type="date"` input for the required `deadline` field.
  - Formatted the form submission payload to perfectly match (`role`, `salary` as number, `skills` array, `description`, `deadline`).
  - Caught error responses (like 409 role collision or 404 company not found) safely displaying them using `toast.error()`.
- **Why:** Allows recruiters to post real data to `POST /jobs` and receive correct error handling directly from the server.

### Phase 3: Recruiter Add Company
- **Files Changed:** `src/features/recruiter/pages/CompanyProfile.jsx`
- **What Changed:** 
  - Integrated `createCompany` backend hook (`POST /companies`).
  - Cleared out generic hardcoded placeholder start values (like 'Tech Innovators Inc.').
  - Adjusted form state to match (`name`, `location`, `website`, `description`) and removed `email` field since the backend doesn't take it currently.
  - Implemented identical error handling pattern using Toast to catch the 409 'already company registered' error gracefully.
- **Why:** To unblock Recruiter flow. Job postings were failing with 'Company not found', this allows recruiters to define their company first.

### Phase 4: Recruiter View Own Jobs
- **Files Changed:** `src/features/recruiter/services/recruiterService.js`, `src/features/recruiter/pages/JobsList.jsx`
- **What Changed:** 
  - Updated the API service endpoint to point to `GET /jobs/company-jobs` and removed its pending status.
  - Rewrote `JobsList.jsx` to fetch data asynchronously on mount.
  - Safely unwrapped the backend response array (`data.data`) and mapped `role`, `salary`, and `skills` to UI fields (`title`, `tags`, etc.).
  - Added empty state handling if the recruiter has posted 0 jobs.
- **Why:** Allows recruiters to actually see the jobs they created dynamically instead of a hardcoded mock list.

### Phase 5: Recruiter Job Actions (Edit & Close)
- **Files Changed:** `src/features/recruiter/services/recruiterService.js`, `src/routes/AppRoutes.jsx`, `src/components/ui/JobCard.jsx`, `src/features/recruiter/pages/EditJob.jsx` (New), `src/features/recruiter/pages/JobsList.jsx`
- **What Changed:** 
  - Added new backend service functions: `closeJob` (`PUT /jobs/close-job/{id}`) and `updateJob` (`PUT /jobs/{id}`).
  - Modified the shared `JobCard.jsx` to parse and render dynamic `onClose` and `onEdit` action buttons.
  - Implemented the 'Close Job' button straight from `JobsList.jsx` which fires a UI confirmation prompt, calls the backend, and locally filters out the closed job seamlessly on success.
  - Created a brand new `EditJob.jsx` page and added it to the routing. It automatically fetches the specific `jobId` data on mount, pre-fills the recruiter's exact form, and submits an updated `JobRequestDto` payload mapping skills into an array successfully.
- **Why:** Full CRUD lifecycle support for Recruiter listings. Recruiters can now fix mistakes cleanly via a mirrored form or close job positions once filled without reloading the page.

### Phase 6: Universal Job Details Routing (`GET /jobs/{id}`)
- **Files Changed:** `src/components/common/JobDetails.jsx` (New), `src/routes/AppRoutes.jsx`, `src/features/student/pages/Jobs.jsx`, `src/features/admin/pages/Jobs.jsx`
- **What Changed:** 
  - Created a shared, polished `JobDetails` UI component capable of taking a route parameter and fetching the individual job payload.
  - Linked the component in `AppRoutes` to intercept both `/student/jobs/:id` and `/admin/jobs/:id`.
  - Configured conditional rendering so Students see an "Apply For Job" call to action, while Admins simply see the read-only details.
  - Wired the "Apply" button inside the Student jobs list to navigate to this details page instead of throwing a stub alert.
  - Added an "Eye" icon to the Admin Jobs data-table to allow admins to quickly drill into any job posting.
- **Why:** Standardizes the `GET /jobs/{id}` response into a unified detailed view that any authorized role can explore before taking an action.

### Phase 7: Student Job Application (`POST /applications`)
- **Files Changed:** `src/components/common/JobDetails.jsx`, `src/features/student/services/studentService.js`
- **What Changed:** 
  - Updated `studentService.js` to hit the new `POST /applications` API, passing the `{ jobId }` inside the body DTO as expected by the backend controller.
  - Wired the large "Apply For Job" button in `JobDetails.jsx` to correctly trigger this service, applying a loading state (`Applying...`) to prevent double-clicks.
  - Wired `Toast` to capture and gracefully display negative responses like "Job not exists" when the server rejects an application attempt.
- **Why:** Replaces the static JS `alert()` placeholder and allows Students to actively submit their applications straight to the database.
