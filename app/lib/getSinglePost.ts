import { client } from "@/sanity/lib/client";

export const getSinglePost = async (slug: string) => {
  const query = `
   *[_type == "post" && slug.current == "${slug}"][0]{
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
     "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
      tags[]-> {
        _id,
        slug,
        name
      },
  }
  `;

  const post = await client.fetch(query);
  return post;
};
