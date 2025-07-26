import { NextRequest, NextResponse } from 'next/server';
import {
  getAllBlogPosts,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  searchBlogPosts,
  getAllCategories,
  getAllTags,
  getFeaturedBlogPosts,
} from '@/lib/blog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');
  const meta = searchParams.get('meta');

  try {
    // Return metadata (categories and tags)
    if (meta === 'true') {
      const categories = await getAllCategories();
      const tags = await getAllTags();

      return NextResponse.json({
        categories,
        tags,
        success: true,
      });
    }

    // Return featured posts
    if (featured === 'true') {
      const posts = await getFeaturedBlogPosts();
      return NextResponse.json({
        posts,
        total: posts.length,
        success: true,
      });
    }

    // Search posts
    if (search) {
      const posts = await searchBlogPosts(search);
      return NextResponse.json({
        posts,
        total: posts.length,
        query: search,
        success: true,
      });
    }

    // Filter by category
    if (category) {
      const posts = await getBlogPostsByCategory(category);
      return NextResponse.json({
        posts,
        total: posts.length,
        category,
        success: true,
      });
    }

    // Filter by tag
    if (tag) {
      const posts = await getBlogPostsByTag(tag);
      return NextResponse.json({
        posts,
        total: posts.length,
        tag,
        success: true,
      });
    }

    // Return all posts
    const posts = await getAllBlogPosts();
    return NextResponse.json({
      posts,
      total: posts.length,
      success: true,
    });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch blog posts',
        success: false,
      },
      { status: 500 }
    );
  }
}
