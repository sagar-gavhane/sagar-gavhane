import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Button from "./../Button"

const Post = ({ heading, date, description, slug, cover }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     placeholderImage: file(
  //       relativePath: { eq: "hello-world/assets/cover.jpg" }
  //     ) {
  //       childImageSharp {
  //         fluid(maxWidth: 1200) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <div className="post__wrapper">
      <Link to={`/blog/${slug}`}>
        {/* <Img
          className="post__image"
          fluid={data.placeholderImage.childImageSharp.fluid}
          alt={heading}
          loading="lazy"
        /> */}
      </Link>
      <Link to={`/blog/${slug}`}>
        <h2 className="post__heading">{heading}</h2>
      </Link>
      <div className="post__date">{date}</div>
      <p className="post__description">{description}</p>
      <Button>
        <Link to={`/blog/${slug}`}>Read More</Link>
      </Button>
    </div>
  )
}

export default Post
