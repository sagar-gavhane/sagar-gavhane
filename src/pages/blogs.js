import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Header from "./../components/Header"
import Post from "./../components/Post"

const BlogsPage = props => {
  const blogs = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Blogs" />
      <Header />
      <h1>Blogs</h1>
      <div className="blogs__list">
        {blogs.map(blog => {
          const { title, date, description, slug } = blog.node.frontmatter
          return (
            <Post
              key={blog.node.id}
              heading={title}
              cover=""
              date={date}
              slug={slug}
              description={description}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export const blogQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            description
            slug
          }
        }
      }
    }
  }
`

export default BlogsPage
