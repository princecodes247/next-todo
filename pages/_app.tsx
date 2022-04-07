import '../styles/globals.css'
import type { AppProps } from 'next/app'


export async function getStaticProps() {
  return {
      props: {
        

      }
  }
}



function NextTodo({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default NextTodo;
