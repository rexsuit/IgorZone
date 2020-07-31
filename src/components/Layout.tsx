import React from 'react'
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { StaticQuery, graphql } from 'gatsby'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <React.Fragment>
        <div sx={{ p: 4, bg: 'yellow' }}>{data.site.siteMetadata.title}</div>
        <div
          sx={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>© {new Date().getFullYear()}</footer>
        </div>
      </React.Fragment>
    )}
  />
)

export default Layout
