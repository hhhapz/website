import { graphql, navigate } from "gatsby"
import React, { Fragment, useEffect } from "react"
import { Mdx } from "../../../generated/graphql"
import { ComponentQuery } from "../../../typings"
import { Markdown } from "../../components/Markdown"
import { SEO } from "../../components/SEO"
import { PageContent } from "../../components/PageContent"
import { HeaderBarebone } from "../../components/HeaderBarebone"
import { loggedIn } from "../../utils/appeals"

function AppealsPage({ data }: ComponentQuery<{ md: Mdx }>) {
  const { md } = data

  useEffect(() => {
    if (loggedIn()) {
      navigate("/appeals/info")
    }
  }, [])

  return (
    <Fragment>
      <SEO title="Appeals" />
      <HeaderBarebone
        title="Appeal to TPH"
      />

      <PageContent content={<Markdown content={md.body!} />} />
    </Fragment>
  )
}

export const query = graphql`
  query AppealsPage {
    md: mdx(frontmatter: { path: { eq: "/appeals" } }) {
      body
      headings {
        depth
        value
      }
    }
  }
`

export default AppealsPage
