
import BlogDetailClient from "./blog-detail-client";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  return <BlogDetailClient slug={slug} />;
}
