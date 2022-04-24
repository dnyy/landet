import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const BlogItem = ({ blog }) => (
  <div>
    <div className="post-preview clickable">
      <Link href="/blog/[slug]" as={`/blog/${blog.slug}`}>
        <a>
          <h2 className="post-title">{blog.title}</h2>
          <h3 className="post-subtitle">{blog.subTitle}</h3>
        </a>
      </Link>
      <p className="post-meta">
        Skapad av
        <a href="#"> {blog.author.name} </a>-{" "}
        {dayjs(blog.createdAt).locale("sv").format("LLLL")}
      </p>
    </div>
  </div>
);

export default BlogItem;
