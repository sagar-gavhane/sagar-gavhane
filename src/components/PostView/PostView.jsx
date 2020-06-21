import React from "react"

import Layout from "./../Layout"
import SEO from "../seo"
import Header from "./../Header"

const PostView = props => {
  console.log("[props]", props)
  return (
    <Layout>
      <SEO
        title={props.pageContext.title}
        description={props.pageContext.description}
      />
      <Header />
      <article>
        <header>
          <h1 className="post-view__heading">{props.pageContext.title}</h1>
        </header>
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
