import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="white"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
  </svg>
);

export default SvgComponent;
