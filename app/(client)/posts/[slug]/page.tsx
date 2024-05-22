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
import { slugify } from "@/app/utils/helpers";

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
        <Toc headings={post.headings} />
        <div className={richTextStyles}>
          {/*  Portable text helps us render data from sanity */}
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
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className='text-3xl font-bold mb-3'
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className='text-2xl font-bold mb-3'
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className='text-2xl font-bold mb-3'
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className='text-2xl font-bold mb-3'
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className='text-xl font-bold mb-3'
      >
        {value.children[0].text}
      </h6>
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

// Table Content for linking inside an "post" article
const Toc = ({ headings }: any) => (
  <div className='max-w-2xl mx-auto mt-8 text-center border rounded-sm dark:border-purple-950 '>
    <h2 className='text-xl font-bold p-2 mb-5 border-b dark:border-purple-950 bg-amber-50 dark:bg-slate-950/20'>
      Table of Contents
    </h2>
    <nav className='flex justify-center '>
      <ul className='text-start'>
        {headings?.map((heading: any) => (
          <li key={heading?._key} className='py-1'>
            <a
              href={`#${slugify(heading.children[0].text)}`}
              className='mb-2 hover:underline hover:underline-offset-2'
            >
              {heading.children[0].text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);
