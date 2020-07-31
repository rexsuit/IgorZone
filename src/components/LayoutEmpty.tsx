import React from 'react'
import { Global } from '@emotion/core'

export default ({ children, ...props }) => (
  <div>
    <Global
      styles={() => ({
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
        },
        canvas: {
          display: 'block',
        },
      })}
    />
    <main {...props}>{children}</main>
  </div>
)
