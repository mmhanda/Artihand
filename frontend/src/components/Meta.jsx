import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> { title } </title>
      <meta name="description" content={description}/>
      <meta name="keyword" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'Best in the world is here',
  keywords: 'Any thing you want'
}

export default Meta;