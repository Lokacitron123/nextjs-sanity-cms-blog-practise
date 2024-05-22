import { Header } from "@/app/components/Header";
import { Post } from "@/app/components/Post";
import { getPostsByTag } from "@/app/lib/getPostsByTag";
import { Lilita_One, VT323 } from "next/font/google";
import { notFound } from "next/navigation";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export const revalidate = 60;

export default async function Tag({ params }: Params) {
  const posts: Post[] = await getPostsByTag(params?.slug);

  if (!posts) {
    notFound();
  }

  return (
    <section>
      <Header title={`#${params.slug}`} tags />
      <div>
        {posts?.length > 0 &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </section>
  );
}
