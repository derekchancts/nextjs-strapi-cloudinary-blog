import Posts from "@/components/posts";
import { fetchAPI } from "@/lib/api";
import Container from "@/components/container";
import Seo from "@/components/seo";
import styles from "../post/Post.module.css";

const Category = ({ category, categories }) => {
    const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <Container categories={categories}>
      <Seo seo={seo} />
      <div className="">
        <div className={styles.title}>
          <h1>{category.name}</h1>
          <Posts articles={category.articles} />
        </div>
      </div>
    </Container>
  );
};


export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0];
  const category = await fetchAPI(`/categories?slug=${params.slug}`);
  const categories = await fetchAPI("/categories");

  return {
    props: {
      category: category[0],
      categories,
    },
    revalidate: 1,
  }
}


export default Category;



