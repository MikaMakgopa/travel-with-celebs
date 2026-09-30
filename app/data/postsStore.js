import { samplePosts } from './posts';

const STORAGE_KEY = 'twc_published_articles';

// Get all posts (combines initial sample posts + user created posts)
export function getStoredPosts() {
  if (typeof window === 'undefined') return samplePosts;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
    return samplePosts;
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    return samplePosts;
  }
}

// Save a new article
export function saveNewPost(postData) {
  const currentPosts = getStoredPosts();
  const newPost = {
    id: Date.now().toString(), // Generates unique ID based on timestamp
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '4 min read',
    isFeatured: postData.isFeatured || false,
    ...postData
  };

  const updatedPosts = [newPost, ...currentPosts];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  }
  return updatedPosts;
}

// Delete an article
export function deletePostById(id) {
  const currentPosts = getStoredPosts();
  const updatedPosts = currentPosts.filter(post => post.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  }
  return updatedPosts;
}