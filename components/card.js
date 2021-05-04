import Link from 'next/link';
import Images from './images';
import styles from '../styles/Home.module.css'


const Card = ({ article }) => {
  return (
    <div>
      <Link as={`/post/${article.slug}`} href="/post[id]"  >
        <a>
          <div className={styles.card}>
            <div>
              <Images image={article.image} />
            </div>
            <div>
              <p>{article.title}</p>
              <p>{article.category.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card
