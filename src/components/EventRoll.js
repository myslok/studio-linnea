import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class EventRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const currentDate = new Date()

    return (
      
      <div className="columns is-multiline">
         <div className="tile">
              <h1 className="title">Kommande</h1>
          </div>
        {posts &&
          posts
          .filter(p => {return (new Date(p.node.frontmatter.event_date) >= currentDate)})
          .map(({ node: post }) => renderEvent(post))}
            <div className="tile">
                      <h1 className="title">Tidigare</h1>
          </div>
          {posts &&
          posts
          .filter(p => {return (new Date(p.node.frontmatter.event_date) < currentDate)})
          .map(({ node: post }) => renderEvent(post))}
      </div>
    )
  }
}

function renderEvent(event){
  return (
    <div className="is-parent column is-12" key={event.id}>
      <article
        className={`blog-list-item tile is-child box notification ${
          event.frontmatter.featuredpost ? 'is-featured' : ''
        }`}
      >
        <p>{event.frontmatter.event_date}</p>
        <header>
          
          <p className="post-meta">
            <Link
              className="title has-text-primary is-size-4"
              to={event.fields.slug}
            >
              {event.frontmatter.title}
            </Link>
            <span> &bull; </span>
            <span className="subtitle is-size-5 is-block">
              {event.frontmatter.date}
            </span>
          </p>
        </header>
        <div className="columns">
        <div className="column is-10">
        <p>
          {event.excerpt}
          <br />
          <b>Plats: </b> {event.frontmatter.location}
          <br />
          <ul className="taglist">
              {event.frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <span class="tag is-info is-light">{tag}</span>
                </li>
              ))}
            </ul>
          <Link className="button" to={event.fields.slug}>
            Läs mer →
          </Link>
        </p>
        </div>
        <div className="column is-2">
        {event.frontmatter.featuredimage ? (
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: event.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${event.frontmatter.title}`,
                  width:
                  event.frontmatter.featuredimage.childImageSharp
                      .gatsbyImageData.width,
                  height:
                  event.frontmatter.featuredimage.childImageSharp
                      .gatsbyImageData.height,
                }}
              />
            </div>
          ) : null}
          </div>
          </div>
           
      </article>
    </div>
  )
}

EventRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    })
  }),
}


export default function EventRoll(){
  return (
    <StaticQuery
      query={graphql`
        query EventRollQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___event_date] }
            filter: { 
              frontmatter: { 
                templateKey: { eq: "event-post" }
              } 
            }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  event_date(formatString: "MMMM DD, YYYY")
                  location
                  tags
                  
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <EventRollTemplate data={data} count={count} />}
    />
  );
}
