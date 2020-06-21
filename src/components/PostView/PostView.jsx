import React, { useRef, useEffect } from "react"

import Layout from "./../Layout"
import SEO from "../seo"
import Header from "./../Header"
import { annotate } from "rough-notation"

const PostView = props => {
  const postHeading = useRef(null)

  useEffect(() => {
    if (postHeading.current) {
      annotate(postHeading.current.querySelector("span"), {
        type: "underline",
      }).show()
    }
  }, [])

  return (
    <Layout>
      <SEO
        title={props.pageContext.title}
        description={props.pageContext.description}
      />
      <Header />
      <h1 className="post-view__heading" ref={postHeading}>
        <span>{props.pageContext.title}</span>
      </h1>
      <article>
        <section
          className="post-view__section"
          dangerouslySetInnerHTML={{
            __html: props.data.markdownRemark.html,
          }}
        ></section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`

export default PostView
