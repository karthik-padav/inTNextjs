import SEO from "next.seo.config";
export const getSeoDetails = ({ title, description }) => {
  const obj = { ...SEO };
  if (title) {
    obj.title = title;
    obj.openGraph.title = title;
  }
  if (description) {
    obj.description = description;
    obj.openGraph.description = description;
  }
  return obj;
};
