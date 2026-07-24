# 🚀 Page Pulse - Website Audit Tool

Page Pulse is a web-based website auditing tool that analyzes any URL and generates a detailed audit report.

The tool checks important website information such as HTTP status, response time, page title, meta description, H1 headings, missing image alt text, approximate word count, and provides an SEO score.

This project was built as part of the Digital Heroes Training Task.

---

# ✨ Features

- Audit any website URL
- Check HTTP response status
- Measure webpage response time
- Extract page title
- Extract meta description
- Count H1 headings
- Detect images without alt text
- Calculate approximate word count
- Generate SEO score
- Handle invalid URLs properly
- Handle timeout errors
- Handle non-HTML responses

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Axios
- CSS
- Lucide React Icons

## Backend

- Node.js
- Express.js
- Axios
- Cheerio
- CORS
- dotenv

---

# 📂 Project Structure

```
page-pulse
│
├── frontend
│   ├── src
│   ├── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation and Setup

## 1. Clone Repository

```bash
git clone <your-github-repository-url>

cd page-pulse
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend server:

```bash
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🔌 API Documentation

## Audit Website URL

### Endpoint

```
POST /api/audit
```

---

## Request

Body:

```json
{
  "url": "https://example.com"
}
```

---

## Successful Response

Example:

```json
{
  "url": "https://example.com",
  "status": 200,
  "responseTime": "350 ms",
  "title": "Example Domain",
  "metaDescription": "Example description",
  "h1Count": 1,
  "imagesMissingAltText": 0,
  "approximateWordCount": 50,
  "seoScore": 90
}
```

---

# ❌ Error Handling

The application handles different failure scenarios.

## Invalid URL

Request:

```
abc123
```

Response:

```json
{
  "error": "Invalid URL format"
}
```

---

## Website Timeout

Response:

```json
{
  "error": "Request timeout"
}
```

---

## Non HTML Response

Response:

```json
{
  "error": "Only HTML pages are supported"
}
```

---

# 🧠 Design Decisions

## 1. Used Cheerio for HTML Parsing

Cheerio was used because it provides fast and simple server-side HTML parsing.

It allows extracting webpage elements such as:

- Title
- Meta description
- H1 tags
- Images
- Text content

---

## 2. Added Timeout Handling

Axios timeout handling was implemented to prevent the server from waiting forever for slow or unavailable websites.

This improves reliability and prevents crashes.

---

## 3. Separate Frontend and Backend Architecture

Frontend and backend are separated into different folders.

Benefits:

- Cleaner code structure
- Easier maintenance
- Easier deployment
- Better scalability

---

# 📊 SEO Score Calculation

The SEO score is calculated based on webpage factors:

- Missing title
- Missing meta description
- Missing H1 heading
- Images without alt text
- Low word count

The score helps users quickly understand the basic SEO quality of a webpage.

---

# 🚀 Deployment

Frontend and backend can be deployed separately.

Frontend:

- Vercel

Backend:

- Render / other Node.js hosting platforms

---

# 🔮 Future Improvements

Possible improvements:

- User authentication
- Save audit history
- Database integration
- Advanced SEO analysis
- PDF report generation
- More performance metrics

---

# 📌 Footer Credit

Built for [Digital HeroesTraining Task](https://digitalheroesco.com)
