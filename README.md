<h1><b>Secure User Profile & Access Control System</b></h1>
<h2>Video</h2>


https://github.com/user-attachments/assets/f3b250fe-d276-4003-9d9f-61fccf28a226


<h2><b>Project Overview</b></h2>
<p>
This repository contains the implementation of <b>Assignment-1: Secure User Profile & Access Control System</b>.
The project focuses on secure authentication, encrypted storage of sensitive user data,
and controlled access to user profile information.
</p>
<p>
The system is designed using Django REST Framework, PostgreSQL, JWT authentication,
AES-256 encryption, and a React frontend. It follows real-world security principles
used in production systems.
</p>

<br/>

<p>
The objective of this assignment is to design and implement a secure backend service
that allows users to register, authenticate, and access their profile data securely.
Sensitive information such as Aadhaar numbers is encrypted before being stored in
the database and is decrypted only during authenticated access.
</p>
<p>
The implementation approach emphasizes:
</p>

<ul>
  <li>Stateless authentication using JWT</li>
  <li>Encryption of sensitive data at rest using AES-256</li>
  <li>Strict backend-controlled decryption</li>
  <li>Secure frontend–backend communication</li>
  <li>Clear separation of concerns between layers</li>
</ul>

<br/>

<h2><b>Setup and Run Instructions</b></h2>

<h3><b>Prerequisites</b></h3>

<ul>
  <li>Python 3.10 or higher</li>
  <li>Node.js 18 or higher</li>
  <li>PostgreSQL 14 or higher</li>
  <li>Git</li>
</ul>

<br/>

<h3><b>Backend Setup (Django)</b></h3>

<p><b>Step 1: Clone Repository</b></p>

<pre>
git clone &lt;your-github-repository-link&gt;
cd secure-user-profile
</pre>

<p><b>Step 2: Create and Activate Virtual Environment</b></p>

<pre>
python -m venv venv
venv\Scripts\activate
</pre>

<p><b>Step 3: Install Dependencies</b></p>

<pre>
cd backend
pip install requirements.txt
</pre>

<p><b>Step 4: PostgreSQL Configuration</b></p>

<pre>
CREATE DATABASE secure_profile_db;
CREATE USER secure_user WITH PASSWORD 'strongpassword';
GRANT ALL PRIVILEGES ON DATABASE secure_profile_db TO secure_user;
</pre>

<p>Update database settings in <b>settings.py</b>:</p>

<pre>
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "secure_profile_db",
        "USER": "secure_user",
        "PASSWORD": "strongpassword",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
</pre>

<p><b>Step 5: Environment Variables</b></p>

<pre>
SECRET_KEY=django-secret-key
AES_SECRET=32_CHARACTER_SECRET_KEY_FOR_AES
</pre>

<p><b>Step 6: Run Migrations and Start Server</b></p>

<pre>
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
</pre>

<p>
Backend runs at <b>http://127.0.0.1:8000</b>
</p>

<br/>

<h3><b>Frontend Setup (React)</b></h3>

<pre>
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
npm start
</pre>

<p>
Frontend runs at <b>http://localhost:3000</b>
</p>

<br/>

<h2><b>API Documentation</b></h2>

<h3><b>POST /api/register/ — User Registration</b></h3>

<p>
Registers a new user. Aadhaar number is encrypted using AES-256 before storage.
</p>

<pre>
{
  "username": "john_doe",
  "password": "strongpassword",
  "phone": "9876543210",
  "aadhaar": "123412341234"
}
</pre>

<p>
Creates a user record and an associated encrypted profile.
</p>

<br/>

<h3><b>POST /api/token/ — JWT Login</b></h3>

<p>
Authenticates a user and issues JWT access and refresh tokens.
</p>

<pre>
{
  "username": "john_doe",
  "password": "strongpassword"
}
</pre>

<p>
Returns stateless JWT tokens without server-side sessions.
</p>

<br/>

<h3><b>GET /api/profile/ — Secure Profile Fetch</b></h3>

<p>
Returns the authenticated user’s profile. Aadhaar is decrypted in the backend
before being sent in the response.
</p>

<pre>
Authorization: Bearer &lt;access_token&gt;
</pre>

<pre>
{
  "username": "john_doe",
  "phone": "9876543210",
  "aadhaar": "123412341234"
}
</pre>

<br/>

<h2><b>Database Schema</b></h2>

<p>
The database schema is designed to securely store user profile information.
Sensitive fields such as Aadhaar numbers are stored in encrypted form.
</p>

<br/>

<h3><b>UserProfile Table</b></h3>

<table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th>Column Name</th>
    <th>Data Type</th>
    <th>Constraints</th>
    <th>Description</th>
  </tr>

  <tr>
    <td>id</td>
    <td>Integer</td>
    <td>Primary Key, Auto Increment</td>
    <td>Unique identifier for the user profile record</td>
  </tr>

  <tr>
    <td>user_id</td>
    <td>Integer</td>
    <td>Foreign Key → auth_user(id), UNIQUE</td>
    <td>One-to-one reference to Django’s built-in User model</td>
  </tr>

  <tr>
    <td>aadhaar_encrypted</td>
    <td>Binary (bytea)</td>
    <td>NOT NULL</td>
    <td>
      Aadhaar number encrypted using AES-256 before storage.
      Plain Aadhaar is never stored in the database.
    </td>
  </tr>

  <tr>
    <td>phone</td>
    <td>Varchar(15)</td>
    <td>NOT NULL</td>
    <td>User’s registered phone number</td>
  </tr>
</table>

<br/>

<p>
<b>Security Note:</b> The <b>aadhaar_encrypted</b> field stores encrypted binary
data. Decryption is performed only in the backend during authenticated profile
access. The frontend never handles encryption or decryption logic.
</p>

<br/>

<h3><b>Relationship Summary</b></h3>

<ul>
  <li>Each record in <b>UserProfile</b> maps to exactly one record in <b>auth_user</b></li>
  <li>Deletion of a user automatically deletes the associated profile</li>
  <li>Encrypted data ensures compliance with secure data-at-rest principles</li>
</ul>

<h2><b>Project Checklist</b></h2>

<ul>
  <li>JWT-based login and registration implemented</li>
  <li>AES-256 encryption applied to sensitive data at rest</li>
  <li>Authenticated profile access with backend decryption</li>
  <li>React frontend for login, registration, and profile dashboard</li>
  <li>Robust client-side and server-side error handling</li>
</ul>
