import { graphql, navigate } from "gatsby"
import React, { Fragment, useEffect } from "react"
import { Mdx } from "../../../generated/graphql"
import { ComponentQuery } from "../../../typings"
import { Markdown } from "../../components/Markdown"
import { SEO } from "../../components/SEO"
import { PageContent } from "../../components/PageContent"
import { HeaderBarebone } from "../../components/HeaderBarebone"
import { loggedIn } from "../../utils/appeals"

function AppealsInfoPage({ data }: ComponentQuery<{ md: Mdx }>) {
  const { md } = data

  useEffect(() => {
    if (!loggedIn()) {
      navigate("/appeals")
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
  query AppealsInfo {
    md: mdx(frontmatter: { path: { eq: "/appeals/info" } }) {
      body
      headings {
        depth
        value
      }
    }
  }
`

export default AppealsInfoPage
