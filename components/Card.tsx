"use client"

import { cx } from '@/utils/cx';
import maybeTruncateTextBlock from '@/utils/maybeTruncateTextBlock';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import LazyLoad from 'react-lazyload';

const Card = ({ image, title, summary, link, externalLink }: any) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <LazyLoad height={200} offset={100} once>
        <li className={cx(`group bg-darkcustom-400 p-3 rounded ${!loaded && 'opacity-placeholder'}`, externalLink && "external-link")}>
          <Link
            href={link}
            target={externalLink ? "_blank" : "_self"}
            className="no-underline"
          >
            <div>
              <div className="relative w-full h-48">
                <Image
                  src={image}
                  alt=""
                  width={768}
                  height={400}
                  className="rounded-sm object-cover w-full h-full"
                  onLoad={() => setLoaded(true)} 
                />
              </div>
              <div className="md:min-h-[200px]">
                <h3 className="mt-4 text-xl font-medium group-hover:underline text-platform-400">
                  {title}
                </h3>
                {summary && (
                  <p className="mt-3 text-gray-400 my-2 line-clamp-3">
                    {maybeTruncateTextBlock(summary, 100)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </li>
      </LazyLoad>
    );
}

export default Card