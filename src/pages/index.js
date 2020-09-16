import React, { useEffect, useRef } from "react"
import { annotate, annotationGroup } from "rough-notation"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import ExternalLink from "../components/ExternalLink"
import Header from "./../components/Header"
import dateDiffInDays from "./../utils/dateDiffInDays"

const IndexPage = () => {
  const layoutRef = useRef(null)

  const careerStartDate = new Date(2016, 7, 1)
  const currentDate = new Date()
  const days = dateDiffInDays(careerStartDate, currentDate)
  const fd = parseFloat(days / 365).toFixed(0)

  useEffect(() => {
    const agGroup = []

    const annotateWithUnderline = Array.from(
      layoutRef.current.querySelectorAll("span.annotate--underline")
    ).map(el =>
      annotate(el, {
        type: "underline",
        color: "#1e1e3f",
      })
    )
    agGroup.push(...annotateWithUnderline)

    const annotatedLinks = Array.from(
      layoutRef.current.querySelectorAll("a.annotate--underline")
    ).map(el =>
      annotate(el, {
        type: "underline",
        color: "#4d21fc",
      })
    )

    agGroup.push(...annotatedLinks)

    const thanksElement = layoutRef.current.querySelector(
      ".annotate--underline__thanks"
    )
    agGroup.push(
      annotate(thanksElement, {
        type: "underline",
        color: "#1e1e3f",
      })
    )

    annotationGroup(agGroup).show()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Header />
      <div className="layout__bio" ref={layoutRef}>
        <h1>Hello</h1>
        <p>
          My name is <span className="annotate--underline">Sagar Gavhane</span>.
        </p>
        <p>
          Passionate software engineer with{" "}
          <span className="annotate--underline">{fd}+ years </span> of
          experience in building products for numerous domains like fin-tech,
          real estate, video streaming, retail, and now{" "}
          <span className="annotate--underline">e-commerce</span>.
        </p>
        <p>
          I’m currently{" "}
          <span className="annotate--underline">available for work</span>, you
          can take a look at{" "}
          <ExternalLink
            href="https://github.com/sagar-gavhane/sagar-gavhane/blob/master/Resume.pdf"
            className="annotate--underline"
          >
            my resume
          </ExternalLink>
          .
        </p>
        <p>
          I have an old blog which I no longer actively update - you probably
          want to follow me on{" "}
          <ExternalLink
            href="https://twitter.com/sagar_codes"
            className="annotate--underline"
          >
            Twitter
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://medium.com/@sagar_gavhane"
            className="annotate--underline"
          >
            Medium
          </ExternalLink>
          , and{" "}
          <ExternalLink
            href="https://dev.to/sagar"
            className="annotate--underline"
          >
            Dev
          </ExternalLink>{" "}
          for more up-to-date content.
        </p>
        <p>
          Most of my work is open source and publicly available on{" "}
          <ExternalLink
            href="https://github.com/sagar-gavhane"
            className="annotate--underline"
          >
            GitHub
          </ExternalLink>
          .
        </p>
        <p>
          I spend my time Tweeting, taking photographs, making art & music, and
          writing code. I also write about design, courage, and lack thereof.
        </p>
        <p>
          <span className="annotate--underline__thanks">Thank You </span>
          <span role="img" aria-label="smile">
            😊
          </span>
        </p>
      </div>
    </Layout>
  )
}

export default IndexPage
