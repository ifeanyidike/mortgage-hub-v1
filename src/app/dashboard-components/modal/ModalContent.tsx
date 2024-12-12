import { forwardRef, ReactNode } from "react";

interface IModalContentProps {
  className?: string;
  children: ReactNode;
  tabIndex?: number;
  style?: React.CSSProperties; // Accept inline styles as a prop
}

// Forwarding ref to ensure this component can hold a ref
const ModalContent = forwardRef<HTMLDivElement, IModalContentProps>(
  ({ className, children, style, tabIndex = -1 }, ref) => {
    return (
      <div
        ref={ref}
        tabIndex={tabIndex}
        className={`modal-content ${className}`}
        style={{ ...style }} // Apply inline styles
      >
        {children}
      </div>
    );
  }
);

export { ModalContent };
