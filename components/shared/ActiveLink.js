import { useRouter } from "next/router";
import React, { Children } from "react";
import Link from "next/link";

const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();
  //make you we only provide ONE child
  const child = Children.only(children);
  //extract classname from child
  let className = child.props.className || "";

  if (router.asPath === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }

  delete props.activeClassName;
  // only deconstructs href (active classname is removed before on line above)
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
