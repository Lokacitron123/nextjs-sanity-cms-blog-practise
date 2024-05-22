import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { getPosts } from "../lib/getPosts";

export const revalidate = 60; // Next.js looks at this automatically and sets a revalidate timer on cache every 60s

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <div>
      <Header title='Articles' tags />
      <section>
        {posts?.length > 0 &&
          posts?.map((post) => <Post post={post} key={post._id} />)}
      </section>
    </div>
  );
}
