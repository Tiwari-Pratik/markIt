const CustomH4 = ({ children, ...rest }) => {
  return (
    <h1 {...rest} className="my-2 py-2 text-lg font-sans font-bold">
      {children}
    </h1>
  );
};

export default CustomH4;
