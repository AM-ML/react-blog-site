import {useParams} from "react-router-dom"
import AnimationWrapper from "../common/page-animation"
import SearchComponent from "../components/search-component"

const Search = () => {
  const {query} = useParams();
  return (
    <AnimationWrapper>
      <SearchComponent query={query} />
    </AnimationWrapper>
  )
}

export default Search;
