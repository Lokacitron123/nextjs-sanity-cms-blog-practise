import { client } from "@/sanity/lib/client";

export const getPosts = async () => {
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
