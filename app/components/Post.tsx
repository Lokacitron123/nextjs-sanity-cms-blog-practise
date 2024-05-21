import Link from "next/link";
import React from "react";
import { Lilita_One, VT323 } from "next/font/google";
import getFormattedDate from "../lib/getFormattedDate";

interface Props {
  post: Post;
}

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

export const Post = ({ post }: Props) => {
  const formattedDate = getFormattedDate(post.publishedAt);
  return (
    <article className={cardStyle}>
      <Link href={`/posts/${post.slug.current}`}>
        <h2 className={`${font.className} text2xl dark:text-slate-300`}>
          {post.title}
        </h2>
        <p className={`${dateFont.className} my-2 dark:text-purple-300`}>
          {formattedDate}
        </p>
        <p className='dark:text-gray-400 mb-4 line-clamp-2'>{post.excerpt}</p>
      </Link>

      <div>
        {post?.tags.map((tag) => (
          <span
            className='mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900'
            key={tag._id}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </article>
  );
};

const cardStyle = `
    mb-8
    p-4
    border
    border-gray-900
    rounded-md
    shadow-sm
    shadow-purple-950
    hover:shadow-md
    hover:bg-purple-500
    hover:text-white
    hover:dark:bg-gray-950
`;
