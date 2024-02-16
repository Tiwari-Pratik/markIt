const CustomP = ({ children, ...rest }) => {
  return (
    <p {...rest} className="my-2 py-2 text-sm font-mono">
      {children}
    </p>
  );
};

export default CustomP;
