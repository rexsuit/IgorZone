import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
// import Image from "../components/image";
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>{/* <Link to="/ThreeTest/">THREE.js test</Link> */}</div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="/CanvasBalls/">canvas balls test</Link>
      <Link to="/CanvasRipples/">canvas ripples test</Link>
      <Link to="/ThreeTest/">Three scene from Lynda lesson</Link>
      <Link to="/three2">Three scene from 3js fundementals</Link>
    </div>
  </Layout>
)

export default IndexPage
