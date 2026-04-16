# 🚀 Placement Automation and Student Requirement System

## 📌 Overview
- The Placement Automation and Student Requirement System is a robust, production-level platform tailored to streamline college placement operations from end to end.
- It solves the real-world problem of disjointed campus recruitment by centralizing job postings, student profiles, and application workflows into one seamless and transparent ecosystem.
- Target users include university students seeking organized job opportunities, corporate recruiters aiming for efficient talent acquisition, and college administrators requiring oversight and streamlined placement management.

## 🎯 Main Objective
- The core purpose of the project is to digitize and automate traditional, manual campus placement processes.
- It exists to significantly reduce the administrative burden on placement cells, provide students with a modern and accessible interface to build profiles, and offer recruiters a structured, reliable channel to screen applicants effectively.
- **Active Automation Pivot**: The system has recently evolved from simple record-keeping to an \"Active\" system that proactively manages the recruitment lifecycle through real-time communication and data aggregation.

## 🛠 Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS 4.2
- **Backend:** Java 21, Spring Boot 4.0.3, Spring Security
- **Database:** PostgreSQL / MySQL (JPA/Hibernate), Neon DB
- **Tools & Platforms:** JWT Authentication, Maven, java-dotenv, Axios, Git

## 🧠 Key Features
- **Student Portal:** Comprehensive profile building including academic tracking, skills highlighting, and transparent job application tracking with real-time status updates.
- **Recruiter Dashboard:** Dedicated interface for managing company profiles, creating detailed job postings with deadline configurations, and dynamically reviewing the application pipeline.
- **Admin Oversight:** Global data visibility, overarching user management capabilities, and full access to monitor application workflows across all companies and students.
- **Automated Workflows:** Strict status transition flow (APPLIED → SHORTLISTED → SELECTED/REJECTED) with structured progress tracking and withdrawal options.
- **Unified SaaS Dashboard**: A centralized mission-control hub that automatically processes raw data into actionable visual metrics and recent activity feeds.
- **Role-Based Notification Engine**: An automated communication layer that pushes real-time updates to students and recruiters, reducing manual status-checking lag.

## 🏗 Architecture Overview
The application is built as a **Decoupled Client-Server Application**, featuring a standalone React Single Page Application (SPA) communicating continuously with a Monolithic Spring Boot REST backend.

- **Standalone Frontend Client:** The React SPA handles all routing (`react-router-dom`), view rendering, state management, and user interactions independently from the backend logic.
- **Monolithic API Server:** The Spring Boot backend exposes endpoints using a strict Layered Architecture (Controller → Service → Repository → Entity).
- **API Communication Workflow:**
  1. **Client Request:** The React frontend (using Axios) fires an HTTP request equipped with a JWT Bearer token.
  2. **Security Interception:** The backend's `JwtAuthenticationFilter` intercepts the API call, validates the token, and establishes the `SecurityContext`.
  3. **Controller Routing:** The request hits the designated `@RestController` which enforces `@PreAuthorize` role validations (e.g., `hasRole('RECRUITER')`).
  4. **Service layer processing:** The Service layer executes business logic, invokes database operations via Spring Data JPA `Repository`, and maps Entity data to DTOs.
  5. **Standardized Response:** A universal `ApiResponse<T>` object (containing `success`, `message`, and `data`) is serialized to JSON and returned to the React UI for rendering.

## 🔌 Backend Details

### 📊 API Overview
- **Total APIs:** ~25
- **Categories:**
  - **Auth APIs:** Registration, Login, Roles, Password Recovery
  - **Student APIs:** Profile creation, targeted updates, and role-based querying
  - **Company APIs:** Organization onboarding, detailed profiling, and overarching management
  - **Job APIs:** Role definitions, skill requirements, and deadline configurations
  - **Application APIs:** Workflow management from applying to status adjustments and tracking

### 📡 Complete API Reference

#### 🔐 Auth APIs (`/api/auth`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| POST | `/api/auth/register` | Registers a new user with a specified role (STUDENT, RECRUITER) |
| POST | `/api/auth/login` | Authenticates a user and generates a JWT |
| POST | `/api/auth/forgot-password` | Initiates the password recovery flow |
| POST | `/api/auth/reset-password` | Resets a user password with a valid token |
| DELETE | `/api/auth/logout` | Revokes the active user session |

#### 👨‍🎓 Student APIs (`/api/students`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| POST | `/api/students/create-profile` | Creates a comprehensive profile, including resume upload |
| PATCH | `/api/students/update-profile` | Partial updates to an existing student profile |
| DELETE | `/api/students/delete-profile` | Removes the authenticated student's profile |
| GET | `/api/students/profile/me` | Retrieves the authenticated student's personalized profile |
| GET | `/api/students/profile/me/resume` | securely fetches the student's resume document |
| GET | `/api/students/{id}` | Fetches details of a specific student (Admin/Recruiters) |
| GET | `/api/students/jobs/for-student` | Recommends/filters jobs tailored to the student's skills |
| GET | `/api/students` | Retrieves a paginated list of all students (Admin) |

#### 🏢 Company APIs (`/api/companies`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| POST | `/api/companies` | Onboards a new company profile |
| GET | `/api/companies` | Fetches all registered corporate profiles |
| GET | `/api/companies/company-profile` | Retrieves the authenticated Recruiter's company details |
| GET | `/api/companies/{companyId}/jobs` | Yields all job postings directly tied to a specified company |

#### 💼 Job APIs (`/api/jobs`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| POST | `/api/jobs` | Creates a structured job posting (Restricted: Recruiter) |
| PUT | `/api/jobs/{id}` | Modifies an existing job posting |
| PUT | `/api/jobs/close-job/{id}` | Forcibly closes a job posting early (halts applications) |
| GET | `/api/jobs` | Fetches a paginated, dynamic list of all open job postings |
| GET | `/api/jobs/company-jobs` | Yields jobs strictly matching the Recruiter's assigned company |
| GET | `/api/jobs/{id}` | Retrieves detailed specifications of a single job opening |

#### 📝 Application APIs (`/api/applications`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| POST | `/api/applications/{jobId}` | Submits a new job application linking a Student and Job |
| PUT | `/api/applications/{id}/status` | Modifies an application's progression state (Recruiter) |
| GET | `/api/applications/applicants/{jobId}` | Lists all student applicants submitted for a specific job |
| GET | `/api/applications/applicant/{studentId}/resume` | Securely retrieves an applicant's resume for screening |
| GET | `/api/applications` | Fetches system-wide applications (Admin) |
| DELETE | `/api/applications/{id}` | Formally withdraws a student's submitted application |
| GET | `/api/applications/student-dashboard` | Yields high-level dashboard metrics (Approved/Pending/Applied) |
| GET | `/api/applications/my-applications` | Yields the chronological application history of a student |

#### 🔔 Notification APIs (`/api/notifications`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| GET | `/api/notifications` | Fetches role-specific notifications and unread count |
| PUT | `/api/notifications/{id}/read` | Marks a specific notification as read |


#### 🛡 User & Admin APIs (`/api/users`, `/api/admin`)
| METHOD | ENDPOINT | DESCRIPTION |
|---|---|---|
| GET | `/api/users` | Global list of all platform users (Admin) |
| GET | `/api/users/{id}` | Details for a specific platform user |
| PUT | `/api/users/{id}/disable` | Restricts login capabilities for an account |
| PUT | `/api/users/{id}/enable` | Restores login capabilities for a suspended account |
| GET | `/api/admin/dashboard` | Aggregates overarching system metrics for the administrative hub |

## 🎨 Frontend Details

### ⚙️ Technologies Used
- **Framework:** React 19 bootstrapped with Vite for instant server start and lightning-fast HMR.
- **State Management:** React Context API & highly modular Custom Hooks.
- **Routing:** React Router DOM v7 for seamless client-side navigation.
- **UI Libraries:** Tailwind CSS 4 for utility-first styling, Lucide React for consistent iconography.

### ✨ UI/UX Features
- **Dynamic Interactions:** Smooth interface transitions, responsive hover states, and intuitive visual feedback on action elements.
- **Responsive Layouts:** Mobile-first, adaptable grid and flexible box model layouts ensuring visual parity across desktops, tablets, and smartphones.
- **Optimized Experience:** Snappy routing and component rendering guarantees a friction-free navigation experience.
- **Robust Validation:** Rigorous, real-time client-side form validation augmented with contextual toast notifications for precise error handling and success feedback.
- **Professional SaaS Aesthetic**: High-contrast dark mode (`#09090b`) with a pinned sidebar/header layout for an enterprise-ready, premium user experience.

## 🗄 Database Schema Overview
- **Users:** The central authentication entity mapped with secure hashed credentials and strict role enumerations.
- **Students:** Detailed one-to-one mapping extending the User entity with deep academic data, contact information, and customized skill alignments.
- **Companies:** Autonomous entities capturing organizational identity, functioning as the foundational root for associative job listings.
- **Jobs:** Opportunistic listings tethered to companies, encapsulating specific responsibilities, salary insights, statuses, and strict application deadlines.
- **Applications:** The critical pivot entity inextricably linking Students to Jobs, featuring temporal tracking and distinct workflow states.

## 🔐 Authentication & Security
- **Stateless JWT:** Implements JSON Web Tokens for highly scalable, secure, and decentralized user session maintenance.
- **Role-Based Access Control (RBAC):** Distinct Controller-level security guards rigorously restricting endpoints to authorized personnel only.
- **Password Encryption:** Industry-grade, highly secure cryptographic hashing eliminating potential vulnerabilities from data breaches.
- **API Protection:** Standardized global exception handling shielding against arbitrary data leakage, reinforced with strict Cross-Origin configurations.

## 📈 Recent Project Impact
- **Recruiter Efficiency**: The automated \"Recent Applicants\" feed saves recruiters significant time by surfacing the latest talent across all job postings in a single view.
- **Engagement Loop**: Real-time notifications have reduced student response times to interview invites by automating the alert lifecycle.
- **UI Stability**: Implementation of deferred chart rendering ensures 100% layout stability and prevents volatile Recharts rendering errors.

## ⚡ Installation & Setup Guide

### 🔧 Backend Setup
```bash
git clone https://github.com/janmejayananda955/Placement_Automation_and_Student_Requirement_System.git
cd backend
mvn clean install
mvn spring-boot:run
```

### 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🌍 Deployment Links
- **Frontend App**: [Placement Automation System](https://janmejaya-placement-automation-system.netlify.app)
- **Backend API**: [Placement Automation Backend](https://placement-automation-and-student.onrender.com)
- **Database**: Neon DB (Serverless Postgres)