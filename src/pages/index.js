import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Link to="/ThreeTest/">THREE.js test</Link>
    </div>
    <div>
      <Link to="/CanvasBalls/">canvas balls test</Link>
    </div>
  </Layout>
);

export default IndexPage;
