// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostBySlug, getPosts } from "@/lib/service";

const PostPage = ({ post }: { post: any }) => {
  const { title, content } = post;

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(); // Fetch posts to get slugs

  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
};

export default PostPage;
