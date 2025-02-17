interface componentProps {
  className: string;
}

export default function BaseIconNav({ className }: componentProps) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
      <path d='M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z'></path>
    </svg>
  );
}
