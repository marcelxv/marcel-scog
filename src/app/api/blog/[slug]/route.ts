import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/blog';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  const includeRelated = searchParams.get('related') === 'true';

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        {
          error: 'Blog post not found',
          success: false,
        },
        { status: 404 }
      );
    }

    let relatedPosts: any[] = [];
    if (includeRelated) {
      relatedPosts = await getRelatedPosts(post, 3);
    }

    return NextResponse.json({
      post,
      relatedPosts: includeRelated ? relatedPosts : undefined,
      success: true,
    });
  } catch (error) {
    console.error(`Blog post API error for slug ${slug}:`, error);
    return NextResponse.json(
      {
        error: 'Failed to fetch blog post',
        success: false,
      },
      { status: 500 }
    );
  }
}
