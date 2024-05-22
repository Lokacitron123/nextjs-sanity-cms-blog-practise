import { Header } from "@/app/components/Header";
import { getSinglePost } from "@/app/lib/getSinglePost";
import { Metadata } from "next";
import React from "react";
import { Lilita_One, VT323 } from "next/font/google";
import getFormattedDate from "@/app/lib/getFormattedDate";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
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

export async function generateMetadata({ params }: Params) {
  const post: Post = await getSinglePost(params?.slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export const revalidate = 60;

export default async function SinglePostPage({ params, searchParams }: Params) {
  const post: Post = await getSinglePost(params?.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = getFormattedDate(post?.publishedAt);

  return (
    <div>
      <Header title={post?.title} />
      <article className='text-center'>
        <span className={`${dateFont.className} text-purple-500`}>
          {formattedDate}
        </span>
        <div className='mt-5'>
          {post.tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
              <span className='mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 '>
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={richTextStyles}>
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
      </article>
    </div>
  );
}

// https://www.sanity.io/docs/portable-text-to-react
const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className='bg-slate-50'>
        <Image
          src={urlForImage(value)}
          alt='Post Image'
          width={700}
          height={700}
        />
      </div>
    ),
  },
};

const richTextStyles = `
    mt-14
    text-justify
    max-w-2xl
    m-auto
    prose-headings:my-5
    prose-headings:text-2xl
    prose-p:mb-5
    prose-p:leading-7
    prose-li:list-disc
    prose-li:leading-7
    prose-li:ml-4
`;
