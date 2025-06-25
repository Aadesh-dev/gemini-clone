import React from "react";

const OptionsIcon = ({
  width,
  height,
  fontSize,
  fill,
}: {
  width: string;
  height: string;
  fontSize: number;
  fill: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={width}
      viewBox="0 -960 960 960"
      width={height}
      fill={fill}
      fontSize={fontSize}
    >
      <path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
    </svg>
  );
};

export default OptionsIcon;
