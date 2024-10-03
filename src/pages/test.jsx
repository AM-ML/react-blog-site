import axios from "axios";
import {useEffect, useState} from "react";

const Test = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    axios.post("https://boffoback.loca.lt/search-blogs", {})
    .then(({ data }) => {
        console.log(data);
      })
    .catch(( error ) => {
        console.log(error)
      })
  }, [])

  return (
  <div className="tst-container">
      <div className="tst-row">
        <div className="tst-result">
          { result }
        </div>
      </div>
    </div>
  )
}

export default Test;
