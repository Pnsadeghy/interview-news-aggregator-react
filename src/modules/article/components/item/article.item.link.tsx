import type ArticleItemInterface from "@/modules/article/interfaces/article.item.interface"
import React from "react";

interface componentProps {
    href?: string;
    children?: React.ReactNode;
}

export default function ArticleItemLink({href, children}: componentProps) {
    const className = 'block text-sm py-0.5 px-1 bg-gray-400 text-white mt-1 rounded';

    return (
        <div>
            {href
                ? (<a target="_blank" href={href} className={className + ' hover:bg-gray-500 transition'} >{children}</a>)
                : (<span className={className}>{children}</span>)}
        </div>
    )
}