import Link from "next/link";
import { bloodRequied } from "../DataService/Services";

function About() {
  return (
    <Link href="/">
      <a>Home</a>
    </Link>
  );
}

About.getInitialProps = async function () {
  const res = await bloodRequied();
  console.log(res, "we are in about");
  return res;
};
export default About;
