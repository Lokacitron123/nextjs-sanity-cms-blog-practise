type Post = {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  headings?: string[] | HTMLHeadElement;
  body: any;
  tags: Array<Tag>;
  _id: string;
};

type Tag = {
  name: string;
  slug: {
    current: string;
  };
  _id: string;
  postCount?: number;
};
