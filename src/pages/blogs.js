import React, { useRef, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Header from "./../components/Header"
import Post from "./../components/Post"
import { annotate, annotationGroup } from "rough-notation"

const BlogsPage = props => {
  const blogs = props.data.allMarkdownRemark.edges
  const blogsRef = useRef(null)

  useEffect(() => {
    if (blogsRef.current) {
      annotationGroup(
        Array.from(
          blogsRef.current.querySelectorAll(".post__heading")
        ).map(el => annotate(el, { type: "underline" }))
      ).show()
    }
  }, [])

  return (
    <Layout>
      <SEO title="Blogs" />
      <Header />
      <h1>Blogs</h1>
      <div className="blogs__list" ref={blogsRef}>
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
