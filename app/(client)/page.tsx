import { client } from "@/sanity/lib/client";
import { Header } from "../components/Header";
import { Post } from "../components/Post";

const getPosts = async () => {
  const query = `
     *[_type == "post"] {
        title,
    slug,
    publishedAt,
    excerpt,
    _id,
    tags[]-> {
      _id,
      slug,
      name
    }
    }
  `;

  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const posts: Post[] = await getPosts();
  console.log("posts", posts);
  return (
    <div>
      <Header title='Articles' />
      <section>
        {posts?.length > 0 &&
          posts?.map((post) => <Post post={post} key={post._id} />)}
      </section>
    </div>
  );
}
