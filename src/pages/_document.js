import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap'
          rel='stylesheet'
        />
      </Head>
      < body >
        <Main />
        <NextScript />
      </body >
    </Html >
  }
}
