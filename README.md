<h1><b>Secure User Profile & Access Control System</b></h1>

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

<h2><b>Project Overview</b></h2>

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
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install cryptography
pip install psycopg2-binary
pip install python-dotenv
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

<p><b>UserProfile Table</b></p>

<ul>
  <li>user – Foreign key reference to Django auth_user</li>
  <li>phone – User phone number</li>
  <li>aadhaar_encrypted – AES-256 encrypted binary data</li>
</ul>

<p>
Sensitive Aadhaar data is never stored in plaintext in the database.
</p>

<br/>

<h2><b>AI Tool Usage Log (MANDATORY)</b></h2>

<p>
AI tools were used as development assistance to speed up understanding of
encryption patterns, authentication flows, and framework configuration.
The AI acted only as a helper and not as an autonomous code generator.
</p>

<p>
AI guidance helped with AES-256 encryption design, JWT authentication setup,
REST API structuring, frontend authentication integration, and debugging
complex issues related to encryption, database configuration, and token handling.
</p>

<p>
All encryption logic, secret management, API authorization rules, backend-only
decryption, frontend integration, and error handling were implemented manually.
Each AI-assisted suggestion was reviewed, customized, tested locally, and validated
against assignment requirements.
</p>

<p>
The final implementation decisions, security enforcement, and testing outcomes
are the result of manual development and verification.
</p>

<br/>

<h2><b>Assignment Completion Confirmation</b></h2>

<ul>
  <li>JWT-based login and registration implemented</li>
  <li>AES-256 encryption applied to sensitive data at rest</li>
  <li>Authenticated profile access with backend decryption</li>
  <li>React frontend for login, registration, and profile dashboard</li>
  <li>Robust client-side and server-side error handling</li>
  <li>Mandatory AI usage documented</li>
</ul>
