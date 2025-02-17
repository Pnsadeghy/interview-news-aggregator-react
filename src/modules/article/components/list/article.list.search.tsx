"use client";

import React, { useEffect, useRef } from "react";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

interface componentProps {
    onSearch: (value: string) => void;
}

export default function ArticleListSearch({ onSearch }: componentProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const subscription = fromEvent(inputRef.current, "input")
            .pipe(
                map((event: Event) => (event.target as HTMLInputElement).value),
                debounceTime(500)
            )
            .subscribe((value) => {
                onSearch(value);
            });

        return () => {
            subscription.unsubscribe();
        };
    }, [onSearch]);

  return (
      <div className="mb-4">
          <input
              ref={inputRef}
              type="text"
              className="h-8 bg-white rounded ring-1 ring-gray-200 w-full px-2 text-sm"
              placeholder="Search..."
          />
      </div>
  );
}
