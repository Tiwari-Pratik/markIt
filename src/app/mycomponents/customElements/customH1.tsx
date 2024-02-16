const CustomH1 = ({ children, ...rest }) => {
  return (
    <h1 {...rest} className="my-2 py-2 text-3xl font-sans font-bold">
      {children}
    </h1>
  );
};

export default CustomH1;
