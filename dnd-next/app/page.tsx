// import { GetStaticProps } from "next";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react'

import { Hero } from "@/components/Hero";
import { SEO } from "@/components/Seo";
import { PostBlock } from "@/components/PostBlock";
import { getPosts } from "@/lib/service";

async function getData() {
  // replace the url with whatever the name of your site is. just keep the /wp-json/wp etc etc
  const res = await fetch('http://localhost/dnd-next/wp-json/wp/v2/posts')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
   
    // return <h3>Nothing to fetch</h3>
  }
  else{
    // data.then(values => {
    //   console.log(values)
    // })
  }
  return res.json()
}

export default async function HomePage() {
  const data = await getData()

  return (
    <>
      <SEO
        title="Welcome to Jeffrey's Blog"
        description="Access all tech content and beyond"
      />
      <Hero />
      
      <div className="container mx-auto py-8">
        <h3 className="text-xl mx-auto my-6 px-16">All my posts ({data.length})</h3> {/* you can delete this line i just wanted to
        check how many my posts are hehe*/}
        <div className="container mx-auto my-6 px-32 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((value: { [x: string]: { [x: string]: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined } }) => {
            const featuredImageId = data.featured_media;

              return (
                <a
                  href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    {value['title']['rendered']}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>

                  {/* images still don't work */}
                  <img> 
                    {value['featured_media']['rendered']}
                  </img>
                  
                  <p className={`m-0  text-sm opacity-50`}>
                    {value['content']['rendered']}
                  </p>
                </a>
              )     
            })     
            }
        </div>
      </div>
      
    </>
  );
}

/*export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts(100); // retrieve first 100 posts

  return {
    props: {
      posts,
    },
    revalidate: 3600,
  };
};*/
