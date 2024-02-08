import { reader } from "@/app/reader";
import { notFound } from "next/navigation";
import PostComponent from "@/components/PostComponent";

export default async function Post({ params }: { params: { slug: string } }) {

  const { slug } = params;
  const post = await reader.collections.posts.readOrThrow(slug);
  const postElement = await post.content();

  if (!post) notFound()

  const authors = await Promise.all(
    post!.authors.map(async (authorSlug) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    })
  );

  return <PostComponent 
              post={post} 
              slug={slug} 
              authors={authors} 
              postElement={postElement}
              />
}

export async function generateStaticParams(){
  const slugs = await reader.collections.posts.list();

  // return slugs.map((slug) => ({
  //   params: {
  //     slug,
  //   },
  // }));
  return slugs.map((slug)=>({
    slug: slug
  }))

}