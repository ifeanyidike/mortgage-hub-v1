import clsx from "clsx";

import { KeenIcon } from "@/app/dashboard-components";
import { toAbsoluteUrl } from "@/app/utils/Assets";

interface IAvatarProps {
  image?: string;
  fallback?: string;
  icon?: string;
  iconClass?: string;
  badgeClass?: string;
  className?: string;
  imageClass?: string;
  useAbsolute?: boolean;
}

const CommonAvatar = ({
  image,
  fallback,
  icon,
  iconClass,
  badgeClass,
  className,
  imageClass,
  useAbsolute = true,
}: IAvatarProps) => {
  return (
    <div className={clsx(className && className)}>
      {image && (
        <img
          src={useAbsolute ? toAbsoluteUrl(`/media/avatars/${image}`) : image}
          className={clsx(imageClass && imageClass)}
          alt=""
        />
      )}
      {!image && fallback && fallback}
      {!image && !fallback && icon && (
        <KeenIcon icon={icon} className={clsx(iconClass && iconClass)} />
      )}
      {badgeClass && <div className={clsx(badgeClass && badgeClass)}></div>}
    </div>
  );
};

export { CommonAvatar, type IAvatarProps };
