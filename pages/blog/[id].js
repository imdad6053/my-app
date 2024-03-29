import React from "react";
import axiosService from "../../services/axios";
import SEO from "../../components/seo";
import nookies from "nookies";
const BlogDetail = ({ blog }) => {
  return (
    <>
      <SEO
        title={blog?.translation?.title}
        description={blog?.translation?.description}
        keywords={blog?.translation?.short_desc}
      />
      <div className="blog-detail">
        <div className="banner">
          <img
            src={process.env.NEXT_PUBLIC_IMG_BASE_URL + blog.img}
            alt="blog"
          />
        </div>
        <div className="detail-content">
          <div className="title">{blog?.translation?.title}</div>
          <div className="detail-navigation">
            <div className="date-com">
              <div className="date">{blog?.published_at}</div>
            </div>
          </div>
          <div
            className="detail-text"
            dangerouslySetInnerHTML={{ __html: blog?.translation?.description }}
          />
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const resBlog = await axiosService.get(`/rest/blogs/${query.id}`, {
    params: { language_id, lang: language_locale },
  });

  let blog = resBlog.data.data;
  return { props: { blog } };
}
export default BlogDetail;
