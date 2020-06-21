import React from "react"

const ExternalLink = props => {
  return (
    <a
      href={props.href}
      className={props.className}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  )
}

export default ExternalLink
