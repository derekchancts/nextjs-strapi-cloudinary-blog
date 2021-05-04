import Card from './card';
import styles from '../styles/Home.module.css'


const Posts = ({ articles }) => {
  return (
    <div>
      <div className={styles.postContainer}>
        {articles && articles.map(article => (
          <Card key={`article_${article.slug}`} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Posts
