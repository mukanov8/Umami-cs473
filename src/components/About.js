import React, { useEffect, useState } from 'react'
// import Page from 'material-ui-shell/lib/containers/Page'
// import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'

const About =()=> {
  const [source, setSource] = useState(null)
  // https://raw.githubusercontent.com/TarikHuber/react-most-wanted/master/README.md
  const loadData = async () => {
    const data = await fetch(
      'https://raw.githubusercontent.com/mukanov8/umami-cs473/main/README.md'
    )
    const text = await data.text()
    setSource(text)
  }

  useEffect(() => {
    loadData()
  }, [])

  // return (
  //   <Page
  //     pageTitle={intl.formatMessage({ id: 'about', defaultMessage: 'About' })}
  //   >
  //     <Scrollbar>
  //       <div style={{ backgroundColor: 'white', padding: 12 }}>
  //         {source && (
  //           <ReactMarkdown
  //             className="markdown-body"
  //             source={source}
  //             escapeHtml
  //           />
  //         )}
  //       </div>
  //     </Scrollbar>
  //   </Page>
  // )
  return(
    <div style={{ backgroundColor: 'white', padding: 12 }}>
          {source && (
            <ReactMarkdown
              className="markdown-body"
              source={source}
              escapeHtml
            />
          )}
    </div>
  )
}

export default About