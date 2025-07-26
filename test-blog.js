const { getBlogPostBySlug, getAllBlogPosts } = require('./src/lib/blog.ts');

async function testBlog() {
  try {
    console.log('Testing blog system...');
    
    // Test getting all posts
    const posts = await getAllBlogPosts();
    console.log(`Found ${posts.length} blog posts`);
    
    if (posts.length > 0) {
      console.log('First post:', posts[0].title);
      
      // Test getting a specific post
      const post = await getBlogPostBySlug(posts[0].slug);
      if (post) {
        console.log('Successfully retrieved post:', post.title);
        console.log('Content length:', post.content.length);
        console.log('Reading time:', post.readingTime.text);
      }
    }
    
    console.log('Blog system test completed successfully!');
  } catch (error) {
    console.error('Blog system test failed:', error);
  }
}

testBlog();