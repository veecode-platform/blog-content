import { DocumentRenderer } from "@keystatic/core/renderer";
import Seo from "../../components/Seo";
import Divider from "../../components/Divider";
import { inject } from "../../utils/slugHelpers";
import Card from "@/components/Card";
import { reader } from "../reader";

async function getHomeData() {
  const homePage = await reader.singletons.home.read();
  const homePageHeading = await (homePage?.heading() || []);

  return {
    ...homePage,
    heading: homePageHeading,
  };
}

async function getPostData() {
  const postSlugs = await reader.collections.posts.list();

  const postData = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug);
      const content = (await post?.content()) || [];
      return {
        ...post,
        content,
        slug,
        ...({ type: "post" } as const),
      };
    })
  );
  return postData;
}

async function getExternalArticleData() {
  const externalArticles = await reader.collections.externalArticles.list();
  const externalArticleData = await Promise.all(
    externalArticles.map((slug) =>
      inject(slug, reader.collections.externalArticles)
    )
  );
  return externalArticleData.map((article) => ({
    ...({ type: "externalArticle" } as const),
    ...article,
  }));
}

async function getAllAuthors() {
  const authorsList = await reader.collections.authors.list();
  const allAuthors = await Promise.all(
    authorsList.map((slug) => inject(slug, reader.collections.authors))
  );
  return allAuthors;
}


export default async function Home() {

  const [home, posts, externalArticles, authors] = await Promise.all([
    getHomeData(),
    getPostData(),
    getExternalArticleData(),
    getAllAuthors(),
  ]);

  const allPosts = [...posts, ...externalArticles];
  const orderedPostFeed = allPosts.sort((a, b) => {
    if (a?.publishedDate && b?.publishedDate) {
      return new Date(a.publishedDate).getTime() <
        new Date(b.publishedDate).getTime()
        ? 1
        : -1;
    }

    return 0;
  });

  return (
    <div className="px-4 md:px-28 max-w-7xl mx-auto">
      <Seo />
      {home.heading && (
        <>
          <DocumentRenderer
            document={home.heading}
            renderers={{
              inline: {
                bold: ({ children }) => {
                  return <span className="text-cyan-700">{children}</span>;
                },
              },
              block: {
                paragraph: ({ children }) => {
                  return (
                    <h1 className="text-center font-bold text-[2.8rem] px-2 pt-5 pb-20 sm:text-7xl sm:max-w-2xl lg:text-7xl lg:max-w-[60rem] mx-auto mx-autotext-transparent text-transparent bg-clip-text bg-gradient-to-r from-platform-400 to-sky-600">
                      {children}
                    </h1>
                  );
                },
              },
            }}
          />
          <Divider />
        </>
      )}
      {orderedPostFeed.length === 0 ? (
        <h2>There are no posts available</h2>
      ) : (
        <ul className="grid my-5 mb-20 grid-cols-1 gap-1 md:gap-x-6 gap-y-20 sm:gap-y-16 md:grid-cols-2 xl:grid-cols-3 pl-0">
          {orderedPostFeed.map((post) => {
            if (post.type === "externalArticle") {
              return (
                <Card
                  image={`/images/external-articles/${post.slug}/${post.coverImage}`}
                  title={post.title}
                  summary={post.summary}
                  link={post.directLink}
                  externalLink
                  key={post.slug}
                />
              );
            }
            if (post.type === "post") {
              return (
                <Card
                  image={`/images/posts/${post.slug}/${post.coverImage}`}
                  title={post.title}
                  summary={post.summary}
                  key={post.slug}
                  link={`/${post.slug}`}
                />
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
