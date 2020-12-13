import React from 'react'
// import { useEffect, useState, useCallback, Suspense, useRef } from 'react';
// import { useColorMode } from 'theme-ui';
import { graphql } from "gatsby"
import { Layout } from './../components/layout/layout'
import './../styles/code-style.scss'
import { Comment } from './../components/comment/comment'
import { TOC } from './../components/toc/toc'
import { TagList } from './../components/tags/tags'

import styled from 'styled-components';
import './post.scss';


const PostContainer = styled.div`
  margin-top: 1rem;

  h1, h2{
    margin-top: 4rem;
    margin-bottom: 1rem;
  }
  h3{
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  h3, h4, h5, h6{
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  table{
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    overflow-x: auto;
  }
`



const DateContainer = styled.div`
  display: inline-block;
  margin-right: 1rem;
  opacity: .8;
`


const MetaWrapper = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #8383837e;
  font-size: .9rem;
  font-weight: 400;
`



export default function PostTemplate({ data }) {

  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, tableOfContents } = markdownRemark;
  return (
    <Layout siteData={data.site}>
      <main>
        <div className='toc-fullsize'>
          <TOC toc={tableOfContents} />
        </div>

        <section id="content">
          <article>
            <PostContainer>
              <div className="blog-post">
                
                <MetaWrapper>
                  <h1>{frontmatter.title}</h1>
                  <DateContainer>{frontmatter.date}</DateContainer>
                  <TagList tags={frontmatter.tags} />
                </MetaWrapper>

                <div className='toc-smallsize'>
                  <TOC toc={tableOfContents}/>
                </div>

                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

              </div>
            </PostContainer>
          </article>
          <div>

            <Comment></Comment>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        tags
      }
      fields{
        slug
      }
      tableOfContents(maxDepth: 3)
    }
  }
`