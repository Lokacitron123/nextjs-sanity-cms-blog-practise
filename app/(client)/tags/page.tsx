import { Header } from "@/app/components/Header";
import { getAllTags } from "@/app/lib/getAllTags";
import Link from "next/link";

export const revalidate = 60;

export default async function Tags() {
  const tags: Tag[] = await getAllTags();

  return (
    <section>
      <Header title='Tags' />
      <div>
        {tags.length > 0 &&
          tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
              <div className='mb-2 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500'>
                #{tag.name} {`(${tag.postCount})`}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
