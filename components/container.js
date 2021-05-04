import Navigation from './navigation';


const Container = ({ children, categories }) => {
  return (
    <div className="nav_container">
      <Navigation categories={categories} />
      { children }
    </div>
  )
}

export default Container
