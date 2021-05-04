import Container from '@/components/container';
import { fetchAPI } from '@/lib/api';
import Posts from '@/components/posts';

export default function Home({ articles, categories, homepage }) {
  return (
    <Container categories={categories}>
      <div>
        <div className="container">
          <h1>{homepage.hero.title}</h1>
          <Posts articles={articles} />
        </div>
      </div>
    </Container>
  )
}


export async function getStaticProps() {
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  }
}