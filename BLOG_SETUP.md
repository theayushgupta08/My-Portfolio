# Blog System Setup Guide

This guide will help you set up a complete blog system for your portfolio website, including a separate admin panel for managing blog posts.

## Overview

Your blog system consists of:
1. **Frontend (Portfolio)**: Displays blog posts at `/blogs` and individual articles at `/blogs/:slug`
2. **Backend API**: Manages blog data (CRUD operations)
3. **Admin Panel**: Separate web app for writing/editing/managing blogs

## Current Implementation

### ✅ What's Already Set Up

1. **Frontend Routes**:
   - `/blogs` - Blog listing page
   - `/blogs/:slug` - Individual blog post page (e.g., `/blogs/tech-innovation-in-manufacturing`)

2. **Components Created**:
   - `src/pages/BlogsList.jsx` - Blog listing with filtering
   - `src/pages/BlogPost.jsx` - Individual blog post view
   - `src/services/blogService.js` - API service layer (currently using mock data)

3. **Features**:
   - Category filtering
   - Reading time calculation
   - Share functionality
   - Responsive design
   - SEO-friendly URLs

## What You Need to Set Up

### 1. Backend API

You'll need a backend API to store and manage blog posts. Here are your options:

#### Option A: Node.js/Express + MongoDB (Recommended)

**Tech Stack:**
- Node.js + Express
- MongoDB (with Mongoose)
- JWT for authentication (for admin panel)

**Project Structure:**
```
blog-api/
├── server.js
├── package.json
├── routes/
│   └── blogs.js
├── models/
│   └── Blog.js
├── middleware/
│   └── auth.js
└── .env
```

**Key Endpoints Needed:**
```
GET    /api/blogs           - Get all published blogs
GET    /api/blogs/:slug     - Get single blog by slug
POST   /api/blogs           - Create new blog (admin only)
PUT    /api/blogs/:id       - Update blog (admin only)
DELETE /api/blogs/:id       - Delete blog (admin only)
```

**Sample Blog Schema:**
```javascript
{
  title: String,
  slug: String (unique),
  excerpt: String,
  content: String (HTML),
  category: String,
  tags: [String],
  featuredImage: String (URL),
  publishedAt: Date,
  updatedAt: Date,
  author: String,
  published: Boolean
}
```

#### Option B: Headless CMS (Easier Setup)

**Popular Options:**
- **Contentful** - Free tier available, great for blogs
- **Strapi** - Self-hosted, open-source
- **Sanity** - Developer-friendly, real-time
- **Ghost** - Built specifically for blogging

**Advantages:**
- No backend code needed
- Built-in admin panel
- Image hosting included
- SEO features built-in

#### Option C: Firebase/Firestore

**Tech Stack:**
- Firebase Firestore (database)
- Firebase Storage (for images)
- Firebase Authentication (for admin)

**Advantages:**
- Serverless
- Real-time updates
- Easy to set up
- Free tier available

### 2. Admin Panel (Separate Web App)

Create a separate React app for managing blogs:

**Recommended Structure:**
```
blog-admin/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BlogList.jsx
│   │   ├── BlogEditor.jsx (for create/edit)
│   ├── components/
│   │   ├── RichTextEditor.jsx (use libraries like Draft.js, Quill, or TipTap)
│   │   ├── ImageUploader.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
```

**Key Features Needed:**
- Authentication/Login
- Rich text editor (WYSIWYG)
- Image upload
- Slug generator from title
- Preview functionality
- Publish/Draft toggle
- Delete confirmation

**Rich Text Editor Libraries:**
- **TipTap** (recommended) - Modern, extensible
- **Draft.js** - Facebook's editor
- **Quill** - Simple and powerful
- **React Quill** - React wrapper for Quill

### 3. Environment Variables

**Portfolio App (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

**Backend API (.env):**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/portfolio-blog
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

**Admin Panel (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ADMIN_URL=http://localhost:5174
```

## Step-by-Step Setup

### Step 1: Set Up Backend API

1. **Create a new directory for your API:**
   ```bash
   mkdir blog-api
   cd blog-api
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express mongoose cors dotenv jsonwebtoken bcryptjs
   npm install -D nodemon
   ```

3. **Create basic server structure** (see sample code below)

4. **Set up MongoDB:**
   - Install MongoDB locally, OR
   - Use MongoDB Atlas (free cloud database)

5. **Update `src/services/blogService.js`** in your portfolio:
   - Replace mock data with actual API calls
   - Update `API_BASE_URL` to your backend URL

### Step 2: Create Admin Panel

1. **Create new React app:**
   ```bash
   npm create vite@latest blog-admin -- --template react
   cd blog-admin
   npm install
   ```

2. **Install additional dependencies:**
   ```bash
   npm install react-router-dom @tiptap/react @tiptap/starter-kit @tiptap/extension-image axios
   ```

3. **Set up authentication**
4. **Create blog editor component**
5. **Connect to your API**

### Step 3: Deploy

**Portfolio:**
- Deploy to Vercel, Netlify, or your hosting provider
- Set environment variable `VITE_API_BASE_URL` to your production API URL

**Backend API:**
- Deploy to Heroku, Railway, Render, or DigitalOcean
- Set up MongoDB Atlas for production database
- Update CORS settings for production domain

**Admin Panel:**
- Deploy to separate subdomain (e.g., `admin.yourdomain.com`)
- Or deploy to different path (e.g., `yourdomain.com/admin`)
- Set environment variables

## Sample Backend Code

### server.js (Express)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/blogs', require('./routes/blogs'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### models/Blog.js
```javascript
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: { type: String, required: true },
  category: String,
  tags: [String],
  featuredImage: String,
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: String,
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Blog', blogSchema);
```

### routes/blogs.js
```javascript
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create blog (add auth middleware)
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update blog (add auth middleware)
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete blog (add auth middleware)
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Quick Start with Headless CMS (Contentful)

If you want the fastest setup without writing backend code:

1. **Sign up for Contentful** (free tier)
2. **Create a Content Model** called "Blog Post" with fields:
   - Title (Short text)
   - Slug (Short text, unique)
   - Excerpt (Short text)
   - Content (Long text)
   - Category (Short text)
   - Tags (Short text, list)
   - Featured Image (Media)
   - Published At (Date & time)
   - Published (Boolean)

3. **Get API keys** from Contentful dashboard

4. **Install Contentful SDK:**
   ```bash
   npm install contentful
   ```

5. **Update blogService.js:**
   ```javascript
   import { createClient } from 'contentful';

   const client = createClient({
     space: 'your-space-id',
     accessToken: 'your-access-token'
   });

   export const getBlogPosts = async () => {
     const response = await client.getEntries({
       content_type: 'blogPost',
       'fields.published': true,
       order: '-fields.publishedAt'
     });
     return response.items.map(item => ({
       id: item.sys.id,
       slug: item.fields.slug,
       title: item.fields.title,
       excerpt: item.fields.excerpt,
       content: item.fields.content,
       category: item.fields.category,
       tags: item.fields.tags || [],
       featuredImage: item.fields.featuredImage?.fields?.file?.url,
       publishedAt: item.fields.publishedAt,
       author: 'Ayush Gupta'
     }));
   };
   ```

6. **Use Contentful's web app** as your admin panel (no separate app needed!)

## Resources Needed Summary

### Development:
- ✅ Frontend code (already created)
- ⚠️ Backend API (you need to create)
- ⚠️ Admin Panel (you need to create)
- ⚠️ Database (MongoDB, PostgreSQL, or use CMS)

### Hosting:
- Portfolio: Vercel/Netlify (free)
- Backend API: Railway/Render/Heroku (free tiers available)
- Admin Panel: Vercel/Netlify (free)
- Database: MongoDB Atlas (free tier) or use CMS

### Services:
- Image hosting: Cloudinary (free tier) or Firebase Storage
- Authentication: JWT or Firebase Auth
- Rich Text Editor: TipTap, Quill, or Draft.js

## Next Steps

1. Choose your backend solution (Node.js, Headless CMS, or Firebase)
2. Set up the backend API
3. Update `blogService.js` to use real API
4. Create admin panel
5. Test locally
6. Deploy all components

## Need Help?

- Check the `src/services/blogService.js` file for API integration examples
- The mock data structure shows the expected blog post format
- All frontend components are ready and just need to be connected to your API

Good luck with your blog setup! 🚀

