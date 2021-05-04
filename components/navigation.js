
import Link from 'next/link';


const Navigation = ({ categories }) => {
  return (
    <div>
      <nav>
        {/* <div> */}
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {categories && categories.map((category) => (
              <li key={category.id}>
                <Link as={`/category/${category.slug}`} href="/category/[id]">
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        {/* </div> */}
      </nav>
    </div>
  )
}

export default Navigation
