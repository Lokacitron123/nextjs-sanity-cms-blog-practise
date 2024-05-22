import { client } from "@/sanity/lib/client";

export const getAllTags = async () => {
  const query = `
     *[_type == "tag"] {
    name,
    slug,
    _id,
    "postCount": count(*[_type == "post" && references("tags", ^._id)])
  }
  `;

  const tags = await client.fetch(query);

  return tags;
};
