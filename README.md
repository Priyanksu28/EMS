📘 *Asset Management System (AMS)*
A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to manage assets across departments and employees in an organization. It includes role-based access, asset assignment, history tracking, analytics dashboard, and more.


🚀 *Features*
✅ *User Authentication with JWT*

🔐 *Role-based login for Admin and Employee*

🧑‍💼 *Employee Management (Add, View, Edit, Delete)*

🏢 *Department Management*

📦 *Asset Management*

        Add new assets

        View all assets

        Edit asset info

        Delete assets

🔄 *Asset Assignment*

        Assign assets to employees

        View assignment history

        Unassign assets (Admin only)

📊 *Dynamic Dashboard*

        Total assets

        Assigned vs Unassigned

        Assets by Department

        Category-wise analytics

📩 *Password Recovery*

        OTP + Reset link via email

🔐 *Google reCAPTCHA protection during login*


🛠️ *Tech Stack*
| **Tech**         | **Description**                           |
|------------------|-------------------------------------------|
| *MongoDB*      | NoSQL Database                            |
| *Express.js*   | Node.js web framework (backend)           |
| *React.js*     | Frontend JavaScript library               |
| *Node.js*      | JavaScript runtime (server-side)          |
| *Mongoose*     | ODM for MongoDB                           |
| *JWT*          | Authentication & Authorization            |
| *Nodemailer*   | Email service (OTP + reset link)          |
| *Tailwind CSS* | Utility-first CSS framework for styling   |
| *Recharts*     | Charts & visualizations                   |
| *React Router* | Routing system in frontend                |


📁 *Project Structure*
<pre> ```bash project-root/ ├── backend/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── middleware/ │ ├── .env │ └── server.js ├── frontend/ │ ├── public/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── context/ │ │ ├── utils/ │ │ └── App.jsx │ ├── tailwind.config.js │ └── index.html ├── README.md └── package.json ``` </pre>

🔐 *Authentication & Roles*
*Admin*: Full control (CRUD on departments, employees, assets, and assignments)
*Employee*: Can view profile, view assigned assets, and raise issues.

🧑‍💻 *Author*
👨‍💻 Priyanksu Borkataky
📧 priyanksu28@example.com
🌍 LinkedIn: https://www.linkedin.com/in/priyanksu-borkataky-2706a7346/ | GitHub: https://github.com/Priyanksu28



