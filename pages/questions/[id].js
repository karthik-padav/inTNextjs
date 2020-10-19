import Link from "next/link";
import { getQuestions } from "../../DataService/Services";

function Post(props) {
  console.log(props, "props123123");
  return <>asdasd</>;
}

Post.getInitialProps = async function (data) {
  const { id } = data.query;
  const query = `?id=${id}`;
  const res = await getQuestions(query);
  return res;
};

export default Post;
