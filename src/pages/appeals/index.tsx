import { graphql } from "gatsby"
import React, { Fragment } from "react"
import cx from "classnames"
import { Mdx } from "../../../generated/graphql"
import { ComponentQuery } from "../../../typings"
import { Markdown } from "../../components/Markdown"
import { SEO } from "../../components/SEO"
import { PageContent } from "../../components/PageContent"
import { HeaderBarebone } from "../../components/HeaderBarebone"
import { buildToc } from "../../utils"

function AppealsPage({ data }: ComponentQuery<{ md: Mdx }>) {
    const { md } = data

    const toc = buildToc(md.headings!)


    return (
        <Fragment>
            <SEO title="Appeals" />
            <HeaderBarebone
                title="Appeal to TPH"
                className={cx({ shifted: toc.length })}
            />

            <PageContent content={<Markdown content={md.body!} />} toc={toc} />
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