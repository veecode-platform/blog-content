"use client"

import React from 'react'
import NextImage from "next/image";
import Seo from './Seo'
import AvatarList from './AvatarList'
import dateFormatter from '@/utils/dateFormatter'
import readTime from '@/utils/readTime'
import { DocumentRenderer } from '@keystatic/core/renderer';
import InlineCTA from './InlineCTA';
import { DocumentElement } from '@keystatic/core';
import Divider from './Divider';
import Banner from './Banner';
import YouTubeEmbed from './YouTubeEmbed';
import TweetEmbed from './TweetEmbed';
import LoopingVideo from './LoopingVideo';
import Image from './Image';
import Testimonial from './Testimonial';
import Button from './Button';
import { IAuthor, IPost } from '@/@types/interfaces';

interface PostProps {
    post: IPost,
    slug: string,
    authors: IAuthor[],
    postElement: DocumentElement[]
}

export const PostComponent = ({post, slug, authors, postElement}:PostProps) => {

  const formattedNames = post.authors.join("and ", );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10">
    <Seo
     title={post.title}
     description={post.summary}
     imagePath={
       post.coverImage
         ? `/images/posts/${slug}/${post.coverImage}`
         : "/images/seo-image.png"
     }
   />
   <div className="flex gap-3 items-center flex-wrap">
     {authors && <AvatarList authors={authors} />}
     <p className="font-semibold text-gray-300">{formattedNames}</p>
   </div>

   <div className="mt-4 flex justify-between">
     <span className="flex gap-1 text-gray-600">
       {post.publishedDate && (
         <p className="">
           {dateFormatter(post.publishedDate, "do MMM yyyy")}
         </p>
       )}
       {post.wordCount && post.wordCount !== 0 ? (
         <p className="">· {readTime(post.wordCount)}</p>
       ) : null}
     </span>
   </div>

   <div className="mt-8 prose max-w-none">
     <h1 className="mt-4 text-gray-200">{post.title}</h1>
     <p className="text-lg text-gray-300">{post.summary}</p>
     {(post && post.coverImage) && (
       <div className="mt-10 not-prose">
         <NextImage
           width={1536}
           height={800}
           src={`/images/posts/${slug}/${post.coverImage}`}
           alt={`${post.title} Cover image`}
           className="w-full rounded-md"
         />
       </div>
     )}
     <div className="mt-10 text-gray-200">
       <DocumentRenderer
         document={postElement}
         componentBlocks={{
           inlineCta: (props) => (
             <InlineCTA
               title={props.title}
               summary={props.summary}
               linkButton={{
                 externalLink: props.externalLink,
                 href: props.href,
                 label: props.linkLabel,
               }}
             />
           ),
           divider: (props) => <Divider noIcon={props.noIcon} />,
           banner: (props) => (
             <Banner
               heading={props.heading}
               bodyText={props.bodyText}
               externalLink={{
                 href: props.externalLinkHref,
                 label: props.externalLinkLabel,
               }}
             />
           ),
           youtubeEmbed: (props) => (
             <YouTubeEmbed youtubeLink={props.youtubeLink} />
           ),
           tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,
           loopingVideo: (props) => (
             <LoopingVideo src={props.src} caption={props.caption} />
           ),
           image: (props) => (
             <Image
               src={props.src}
               alt={props.alt}
               caption={props.caption}
             />
           ),
           testimonial: (props) => (
             <Testimonial
               quote={props.quote}
               author={props.author}
               workplaceOrSocial={props.workplaceOrSocial}
               socialLink={props.socialLink}
             />
           ),
         }}
       />
     </div>
   </div>
   <div className="w-full flex justify-end mt-20 my-10">
     <Button href="/" externalLink={false} label="back to home" />
   </div> 
 </div>
  )
}

export default PostComponent