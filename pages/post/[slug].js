import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import Container from "@/components/container";
import Images from "@/components/images";
import Seo from "@/components/seo";
import remark2rehype from "remark-rehype";
import styles from "./Post.module.css";



const Post = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    sharedImage: article.image,
    article: true,
  };

  return (
    <Container categories={categories}>
      <Seo seo={seo} />
      <div className={styles.title}>
        <h1>{article.title}</h1>
      </div>
      <div className={styles.picture}>
        <Images image={article.image} />
      </div>
      <div className={styles.content}>
        <ReactMarkdown children={article.content} />
      </div>
      <div className={styles.picture}>
        {article.author.picture && <Images image={article.author.picture} />}
      </div>
      <div className={styles.footer}>
        <p>By {article.author.name}</p>
        <p>
          By <Moment format="MMM Do YYYY">{article.published_at}</Moment>{" "}
        </p>
      </div>
    </Container>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: {
      article: articles[0],
      categories,
      revalidate: 1,
    },
  };
}

export default Post;

// import ReactMarkdown from "react-markdown";
// import Moment from "react-moment";
// import { fetchAPI } from "@/lib/api";
// import Container from "@/components/container";
// import Images from "@/components/images";
// import Seo from "@/components/seo";
// import { getStrapiMedia } from "@/lib/media";

// import remark2rehype from 'remark-rehype';

// const Post = ({ article, categories }) => {
//   const imageUrl = getStrapiMedia(article.image);

//   const seo = {
//     metaTitle: article.title,
//     metaDescription: article.description,
//     shareImage: article.image,
//     article: true,
//   };

//   return (
//     <Container categories={categories}>
//       <Seo seo={seo} />
//       <div data-src={imageUrl} data-srcset={imageUrl} data-uk-img>
//         <h1>{article.title}</h1>
//       </div>
//       <div>
//         <div>
//           <ReactMarkdown children={article.content} allowDangerousHtml={true} />
//           <div>
//             <div>
//               {article.author.picture && (
//                 <Images
//                   image={article.author.picture}
//                   style={{
//                     position: "static",
//                     borderRadius: "50%",
//                     height: 30,
//                   }}
//                 />
//               )}
//             </div>
//             <div>
//               <p>By {article.author.name}</p>
//               <p>
//                 <Moment format="MMM Do YYYY">{article.published_at}</Moment>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export async function getStaticPaths() {
//   const articles = await fetchAPI("/articles");

//   return {
//     paths: articles.map((article) => ({
//       params: {
//         slug: article.slug,
//       },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const articles = await fetchAPI(
//     `/articles?slug=${params.slug}&status=published`
//   );
//   const categories = await fetchAPI("/categories");

//   return {
//     props: { article: articles[0], categories },
//     revalidate: 1,
//   };
// }

// export default Post;
