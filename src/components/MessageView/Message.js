import React from "react";
import { Badge } from "react-bootstrap";

const Message = ({
  content = "",
  fromName = "",
  variant = "primary",
  noRadius = "",
  ...props
}) => {
  const [radiusStyle, setRadiusStyle] = React.useState({});

  React.useEffect(() => {
    console.log(noRadius);
    switch (noRadius) {
      case "top-left":
        setRadiusStyle({
          borderRadius: "5px 20px 20px 20px",
        });
        break;

      case "top-right":
        setRadiusStyle({
          borderRadius: "20px 5px 20px 20px",
        });
        break;

      case "bottom-right":
        setRadiusStyle({
          borderRadius: "20px 20px 5px 20px",
        });
        break;

      case "bottom-left":
        setRadiusStyle({
          borderRadius: "20px 20px 20px 5px",
        });
        break;

      case "right":
        setRadiusStyle({
          borderRadius: "20px 5px 5px 20px",
        });
        break;

      case "left":
        setRadiusStyle({
          borderRadius: "5px 20px 20px 5px",
        });
        break;

      case "last":
        setRadiusStyle({
          borderRadius: "5px 5px 20px 20px",
        });
        break;

      default:
        setRadiusStyle({
          borderRadius: "20px 20px 20px 20px",
        });
        break;
    }
  }, [noRadius]);

  return (
    <h5 {...props}>
      {fromName && (
        <span
          className="text-muted font-weight-normal mt-1 ml-2 mb-1"
          style={{ fontSize: "13px" }}
        >
          {fromName}
        </span>
      )}
      <Badge
        style={{ padding: ".7rem .7rem", ...radiusStyle }}
        pill
        className="font-weight-normal"
        variant={variant}
      >
        {content}
      </Badge>
    </h5>
  );
};

export default React.memo(Message);
