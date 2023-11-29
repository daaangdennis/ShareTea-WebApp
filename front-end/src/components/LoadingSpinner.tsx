const LoadingSpinner = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={`d-flex align-items-center ${className}`} style={style}>
      <strong>Loading...</strong>
      <div
        className="spinner-border ml-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
