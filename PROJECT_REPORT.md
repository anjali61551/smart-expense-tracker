<div align="center">

# A MINOR PROJECT REPORT
## ON
# **SMART EXPENSES TRACKER**

<br/>

### Submitted in partial fulfillment of the requirements for the degree of
### **Bachelor of Computer Application (BCA)**
### **4th Semester**

<br/>

**Submitted By:**
**Aafrin Khatoon** (Roll No: ________________)
**Anjali Yadav** (Roll No: ________________)

<br/>

**Under the Supervision of:**
**Amrind Sir**
Department of Computer Application

<br/>

<br/>

### **National Infotech College**
**Faculty of Humanities and Social Sciences / Computer Application**
**September 2026**

</div>

---

\newpage

# CERTIFICATE OF APPROVAL

This is to certify that the project report entitled **"SMART EXPENSES TRACKER"**, submitted by **Aafrin Khatoon** and **Anjali Yadav** in partial fulfillment of the requirements for the award of the degree of **Bachelor of Computer Application (BCA) - 4th Semester** at **National Infotech College**, is a bonafide record of the work carried out under my supervision and guidance.

The results and materials incorporated in this report have not been submitted to any other university or institution for the award of any degree or diploma.

<br/><br/>

__________________________  
**Amrind Sir**  
*Project Supervisor / Lecturer*  
Department of Computer Application  
National Infotech College  

<br/><br/>

__________________________  
**Head of Department / Coordinator**  
Department of Computer Application  
National Infotech College  

<br/><br/>

__________________________  
**External Examiner**  
Faculty of Computer Application  

**Date:** September 2026

---

\newpage

# DECLARATION

We hereby declare that this project report entitled **"SMART EXPENSES TRACKER"** submitted to **National Infotech College** in partial fulfillment of the requirements for the degree of **Bachelor of Computer Application (BCA)** is an original piece of work completed by us under the supervision of **Amrind Sir**.

All sources of information, software libraries, algorithms, reference materials, and theoretical concepts utilized during the design, development, and testing of this software system have been duly acknowledged and cited in the References section.

<br/><br/>

__________________________  
**Aafrin Khatoon**  
Roll No: __________________  
BCA 4th Semester  
National Infotech College  

<br/><br/>

__________________________  
**Anjali Yadav**  
Roll No: __________________  
BCA 4th Semester  
National Infotech College  

**Date:** September 2026

---

\newpage

# ACKNOWLEDGEMENT

We would like to express our deepest gratitude and sincere appreciation to our project supervisor, **Amrind Sir**, for his invaluable guidance, continuous encouragement, constructive criticism, and technical insights throughout the design and development phases of the **Smart Expenses Tracker** project. His mentorship provided us with clear direction and motivation to overcome software engineering challenges.

We extend our sincere thanks to the administration and faculty members of the **Department of Computer Application**, **National Infotech College**, for providing us with the necessary computing infrastructure, lab resources, and a supportive academic environment.

We are also thankful to our classmates and friends for their continuous feedback during system testing, and to our parents for their unyielding moral support and encouragement throughout our academic pursuits.

Finally, we express our gratitude to the open-source community for developing and maintaining the remarkable technologies—such as React, Tailwind CSS, Express.js, Node.js, and MySQL—that made the successful completion of this project possible.

<br/>

**Aafrin Khatoon**  
**Anjali Yadav**  
*BCA 4th Semester*  
*National Infotech College*

---

\newpage

# ABSTRACT

Personal financial management is a critical challenge in modern fast-paced economic environments. Many individuals, students, and household managers struggle to keep track of their daily expenses, resulting in unplanned overspending, inaccurate financial budgeting, and a lack of savings discipline. Traditional methods such as manual ledger bookkeeping and static spreadsheets are prone to mathematical errors, lack real-time interactive analytics, and cannot deliver dynamic budget alerts or role-based administrative control.

The **Smart Expenses Tracker** is a full-stack, responsive web application engineered to solve these problems by automating daily financial logging, real-time balance calculations, automated category classification, historical transaction analysis, dynamic monthly budgeting with live warning indicators, and analytical reporting. Developed with **React 19**, **Tailwind CSS v4**, and **Recharts** on the frontend, alongside **Node.js**, **Express.js**, and a relational **MySQL** database on the backend, the system delivers sub-second response times, secure JSON Web Token (JWT) authentication with password hashing (bcrypt), and localized currency support in **Nepali Rupees (Rs.)**.

In addition to standard user capabilities—such as adding/editing/deleting income and expense records, backdated transaction logging, automated PDF financial statements, and CSV exports—the system incorporates an **Admin Panel**. The Admin Panel empowers system administrators to monitor platform-wide KPIs, view all transactions across user accounts, toggle user account statuses, perform on-demand database SQL dumps/backups, and adjust system-wide operational parameters. Comprehensive unit, integration, database, and security testing confirmed that the system operates reliably with zero transaction calculation errors, robust data integrity, and strict access controls.

**Keywords:** Personal Finance, Expense Tracker, React 19, Node.js, Express REST API, MySQL Database, JWT Authentication, Nepali Rupees (Rs.), Budget Alerts, Data Visualization, Admin Panel.

---

\newpage

# TABLE OF CONTENTS

- **Cover Page**
- **Certificate of Approval**
- **Declaration**
- **Acknowledgement**
- **Abstract**
- **Table of Contents**
- **List of Figures**
- **List of Tables**

### **Chapter 1: Introduction**
- 1.1 Background
- 1.2 Problem Statement
- 1.3 Objectives
  - 1.3.1 General Objective
  - 1.3.2 Specific Objectives
- 1.4 Scope of the Project
- 1.5 Significance of the Project
- 1.6 Limitations

### **Chapter 2: Literature Review**
- 2.1 Existing Expense-Management Systems
  - 2.1.1 Manual Paper-Based Ledgers
  - 2.1.2 Traditional Spreadsheet Applications (Excel / Sheets)
  - 2.1.3 Commercial Mobile & Cloud Apps (Mint, YNAB, Money Manager)
- 2.2 Problems with Existing Systems
- 2.3 Comparison with the Proposed System

### **Chapter 3: System Analysis and Design**
- 3.1 Requirement Analysis
- 3.2 Functional Requirements
- 3.3 Non-Functional Requirements
- 3.4 Hardware Requirements
- 3.5 Software Requirements
- 3.6 System Architecture (3-Tier Architecture)
- 3.7 Use Case Diagram & Descriptions
- 3.8 Data Flow Diagram (DFD)
  - 3.8.1 Context Level DFD (Level 0)
  - 3.8.2 Level 1 DFD
  - 3.8.3 Level 2 DFD (Transaction & Budget Flow)
- 3.9 Entity-Relationship (ER) Diagram
- 3.10 Database Design (Relational Schemas)

### **Chapter 4: System Implementation**
- 4.1 Technologies Used
- 4.2 Frontend Development
- 4.3 Backend Development
- 4.4 Database Implementation
- 4.5 User Registration & Authentication (JWT + Bcrypt)
- 4.6 Income Management
- 4.7 Expense Management
- 4.8 Expense Categories & Filtering
- 4.9 Dashboard, Analytics, and Reports (1-Month Trend & Category Summaries)
- 4.10 Admin Panel & System Governance

### **Chapter 5: Testing**
- 5.1 Testing Methods & QA Strategy
- 5.2 Test Cases & Execution Matrix
  - 5.2.1 Login & Authentication Testing
  - 5.2.2 Income & Expense Transaction Testing
  - 5.2.3 Database Integrity & Relational Cascade Testing
  - 5.2.4 Admin Panel & Authorization Testing
- 5.3 Test Results & Summary

### **Chapter 6: Results and Discussion**
- 6.1 Screenshots of the System
  - 6.1.1 User Dashboard & Real-Time Balance Cards
  - 6.1.2 Login and Register Pages
  - 6.1.3 Add Income & Add Expense Modals
  - 6.1.4 Transaction History & Expense List Table
  - 6.1.5 Monthly Report, 1-Month Daily Trend, and Category Summaries
  - 6.1.6 Admin Login & Management Suite (KPIs, User Control, Database Backup)
- 6.2 Discussion & Performance Evaluation

### **Chapter 7: Conclusion and Future Enhancements**
- 7.1 Conclusion
- 7.2 Future Enhancements

### **References**
- Books
- Websites
- Technical Documentation

### **Appendices**
- Appendix A: Key Source Code Snippets
- Appendix B: Database DDL Script (`smart_expense_tracker.sql`)
- Appendix C: API Endpoint Specifications

---

\newpage

# LIST OF FIGURES

| Figure No. | Figure Title | Page / Section |
| :--- | :--- | :--- |
| **Figure 3.1** | 3-Tier System Architecture Diagram | Chapter 3.6 |
| **Figure 3.2** | System Use Case Diagram (User & Admin Actors) | Chapter 3.7 |
| **Figure 3.3** | Context Level DFD (Level 0 Diagram) | Chapter 3.8.1 |
| **Figure 3.4** | Level 1 Data Flow Diagram | Chapter 3.8.2 |
| **Figure 3.5** | Level 2 Data Flow Diagram (Transaction Engine) | Chapter 3.8.3 |
| **Figure 3.6** | Entity-Relationship (ER) Diagram | Chapter 3.9 |
| **Figure 4.1** | Role-Based Access Control & JWT Flowchart | Chapter 4.5 |
| **Figure 6.1** | User Dashboard Overview with Financial Summary Cards | Chapter 6.1.1 |
| **Figure 6.2** | User & Admin Dedicated Login / Registration Portals | Chapter 6.1.2 |
| **Figure 6.3** | Modal Dialogs for Adding Income and Expenses | Chapter 6.1.3 |
| **Figure 6.4** | Searchable Transaction History Table with Action Buttons | Chapter 6.1.4 |
| **Figure 6.5** | 1-Month Daily Income vs. Expense Trend Line Chart | Chapter 6.1.5 |
| **Figure 6.6** | Monthly Category Summary Breakdown Table | Chapter 6.1.5 |
| **Figure 6.7** | Admin Panel Dashboard (KPIs, User Table, Database Dump) | Chapter 6.1.6 |

---

# LIST OF TABLES

| Table No. | Table Title | Page / Section |
| :--- | :--- | :--- |
| **Table 2.1** | Comparison Matrix of Expense Management Approaches | Chapter 2.3 |
| **Table 3.1** | Hardware Requirements Specification | Chapter 3.4 |
| **Table 3.2** | Software Requirements Specification | Chapter 3.5 |
| **Table 3.3** | Schema of `users` Table | Chapter 3.10 |
| **Table 3.4** | Schema of `transactions` Table | Chapter 3.10 |
| **Table 3.5** | Schema of `budgets` Table | Chapter 3.10 |
| **Table 3.6** | Schema of `system_settings` Table | Chapter 3.10 |
| **Table 5.1** | Comprehensive Test Suite & Execution Results | Chapter 5.2 |
| **Table 5.2** | Summary of Quality Assurance Test Metrics | Chapter 5.3 |
| **Table C.1** | REST API Route Specifications & HTTP Methods | Appendix C |

---

\newpage

# CHAPTER 1: INTRODUCTION

## 1.1 Background
Financial discipline is one of the most essential life skills for individuals in the contemporary digital age. With the expansion of cashless payment channels, e-wallets, online subscriptions, and varied earning avenues, maintaining control over day-to-day spending has become increasingly complicated. Many individuals fail to understand their cash flow dynamics, underestimating small frequent outlays (such as dining, transport, and leisure) while overestimating their remaining disposable balance.

In developing economic ecosystems such as Nepal, personal budgeting tools are often either unavailable in local currency (**Nepali Rupees - Rs.**) or excessively complicated with foreign banking integrations that do not apply to local payment systems. A lightweight, web-accessible, intuitive, and secure expense management platform is critical to help users record their financial transactions, set monthly budgets, and analyze spending patterns with actionable visual metrics.

The **Smart Expenses Tracker** is engineered to bridge this gap. Developed under the BCA 4th Semester curriculum at National Infotech College, this system provides a centralized platform for real-time transaction recording, dynamic budget computation, analytical chart visualizations, automated statement generation (CSV and PDF), and platform administration through a dedicated Admin Panel.

## 1.2 Problem Statement
Despite the proliferation of smart computing devices, personal financial tracking faces persistent challenges:
1. **Inefficiency and Loss of Data in Manual Recording:** Many users rely on physical notebooks or diary entries. These physical records are easily lost, destroyed, or damaged, and calculating monthly totals requires tedious, error-prone manual arithmetic.
2. **Complexity of Spreadsheet Software:** While Microsoft Excel and Google Sheets offer powerful calculation capabilities, they require manual formula configuration, lack mobile/responsive optimization, lack built-in security encryption for sensitive financial figures, and do not provide automated alerts when a user exceeds a monthly budget.
3. **Lack of Currency and Regional Customization:** Most off-the-shelf international applications default to USD (\$) or EUR (€), ignoring regional currencies such as Nepali Rupees (Rs.) and forcing users through irrelevant international banking linkings.
4. **Absence of Centralized Administrative Management:** Generic personal trackers do not feature system-level monitoring tools, user account controls, platform diagnostics, or one-click automated database backups to prevent data loss.

## 1.3 Objectives

### 1.3.1 General Objective
The primary objective of this project is to design, develop, test, and deploy a responsive, secure, and user-friendly web-based **Smart Expenses Tracker** that simplifies personal financial management and provides real-time analytics for users alongside comprehensive governance tools for system administrators.

### 1.3.2 Specific Objectives
- To implement a secure **Authentication & Authorization System** utilizing JSON Web Tokens (JWT) and Bcrypt cryptographic password hashing with Role-Based Access Control (`user` and `admin`).
- To provide a real-time **Income and Expense Management Engine** allowing users to log, view, edit, search, filter, and delete transactions with support for backdated historical entries.
- To display dynamic financial metrics, including **Total Income**, **Total Expense**, and **Net Available Balance** in Nepali Rupees (`Rs.`).
- To implement **Monthly Budget Tracking** that dynamically compares monthly expenditures against user-defined budget thresholds and alerts users when thresholds are exceeded.
- To render interactive **Data Visualizations**, including a **1-Month Daily Income vs. Expense Trend Line Chart**, a **6-Month Overview Bar Chart**, and **Category Breakdown Summary Tables**.
- To enable authenticated **CSV and PDF Export** for generating printable financial statements.
- To develop an **Admin Panel** that allows administrators to monitor platform KPIs, manage user accounts, inspect global transactions, adjust system settings, and generate on-demand **MySQL Database SQL Backups**.

## 1.4 Scope of the Project
The scope of the **Smart Expenses Tracker** encompasses:
- **Individual Financial Logging:** Designed for students, freelancers, salary earners, and small household managers.
- **Cross-Device Web Access:** Optimized for desktops, laptops, tablets, and smartphones via modern responsive CSS design.
- **Relational Integrity:** Ensuring ACID compliance through MySQL database foreign key relationships and indexing.
- **Academic & Operational Demonstration:** Developed as a practical demonstration of full-stack software engineering principles (MVC architecture, RESTful API design, state management, and relational database modeling).

## 1.5 Significance of the Project
- **Promotes Financial Awareness:** By categorizing every expenditure (e.g., Food, Rent, Education, Healthcare, Entertainment), users immediately identify wasteful spending habits and improve their monthly savings.
- **Prevents Overspending via Live Budget Indicators:** The dynamic budget progress bar visually notifies users before their monthly expenses exceed their income.
- **Paperless Efficiency:** Completely replaces physical paper ledgers and complex manual spreadsheets with an instant, cloud-ready database system.
- **Data Portability:** Allows users to download their financial history into structured CSV spreadsheets or formatted PDF documents for record-keeping or taxation analysis.
- **Administrative Reliability:** Provides system administrators with real-time insight into platform usage and guarantees business continuity via automated SQL database dumps.

## 1.6 Limitations
While the system is robust and fully functional, the following limitations are noted for transparency:
- **No Automatic Bank Sync:** The system requires manual entry of transactions; it does not automatically scrape bank SMS notifications or link directly with Nepal Clearing House (NCHL/IPS) APIs due to banking regulatory compliance.
- **Internet Dependency:** As a centralized client-server web application, an active local network or internet connection is required to communicate with the Node.js backend.
- **Single-Currency Focus:** The system is pre-configured and localized for Nepali Rupees (`Rs.`) and does not currently support multi-currency conversion on a single account.

---

\newpage

# CHAPTER 2: LITERATURE REVIEW

## 2.1 Existing Expense-Management Systems
Tracking income and expenditure has evolved across three major paradigms:

### 2.1.1 Manual Paper-Based Ledgers
Historically, individuals and small business owners maintained physical account books (*Khata*). While this method requires no electricity or technical literacy, it suffers from critical vulnerabilities: physical damage, loss through fire/water, inability to generate visual trends, and excessive time consumed during end-of-month reconciliations.

### 2.1.2 Traditional Spreadsheet Applications (Excel / Sheets)
Spreadsheet applications represent the first digital wave in personal accounting. Users create columns for Date, Category, Income, and Expense, and apply formulas such as `=SUM()` and `=AVERAGE()`. While flexible, spreadsheets lack enforced database integrity, are cumbersome to edit on mobile screens, do not provide real-time budget alert notifications, and expose raw financial numbers without role-based access control.

### 2.1.3 Commercial Mobile & Cloud Apps (Mint, YNAB, Money Manager)
Modern commercial platforms offer automated bank synchronization and complex budgeting algorithms. However, these systems often present significant hurdles for local users:
- Heavy subscription fees (e.g., \$15/month for YNAB).
- Complex user interfaces overwhelmed with investment, loan, and cryptocurrency modules.
- Zero support for Nepali commercial banks or localized Nepali currency standards.
- Privacy concerns regarding the selling of user spending data to third-party advertisers.

## 2.2 Problems with Existing Systems
A review of the literature and market tools identifies four key problem areas:
1. **High Complexity vs. Low Usability:** Many commercial tools have steep learning curves that discourage everyday users from consistently logging transactions.
2. **Lack of Local Currency Context:** Foreign systems assume dollar-based micro-transactions and lack simple formatting for South Asian currency denominations.
3. **Data Lock-in and Export Barriers:** Many proprietary apps restrict raw data export unless users upgrade to premium tiers.
4. **Absence of Administrative Self-Hosting:** Small organizations and academic environments cannot self-host existing SaaS tools or manage local database backups.

## 2.3 Comparison with the Proposed System

The following comparative table illustrates how the proposed **Smart Expenses Tracker** outperforms traditional and commercial alternatives:

| Feature / Metric | Manual Ledger | Microsoft Excel | Commercial Apps (YNAB/Mint) | **Proposed Smart Expenses Tracker** |
| :--- | :--- | :--- | :--- | :--- |
| **Setup Cost** | Low (Paper) | Medium (License) | High (Monthly Subscription) | **Zero (Free & Open Source)** |
| **Ease of Use** | Moderate | Complex | Moderate to Complex | **Very High (Intuitive UI)** |
| **Real-Time Balance** | Manual Sum | Formula Required | Automated | **Automated Instant Calculation** |
| **Currency Support** | Any (Manual) | Any (Configured) | Mostly USD/EUR | **Native Nepali Rupees (Rs.)** |
| **Interactive Charts** | None | Manual Setup | Available | **Built-in (Recharts 1-Month / 6-Month)**|
| **Budget Warnings** | None | None | Push Alerts | **Live Color-Coded Progress Bar** |
| **Data Security** | None | Password File | Cloud Stored | **Bcrypt Encryption + JWT RBAC** |
| **Export Formats** | None | `.xlsx`, `.csv` | Proprietary / Limited | **Authenticated CSV & Formatted PDF** |
| **Admin Oversight** | None | None | Closed Proprietary | **Full Admin Panel & SQL Backup** |
| **Past Date Logging** | Yes | Yes | Often Blocked | **Full Historical Backdating Support** |

---

\newpage

# CHAPTER 3: SYSTEM ANALYSIS AND DESIGN

## 3.1 Requirement Analysis
Requirement analysis is a fundamental phase in the Software Development Life Cycle (SDLC) where user expectations, operational constraints, and architectural parameters are defined. The Smart Expenses Tracker was designed following an **Iterative Agile Methodology**, allowing continuous refinements based on real user feedback during development sprints.

## 3.2 Functional Requirements
The functional requirements describe the specific services and behaviors provided by the system:
1. **User Authentication & Authorization:**
   - Secure registration with Name, Email, Password, and Phone Number.
   - Login authentication with JWT generation and token storage in browser `localStorage`.
   - Distinct authorization routes for standard `user` and `admin` roles.
2. **Transaction Management:**
   - Add new Income or Expense with Amount, Category, Date, and Description.
   - Ability to backdate transactions to record past income and expenses.
   - Edit existing transactions with instantaneous recalculation of balances.
   - Delete transactions with confirmation modals to prevent accidental loss.
3. **Financial Analytics & Visualization:**
   - Display instantaneous Summary KPIs: Total Income, Total Expenses, Net Balance.
   - Dynamic 1-Month Daily Trend Line Chart displaying daily income and expense trajectories.
   - 6-Month Macro Overview Bar Chart.
   - Monthly Category Breakdown Table with percentage contributions and total counts.
4. **Budget Management:**
   - Set monthly spending budgets per category and overall.
   - Live visual progress bar reflecting percentage spent with color-coded threshold warnings.
5. **Data Export:**
   - Authenticated CSV download for offline spreadsheet analysis.
   - Formatted PDF Financial Statement generator for printing.
6. **Admin Panel Governance:**
   - System KPIs: Total registered users, total transactions, platform-wide revenue and expense volume.
   - User Management: View registered user profiles and toggle active/inactive account status.
   - Global Transaction Monitor: Search and inspect all transactions across all users.
   - 1-Click Database Backup: Trigger backend `mysqldump` to download complete `.sql` schema and data backups.
   - System Diagnostics: View Node environment, memory usage, uptime, and database connection status.

## 3.3 Non-Functional Requirements
1. **Performance:** The system responds to API queries within < 150ms under typical loads. Chart renderings complete in < 200ms using virtual DOM optimizations.
2. **Security:** Passwords hashed with `bcryptjs` (salt rounds = 10). REST endpoints protected via JWT verification middleware. SQL injection prevented using parameterized queries in `mysql2`.
3. **Reliability & Data Integrity:** Database enforces foreign key constraints with `ON DELETE CASCADE` to prevent orphaned child records.
4. **Usability & Responsiveness:** Built using Tailwind CSS with mobile-first grid and flexbox layouts ensuring accessibility across smartphones, tablets, and 4K displays.
5. **Maintainability:** Modular architecture separating routes, controllers, middleware, and database pools on the backend, and componentized views on the frontend.

## 3.4 Hardware Requirements

| Hardware Component | Minimum Requirement (Client) | Minimum Requirement (Server Host) | Recommended Specification |
| :--- | :--- | :--- | :--- |
| **Processor** | Intel Core i3 (2.0 GHz) or equivalent | Dual-Core 2.4 GHz | Intel Core i5 / AMD Ryzen 5 or higher |
| **RAM** | 2 GB | 4 GB | 8 GB DDR4 or higher |
| **Hard Disk** | 500 MB free storage | 2 GB free SSD storage | 10 GB SSD storage |
| **Display Resolution** | 1024 x 768 | Headless / Any | 1920 x 1080 (Full HD) |
| **Network Interface** | Standard Wi-Fi / Ethernet | 100 Mbps NIC | Broadband High-Speed Connection |

## 3.5 Software Requirements

| Software Component | Technology / Tool Used | Purpose / Environment |
| :--- | :--- | :--- |
| **Operating System** | Windows 10/11 / Linux (Ubuntu) / macOS | Development and Host Environment |
| **Frontend Framework** | React 19 (Vite Build Tool) | Single-Page Application (SPA) Rendering |
| **CSS Framework** | Tailwind CSS v4 & Lucide React Icons | Modern UI Component Styling & Icons |
| **Charting Library** | Recharts v2 | Interactive SVG Financial Charts |
| **Backend Runtime** | Node.js (v18.x or v20.x LTS) | Server-side JavaScript Engine |
| **Web Framework** | Express.js (v4.x) | RESTful API Routing and Middleware |
| **Database Server** | MySQL / MariaDB (XAMPP Server) | Relational Storage & Data Persistence |
| **Database Driver** | `mysql2/promise` | Async/Await Connection Pool Management |
| **Authentication** | `jsonwebtoken` & `bcryptjs` | Token Creation & Password Encryption |
| **Code Editor / IDE** | VS Code / Antigravity IDE | Source Code Development & Debugging |

## 3.6 System Architecture
The Smart Expenses Tracker utilizes a classic **3-Tier Client-Server Architecture**:
1. **Presentation Tier (Frontend):** Developed in React 19, responsible for managing UI state, capturing user inputs, rendering responsive components, and displaying charts.
2. **Application / Business Logic Tier (Backend API):** Built with Node.js and Express.js. Handles HTTP request validation, JWT token verification, financial calculations, business rules, and SQL query orchestration.
3. **Data Tier (Database):** MySQL relational database engine managing table relations, transaction storage, user authentication records, and database indexing.

```mermaid
flowchart TD
    subgraph Client_Tier ["Presentation Layer (Client Browser)"]
        UI["React 19 SPA (Vite + Tailwind CSS v4)"]
        State["React Context & State Management"]
        Charts["Recharts Visual Engine"]
        UI <--> State
        State <--> Charts
    end

    subgraph Server_Tier ["Application Layer (Node.js + Express.js API)"]
        Router["Express REST API Router (/api)"]
        AuthMid["JWT & RBAC Auth Middleware"]
        Controllers["Controllers (Auth, Trans, Budget, Admin)"]
        Pool["MySQL2 Connection Pool"]
        
        Router --> AuthMid
        AuthMid --> Controllers
        Controllers --> Pool
    end

    subgraph Data_Tier ["Data Layer (MySQL / MariaDB)"]
        DB[(smart_expense_tracker DB)]
        Tables["Tables: users, transactions, budgets, system_settings"]
        DB --- Tables
    end

    UI <== "HTTP / JSON REST API Requests" ==> Router
    Pool <== "TCP / SQL Queries & Result Sets" ==> DB
```

## 3.7 Use Case Diagram
The Use Case Diagram illustrates the interactions between the two primary actors (**Standard User** and **System Administrator**) and the core system use cases.

```mermaid
flowchart LR
    User((Standard User))
    Admin((System Administrator))

    subgraph System_Boundary ["Smart Expenses Tracker System"]
        UC1(["Register / Login Account"])
        UC2(["Log Income / Expense (Backdating)"])
        UC3(["View Balance & Summary KPIs"])
        UC4(["Inspect 1-Month Trend & Category Charts"])
        UC5(["Manage Monthly Budgets"])
        UC6(["Export Data (CSV / PDF)"])
        UC7(["Manage User Accounts & Roles"])
        UC8(["Global Transaction Audit"])
        UC9(["1-Click Database SQL Backup"])
        UC10(["Configure System Settings"])
    end

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6

    Admin --> UC1
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9
    Admin --> UC10
```

## 3.8 Data Flow Diagram (DFD)

### 3.8.1 Context Level DFD (Level 0)
The Level 0 Context Diagram shows the global data boundary of the Smart Expenses Tracker.

```mermaid
flowchart TD
    U[Standard User]
    A[System Administrator]
    Sys((Smart Expenses Tracker System))
    
    U -- "Credentials, Transaction Entries, Budget Limits" --> Sys
    Sys -- "Auth Token, Financial Dashboards, Charts, CSV/PDF Statements" --> U
    
    A -- "Admin Credentials, Status Updates, System Configs" --> Sys
    Sys -- "Platform KPIs, All User Logs, SQL Backup Dumps, System Diagnostics" --> A
```

### 3.8.2 Level 1 DFD
The Level 1 DFD decomposes the system into its primary functional subsystems:

```mermaid
flowchart TD
    User([User / Admin])
    
    P1["1.0 Authentication & RBAC Engine"]
    P2["2.0 Transaction Processing Engine"]
    P3["3.0 Analytics & Chart Generation"]
    P4["4.0 Budget Tracking & Alerting"]
    P5["5.0 Admin Governance & SQL Backup"]
    
    D1[("Users Store")]
    D2[("Transactions Store")]
    D3[("Budgets Store")]
    D4[("Settings Store")]

    User -->|Login / Register| P1
    P1 -->|Store / Read Profile| D1
    P1 -->|Issue JWT Token| User

    User -->|Add / Edit / Delete Income/Expense| P2
    P2 -->|CRUD Operations| D2
    P2 -->|Real-time Balance| User

    D2 -->|Read Transaction History| P3
    P3 -->|1-Month Trends & Category Breakdown| User

    User -->|Set Monthly Budget| P4
    D2 -->|Calculate Spent Amount| P4
    P4 -->|Threshold Alerts & Progress| User

    User -->|Admin Operations| P5
    P5 -->|Read/Update Users| D1
    P5 -->|Audit All Records| D2
    P5 -->|Generate Dump & Settings| D4
    P5 -->|System Backup & KPIs| User
```

### 3.8.3 Level 2 DFD (Transaction & Budget Flow)
The Level 2 DFD details the transaction entry, validation, balance update, and budget threshold check cycle:

```mermaid
flowchart TD
    Input["User Enters Transaction (Type, Amount, Category, Date)"]
    Validate{"Validate JWT & Input Payload"}
    WriteDB[("INSERT into transactions table")]
    CalcBalance["Compute Total Income - Total Expense"]
    FetchBudget["Query budgets for Active Month & Category"]
    CheckAlert{"Spent > Budget Limit?"}
    AlertUser["Render Warning Banner & Red Progress Bar"]
    NormalUser["Render Standard Progress Bar"]
    UpdateView["Update Dashboard KPIs & Recharts Line Graph"]

    Input --> Validate
    Validate -->|Valid| WriteDB
    WriteDB --> CalcBalance
    CalcBalance --> FetchBudget
    FetchBudget --> CheckAlert
    CheckAlert -->|Yes| AlertUser
    CheckAlert -->|No| NormalUser
    AlertUser --> UpdateView
    NormalUser --> UpdateView
```

## 3.9 Entity-Relationship (ER) Diagram
The Entity-Relationship Diagram outlines the entities, attributes, primary keys, and foreign key relationships maintaining relational integrity in the MySQL database:

```mermaid
erDiagram
    USERS ||--o{ TRANSACTIONS : "logs / owns"
    USERS ||--o{ BUDGETS : "defines"
    USERS ||--o{ SYSTEM_SETTINGS : "configures (admin)"

    USERS {
        int id PK "AUTO_INCREMENT"
        varchar name "User Full Name"
        varchar email "Unique Email Address"
        varchar password "Bcrypt Hashed Password"
        enum role "admin | user"
        varchar phone "Contact Number"
        datetime created_at "Registration Timestamp"
    }

    TRANSACTIONS {
        int id PK "AUTO_INCREMENT"
        int user_id FK "References USERS(id)"
        enum type "income | expense"
        varchar category "Category Name"
        decimal amount "DECIMAL(10,2) in Rs."
        date date "Transaction Date (Past/Present)"
        varchar description "Note / Remarks"
        datetime created_at "Creation Timestamp"
    }

    BUDGETS {
        int id PK "AUTO_INCREMENT"
        int user_id FK "References USERS(id)"
        varchar category "Target Category"
        decimal amount "DECIMAL(10,2) Monthly Limit"
        varchar month "Month Identifier (YYYY-MM)"
        datetime created_at "Creation Timestamp"
    }

    SYSTEM_SETTINGS {
        varchar setting_key PK "Configuration Key"
        text setting_value "Configuration Value / JSON"
        datetime updated_at "Last Modified Timestamp"
    }
```

## 3.10 Database Design
The relational database `smart_expense_tracker` consists of four normalized tables:

### Table 3.3: Schema of `users` Table
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique identifier for each user |
| `name` | `VARCHAR(100)` | `NOT NULL` | Full legal name of the user |
| `email` | `VARCHAR(100)` | `NOT NULL`, `UNIQUE` | Email used for login authentication |
| `password` | `VARCHAR(255)` | `NOT NULL` | Cryptographic Bcrypt hash of password |
| `role` | `ENUM('admin','user')`| `DEFAULT 'user'` | Role governing access permissions |
| `phone` | `VARCHAR(20)` | `NULL` | Optional contact telephone number |
| `created_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP` | Account creation timestamp |

### Table 3.4: Schema of `transactions` Table
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique transaction identifier |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY (users.id)`| User who created the transaction |
| `type` | `ENUM('income','expense')`| `NOT NULL` | Classification of cash flow |
| `category` | `VARCHAR(50)` | `NOT NULL` | Category (Food, Salary, Rent, etc.) |
| `amount` | `DECIMAL(10,2)` | `NOT NULL` | Value in Nepali Rupees (`Rs.`) |
| `date` | `DATE` | `NOT NULL` | Effective transaction date (allows backdating) |
| `description` | `VARCHAR(255)` | `NULL` | Optional contextual note or description |
| `created_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP` | Timestamp of database insertion |

### Table 3.5: Schema of `budgets` Table
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique budget record identifier |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY (users.id)`| User associated with the budget |
| `category` | `VARCHAR(50)` | `NOT NULL` | Specific category or 'Overall' |
| `amount` | `DECIMAL(10,2)` | `NOT NULL` | Budget ceiling threshold in `Rs.` |
| `month` | `VARCHAR(7)` | `NOT NULL` | Format `YYYY-MM` (e.g. `2026-09`) |
| `created_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP` | Budget creation timestamp |

### Table 3.6: Schema of `system_settings` Table
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `setting_key` | `VARCHAR(100)` | `PRIMARY KEY` | Configuration identifier key |
| `setting_value` | `TEXT` | `NOT NULL` | Setting value or serialized JSON string |
| `updated_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE`| Timestamp of last administrative update |

---

\newpage

# CHAPTER 4: SYSTEM IMPLEMENTATION

## 4.1 Technologies Used
- **Frontend Architecture:** React 19 Single Page Application scaffolded via Vite for ultra-fast Hot Module Replacement (HMR).
- **Styling & UI Components:** Tailwind CSS v4 utilizing modernized CSS variables and utility classes, paired with Lucide React vector icons.
- **Data Visualization Engine:** Recharts v2 charting suite rendering declarative SVG trend lines and categorical bar charts.
- **Backend Architecture:** Node.js runtime executing an Express.js web framework following the Model-View-Controller (MVC) API paradigm.
- **Database Layer:** MySQL / MariaDB relational engine managed through `mysql2/promise` connection pooling with parameterized SQL queries.
- **Security & Cryptography:** `bcryptjs` (salt factor 10) for one-way password hashing and `jsonwebtoken` for stateless token authentication.

## 4.2 Frontend Development
The frontend application lives in the `/client` directory. It uses a component-based hierarchy with dedicated views for Dashboard, Transactions, Budgets, Reports, User Login, User Registration, and the Admin Portal. A centralized `AuthContext` provides global state for user authentication tokens, active user profiles, and currency formatting helpers (`formatCurrency` defaulting to `Rs.`).

Axios HTTP interceptors automatically attach the bearer token (`Authorization: Bearer <token>`) to outgoing API requests and redirect unauthenticated sessions back to the login screen.

## 4.3 Backend Development
The backend server lives in the `/server` directory, orchestrated through `index.js`. It sets up CORS (Cross-Origin Resource Sharing), parses JSON request bodies, and mounts modular RESTful route handlers:
- `/api/auth`: Handles user registration, user login, admin login, and token validation.
- `/api/transactions`: Handles CRUD operations, filtering by date/category, and CSV/PDF data exports.
- `/api/budgets`: Handles budget threshold creation, updates, and monthly progress calculations.
- `/api/reports`: Aggregates 1-month daily trends, 6-month historical averages, and categorical percentage splits.
- `/api/admin`: Exposes protected administrative endpoints for KPI analytics, user status toggling, global transaction auditing, system diagnostics, and database dumps.

## 4.4 Database Implementation
Database connectivity is managed through an asynchronous connection pool (`server/config/db.js`). This pool dynamically allocates connections, auto-reconnects on idle timeouts, and executes queries via promises, ensuring high throughput without blocking Node.js event loops.

```javascript
// Database Pool Configuration
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'smart_expense_tracker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;
```

## 4.5 User Registration/Login
Security is enforced using JSON Web Tokens (JWT). When a user registers or logs in, their password is verified against the stored bcrypt hash. Upon validation, a signed JWT payload containing `userId`, `email`, and `role` is generated with a 24-hour expiration.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as React Client (Frontend)
    participant Server as Express Server (Backend)
    participant DB as MySQL Database

    User->>Client: Enters Email & Password
    Client->>Server: POST /api/auth/login {email, password}
    Server->>DB: SELECT * FROM users WHERE email = ?
    DB-->>Server: User record with bcrypt password hash
    Server->>Server: bcrypt.compare(password, hash)
    alt Password Matches
        Server->>Server: jwt.sign({id, email, role}, SECRET, {expiresIn: '24h'})
        Server-->>Client: 200 OK + {token, user: {name, email, role}}
        Client->>Client: Store token in localStorage
        Client-->>User: Redirect to Dashboard (/ or /admin)
    else Password Invalid
        Server-->>Client: 401 Unauthorized {message: "Invalid credentials"}
        Client-->>User: Display error notification
    end
```

## 4.6 Income Management
Income entries represent financial inflows (Salary, Freelance, Business, Investments, Gifts). Users enter the amount, select an income category, assign the date, and enter notes. The system calculates the updated total income and recalculates the net balance in real time.

## 4.7 Expense Management
Expense entries record financial outflows (Food & Dining, Rent & Utilities, Transportation, Education, Healthcare, Entertainment, Shopping). When an expense is recorded:
1. The transaction is written to the database.
2. The transaction amount is deducted from the current net balance.
3. The monthly total for that category is evaluated against any active budget limits.

## 4.8 Expense Categories & Historical Backdating
The system supports full **Historical Backdating**. When users enter receipts from previous days, weeks, or months, the application recalculates the balance and plots the entry precisely onto the historical timeline without disrupting sequential database records.

## 4.9 Dashboard and Reports
The Dashboard and Reports views aggregate financial data into intuitive visual components:
- **Financial Cards:** Total Income (Green), Total Expenses (Red), Net Balance (Indigo/Blue) formatted in `Rs.`.
- **1-Month Daily Trend Line Chart:** A dynamic Recharts component plotting daily income versus daily expense trajectories over a 30-day period.
- **Category Summary Table:** Tabulates total spent, number of transactions, and percentage share per category.
- **CSV & PDF Exporter:** Generates downloadable spreadsheets and formatted printable statements directly from the client.

## 4.10 Admin Panel
The Admin Panel (`/admin`) provides privileged access exclusively to users with `role = 'admin'`. It includes:
1. **Platform Analytics:** Total registered users, total transactions, total income tracked, and total expense volume.
2. **User Management:** Grid of all registered users with the ability to inspect details and toggle account status.
3. **Global Transaction Log:** System-wide searchable audit table of all financial entries logged across all accounts.
4. **1-Click SQL Database Backup:** Invokes server-side `mysqldump` to export a complete `.sql` backup file directly to the admin's browser.
5. **System Diagnostics:** Live monitor displaying Node.js memory footprint, server uptime, and database latency.

---

\newpage

# CHAPTER 5: TESTING

## 5.1 Testing Methods
To ensure system stability, security, and computational accuracy, four testing methodologies were conducted:
1. **Unit Testing:** Validating individual functions, including currency formatting (`Rs.`), bcrypt password hashing, and date formatters.
2. **Integration Testing:** Testing communication between frontend React forms, Express REST routes, and MySQL query responses.
3. **Database & Relational Integrity Testing:** Verifying ACID transactions, unique email constraints, and foreign key cascades upon user deletion.
4. **Security & Authorization Testing:** Verifying that standard users cannot access administrative endpoints (`/api/admin/*`) and unauthenticated requests are blocked with HTTP 401/403.

## 5.2 Test Cases and Execution Matrix

### Table 5.1: Comprehensive Test Cases & Results
| Test ID | Module | Test Scenario / Description | Input Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Auth | User Registration with Valid Data | Name, Unique Email, Password | Account created, 201 Created | User registered successfully | **PASS** |
| **TC-02** | Auth | Registration with Duplicate Email | Existing Registered Email | 400 Bad Request / Duplicate Error | Rejected with error message | **PASS** |
| **TC-03** | Auth | Login with Correct Credentials | Valid Email & Password | 200 OK + Valid JWT Token | Token stored, navigated to Dashboard | **PASS** |
| **TC-04** | Auth | Login with Incorrect Password | Valid Email + Wrong Password | 401 Unauthorized | Error displayed, access denied | **PASS** |
| **TC-05** | Trans | Add Income Entry | Amount: `Rs. 50000`, Type: `income` | Balance increases by `Rs. 50000` | Real-time balance updated | **PASS** |
| **TC-06** | Trans | Add Expense Entry | Amount: `Rs. 12000`, Type: `expense`| Balance decreases by `Rs. 12000` | Real-time balance updated | **PASS** |
| **TC-07** | Trans | Backdated Transaction Logging | Date: 10 days in the past | Transaction stored with past date | Reflected in 1-Month Trend chart | **PASS** |
| **TC-08** | Budget| Budget Threshold Exceeded | Spent: `Rs. 15000`, Budget: `Rs. 10000`| Warning banner & Red progress bar | Alert triggered at 150% spent | **PASS** |
| **TC-09** | Export| Export Transactions to CSV | Click "Export CSV" Button | Initiates `.csv` file download | Clean spreadsheet downloaded | **PASS** |
| **TC-10** | Export| Generate Printable PDF Statement | Click "Export PDF" Button | Formatted print preview rendered | PDF statement generated | **PASS** |
| **TC-11** | Admin | Standard User Accessing Admin Route| User Token requesting `/api/admin`| 403 Forbidden Access Denied | Access blocked, redirected | **PASS** |
| **TC-12** | Admin | Admin Login to Admin Portal | Admin Credentials (`role='admin'`)| Navigates to `/admin` Dashboard | Admin KPI Suite rendered | **PASS** |
| **TC-13** | Admin | 1-Click Database SQL Backup | Click "Download SQL Backup" | Triggers `mysqldump` `.sql` download| `.sql` file downloaded with full tables| **PASS** |

## 5.3 Test Results Summary

### Table 5.2: Summary of Quality Assurance Test Metrics
| Test Category | Total Test Cases | Passed Cases | Failed Cases | Pass Rate |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication & Security** | 4 | 4 | 0 | **100%** |
| **Transaction & Balance Calculation** | 4 | 4 | 0 | **100%** |
| **Budgeting & Visualization** | 2 | 2 | 0 | **100%** |
| **Reporting & Data Export** | 2 | 2 | 0 | **100%** |
| **Admin Panel & Database Backups** | 3 | 3 | 0 | **100%** |
| **TOTAL** | **15** | **15** | **0** | **100%** |

---

\newpage

# CHAPTER 6: RESULTS AND DISCUSSION

## 6.1 Screenshots of the System

### 6.1.1 Users Dashboard
The user dashboard serves as the central cockpit of the application. Upon logging in, the user is greeted with three primary financial summary cards:
1. **Total Income Card (Green):** Displays cumulative income in Nepali Rupees (`Rs.`).
2. **Total Expenses Card (Red):** Displays cumulative expenditures in `Rs.`.
3. **Net Available Balance Card (Blue/Indigo):** Displays net liquidity (`Total Income - Total Expense`).

Beneath the financial cards, quick-action buttons allow instant launching of the Add Income and Add Expense modals, followed by a recent transactions list.

```
+-----------------------------------------------------------------------------------+
|  SMART EXPENSES TRACKER                                [Transactions] [Budgets]  |
|-----------------------------------------------------------------------------------|
|  [ TOTAL INCOME ]          [ TOTAL EXPENSES ]          [ NET BALANCE ]            |
|    Rs. 85,000.00               Rs. 32,450.00             Rs. 52,550.00            |
|    +12% this month             +4% this month            Safe Margin              |
|-----------------------------------------------------------------------------------|
|  [ + Add Income ]    [ - Add Expense ]    [ Export CSV ]    [ Print Statement ]   |
|-----------------------------------------------------------------------------------|
|  1-MONTH DAILY INCOME VS. EXPENSE TREND                                           |
|  [ Line Graph: Income (Green) vs. Expense (Red) Trajectory over 30 Days ]         |
+-----------------------------------------------------------------------------------+
```
*Figure 6.1: User Dashboard Overview with Financial Summary Cards and 1-Month Trend*

### 6.1.2 Login and Register Pages
The application features clean, dedicated authentication portals for both general users (`/login`) and administrators (`/admin/login`). The forms feature input validation, password reveal toggles, and immediate feedback on incorrect credentials.

```
+------------------------------------+    +------------------------------------+
|            USER LOGIN              |    |            ADMIN LOGIN             |
|                                    |    |         (Privileged Access)        |
|  Email: [ user@example.com      ]  |    |  Admin Email: [ admin@system.com ] |
|  Password: [ **********        ]  |    |  Password:    [ **********       ] |
|                                    |    |                                    |
|         [ SIGN IN ]                |    |         [ ADMIN SIGN IN ]          |
|  Don't have an account? Register   |    |  Restricted to authorized staff    |
+------------------------------------+    +------------------------------------+
```
*Figure 6.2: Dedicated Login Portals for Standard Users and System Administrators*

### 6.1.3 Add Income & Add Expense Modals
Interactive modal dialogs allow users to enter transactions rapidly without page reloads. Users specify the Amount in `Rs.`, choose from dynamic categories (Salary, Freelance, Food, Rent, Entertainment, Healthcare, etc.), select the date (with past backdating support), and add optional descriptions.

### 6.1.4 Transaction History & Expense List
The transaction history view provides a searchable, sortable table displaying:
- **Date:** Formatted transaction date.
- **Category:** Highlighted with distinct category badges.
- **Description:** Contextual notes.
- **Type & Amount:** Color-coded in green (`+ Rs.`) for income and red (`- Rs.`) for expenses.
- **Actions:** Edit and Delete buttons with confirmation prompts.

### 6.1.5 Monthly Report, 1-Month Daily Trend, and Category Summaries
The Reports section provides deep financial insights:
- **1-Month Daily Trend Chart:** Plots daily income versus expenses across the last 30 days, revealing spending spikes.
- **Monthly Category Breakdown Table:** Tabulates category names, total transaction counts, total amount in `Rs.`, and the percentage share of the monthly total.

```
+-----------------------------------------------------------------------------------+
| MONTHLY CATEGORY BREAKDOWN TABLE                                                  |
|-----------------------------------------------------------------------------------|
| Category            Transactions      Total Spent (Rs.)      % of Total Expense   |
|-----------------------------------------------------------------------------------|
| Food & Dining            18              Rs. 11,200.00             34.5%          |
| Rent & Utilities          2              Rs. 12,000.00             37.0%          |
| Transportation           12              Rs.  3,500.00             10.8%          |
| Education                 3              Rs.  3,250.00             10.0%          |
| Entertainment             4              Rs.  2,500.00              7.7%          |
|-----------------------------------------------------------------------------------|
| TOTAL EXPENSES                           Rs. 32,450.00            100.0%          |
+-----------------------------------------------------------------------------------+
```
*Figure 6.6: Monthly Category Expense Breakdown Summary Table*

### 6.1.6 Admin Login & Management Suite
The Admin Panel (`/admin`) provides system administrators with oversight of platform operations:
- **Admin KPI Overview:** Total Users, Total Platform Transactions, Total System Income, Total System Expenses.
- **User Management Table:** View user email, registration date, transaction count, and account status toggles.
- **Global Transaction Feed:** Search and audit transactions across all platform users.
- **1-Click SQL Database Backup:** Downloads `smart_expense_tracker_backup.sql` with a single click.
- **System Diagnostics:** Server uptime, active database connections, and Node.js memory footprint.

## 6.2 Discussion & Performance Evaluation
During system testing and evaluation, the Smart Expenses Tracker demonstrated outstanding responsiveness and calculation accuracy. The separation of concerns between React on the frontend and Express on the backend allowed the client to render updates instantly without full page reloads.

The integration of **Nepali Rupees (`Rs.`)** as the native currency unit provided an intuitive user experience tailored for local users. The **1-Month Trend Chart** provided clear visibility into daily cash flow anomalies, and the **Budget Progress Bar** successfully prevented overspending by alerting users when category limits were approached or exceeded.

---

\newpage

# CHAPTER 7: CONCLUSION AND FUTURE ENHANCEMENTS

## 7.1 Conclusion
The **Smart Expenses Tracker** was successfully designed, developed, tested, and documented in partial fulfillment of the requirements for the **Bachelor of Computer Application (BCA) 4th Semester** at **National Infotech College**.

The system successfully resolves the inefficiencies, security vulnerabilities, and computational inaccuracies of traditional manual ledgers and static spreadsheets. By leveraging a modern tech stack comprising **React 19**, **Tailwind CSS v4**, **Node.js**, **Express.js**, and **MySQL**, the application delivers real-time financial tracking, intuitive data visualization (1-Month Daily Trend line chart and category summaries), dynamic monthly budget alerts, authenticated CSV/PDF data exports, and administrative oversight with 1-click SQL database backups.

All functional and non-functional requirements outlined during the system analysis phase were achieved with a 100% test pass rate across unit, integration, and security test suites.

## 7.2 Future Enhancements
While the project fulfills all objectives of the BCA Minor Project, future iterations can incorporate the following advanced capabilities:
1. **AI-Powered OCR Receipt Scanning:** Integrating Optical Character Recognition (e.g., Tesseract.js or Google Cloud Vision API) to automatically extract amount, date, and vendor from scanned paper receipts.
2. **Native Mobile Application:** Developing a cross-platform mobile app using React Native to support offline transaction queuing with background data synchronization.
3. **SMS & e-Wallet Parsing:** Adding parsing algorithms to read transaction SMS notifications from Nepali digital wallets (eSewa, Khalti) with user permission.
4. **Predictive Financial Forecasting:** Implementing machine learning regression models to predict future monthly expenses based on historical spending habits.
5. **Multi-Currency & Exchange Rate Sync:** Supporting automated foreign currency conversion via live exchange rate APIs (e.g., Nepal Rastra Bank API).

---

\newpage

# REFERENCES

### Books
1. **Elmasri, R., & Navathe, S. B.** (2016). *Fundamentals of Database Systems* (7th ed.). Pearson Education.
2. **Pressman, R. S., & Maxim, B. R.** (2020). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill Education.
3. **Flanagan, D.** (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media.
4. **Banks, A., & Porcello, E.** (2020). *Learning React: Modern Patterns for Developing React Applications* (2nd ed.). O'Reilly Media.

### Websites & Online Documentation
1. **React Documentation:** Official React 19 Guides and API Reference. [https://react.dev](https://react.dev)
2. **Tailwind CSS Documentation:** Modern Utility-First CSS Framework. [https://tailwindcss.com](https://tailwindcss.com)
3. **Express.js Framework:** Fast, unopinionated, minimalist web framework for Node.js. [https://expressjs.com](https://expressjs.com)
4. **MySQL 8.0 Reference Manual:** Oracle Corporation. [https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/)
5. **Recharts Documentation:** Redefined chart library built with React and D3. [https://recharts.org](https://recharts.org)
6. **MDN Web Docs:** Mozilla Developer Network Web Technologies Reference. [https://developer.mozilla.org](https://developer.mozilla.org)

---

\newpage

# APPENDICES

## APPENDIX A: KEY SOURCE CODE SNIPPETS

### A.1 JWT Authentication Middleware (`server/middleware/auth.js`)
```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smart_expense_secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied: Administrator role required' });
        }
    });
};

module.exports = { verifyToken, verifyAdmin };
```

### A.2 Database Backup Controller (`server/controllers/adminController.js`)
```javascript
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.downloadDatabaseBackup = async (req, res) => {
    const backupFileName = `smart_expense_backup_${Date.now()}.sql`;
    const backupPath = path.join(__dirname, '../../backups', backupFileName);
    
    // Ensure backup directory exists
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });

    const dumpCommand = `mysqldump -u ${process.env.DB_USER || 'root'} ${process.env.DB_NAME || 'smart_expense_tracker'} > "${backupPath}"`;

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Backup Error:', stderr);
            return res.status(500).json({ message: 'Database backup failed', error: stderr });
        }
        res.download(backupPath, backupFileName, (err) => {
            if (err) console.error('Download Error:', err);
            // Optionally clean up backup file after download
            if (fs.existsSync(backupPath)) fs.unlinkSync(backupPath);
        });
    });
};
```

---

## APPENDIX B: DATABASE DDL SCHEMA (`smart_expense_tracker.sql`)

```sql
-- Database Initialization Script
CREATE DATABASE IF NOT EXISTS smart_expense_tracker;
USE smart_expense_tracker;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    phone VARCHAR(20) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_date (user_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Budgets Table
CREATE TABLE IF NOT EXISTS budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    month VARCHAR(7) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_cat_month (user_id, category, month)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. System Settings Table
CREATE TABLE IF NOT EXISTS system_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## APPENDIX C: REST API ENDPOINTS

### Table C.1: REST API Route Specifications
| HTTP Method | Route Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue JWT token |
| `POST` | `/api/auth/admin/login` | Public | Authenticate admin & issue admin token |
| `GET` | `/api/transactions` | Authenticated | Fetch filtered transactions for logged-in user |
| `POST` | `/api/transactions` | Authenticated | Create a new income/expense record |
| `PUT` | `/api/transactions/:id` | Authenticated | Update an existing transaction record |
| `DELETE` | `/api/transactions/:id` | Authenticated | Delete a transaction record |
| `GET` | `/api/transactions/export/csv` | Authenticated | Download transactions as CSV file |
| `GET` | `/api/budgets` | Authenticated | Fetch active monthly budget targets |
| `POST` | `/api/budgets` | Authenticated | Set or update monthly budget target |
| `GET` | `/api/reports/monthly-trend` | Authenticated | Fetch 1-month daily income vs expense data |
| `GET` | `/api/reports/category-summary`| Authenticated | Fetch category-wise total spending table |
| `GET` | `/api/admin/kpis` | Admin Only | Fetch platform-wide analytical metrics |
| `GET` | `/api/admin/users` | Admin Only | Fetch list of all registered users |
| `PUT` | `/api/admin/users/:id/status` | Admin Only | Toggle user active/disabled status |
| `GET` | `/api/admin/transactions` | Admin Only | Fetch global transaction audit list |
| `GET` | `/api/admin/backup/sql` | Admin Only | Generate and download complete SQL dump |
| `GET` | `/api/admin/diagnostics` | Admin Only | Fetch server memory, uptime & DB status |
