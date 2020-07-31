import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="/CanvasBalls">canvas balls test</Link>
      <Link to="/CanvasRipples">canvas ripples test</Link>
      <Link to="/ThreeLynda">Three scene from Lynda lesson</Link>
      <h2>Three JS Fundementals</h2>
      <ul>
        <li>
          <Link to="/fundementals/cube">cube scene</Link>
        </li>
        <li>
          <Link to="/fundementals/planets">Planets scene</Link>
        </li>
      </ul>
    </div>
  </Layout>
)

export default IndexPage
