/**
 * Blog Service
 * 
 * This service handles fetching blog posts from your backend API.
 * 
 * For now, it uses mock data. You'll need to:
 * 1. Set up a backend API (see BLOG_SETUP.md)
 * 2. Replace the mock data with actual API calls
 * 3. Update the API_BASE_URL constant
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Mock data - Replace this with actual API calls
const mockBlogPosts = [
  {
    id: '1',
    slug: 'tech-innovation-in-manufacturing',
    title: 'Tech Innovation in Manufacturing',
    excerpt: 'Exploring how modern technology is revolutionizing the manufacturing industry.',
    content: `
      <h2>Introduction</h2>
      <p>Technology has always been a driving force in manufacturing, but recent innovations are transforming the industry at an unprecedented pace.</p>
      
      <h2>The Rise of Industry 4.0</h2>
      <p>Industry 4.0 represents the fourth industrial revolution, characterized by the integration of digital technologies, artificial intelligence, and the Internet of Things (IoT) into manufacturing processes.</p>
      
      <h2>Key Technologies</h2>
      <ul>
        <li><strong>Artificial Intelligence:</strong> AI is being used for predictive maintenance, quality control, and process optimization.</li>
        <li><strong>Internet of Things:</strong> IoT sensors collect real-time data from manufacturing equipment.</li>
        <li><strong>Robotics:</strong> Advanced robotics are automating complex manufacturing tasks.</li>
        <li><strong>3D Printing:</strong> Additive manufacturing is revolutionizing prototyping and production.</li>
      </ul>
      
      <h2>Benefits</h2>
      <p>The integration of these technologies offers numerous benefits:</p>
      <ul>
        <li>Increased efficiency and productivity</li>
        <li>Reduced waste and costs</li>
        <li>Improved quality control</li>
        <li>Enhanced safety for workers</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As technology continues to evolve, manufacturers who embrace innovation will gain a competitive edge in the global market.</p>
    `,
    category: 'Technology',
    tags: ['Manufacturing', 'Industry 4.0', 'AI', 'IoT'],
    featuredImage: null,
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    author: 'Ayush Gupta',
  },
  {
    id: '2',
    slug: 'getting-started-with-react',
    title: 'Getting Started with React',
    excerpt: 'A comprehensive guide for beginners to start building modern web applications with React.',
    content: `
      <h2>What is React?</h2>
      <p>React is a JavaScript library for building user interfaces, particularly web applications.</p>
      
      <h2>Why React?</h2>
      <p>React offers several advantages:</p>
      <ul>
        <li>Component-based architecture</li>
        <li>Virtual DOM for performance</li>
        <li>Large ecosystem and community</li>
        <li>Reusable components</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To start a new React project, you can use Create React App or Vite:</p>
      <pre><code>npm create vite@latest my-app -- --template react</code></pre>
      
      <h2>Conclusion</h2>
      <p>React is a powerful tool for building modern web applications. Start with the basics and gradually explore more advanced concepts.</p>
    `,
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'Frontend'],
    featuredImage: null,
    publishedAt: '2024-02-01',
    updatedAt: '2024-02-01',
    author: 'Ayush Gupta',
  },
];

/**
 * Fetch all blog posts
 * @returns {Promise<Array>} Array of blog posts
 */
export const getBlogPosts = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/blogs`);
    // if (!response.ok) throw new Error('Failed to fetch blog posts');
    // return await response.json();
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBlogPosts);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch a single blog post by slug
 * @param {string} slug - The slug of the blog post
 * @returns {Promise<Object>} Blog post object
 */
export const getBlogPostBySlug = async (slug) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
    // if (!response.ok) throw new Error('Blog post not found');
    // return await response.json();
    
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = mockBlogPosts.find(p => p.slug === slug);
        if (post) {
          resolve(post);
        } else {
          reject(new Error('Blog post not found'));
        }
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

/**
 * Create a new blog post (for admin panel)
 * @param {Object} postData - Blog post data
 * @returns {Promise<Object>} Created blog post
 */
export const createBlogPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) throw new Error('Failed to create blog post');
    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

/**
 * Update an existing blog post (for admin panel)
 * @param {string} id - Blog post ID
 * @param {Object} postData - Updated blog post data
 * @returns {Promise<Object>} Updated blog post
 */
export const updateBlogPost = async (id, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) throw new Error('Failed to update blog post');
    return await response.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

/**
 * Delete a blog post (for admin panel)
 * @param {string} id - Blog post ID
 * @returns {Promise<void>}
 */
export const deleteBlogPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) throw new Error('Failed to delete blog post');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

