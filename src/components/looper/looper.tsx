interface Props {
  children: React.ReactNode;
  times: number;
}

export const Looper = ({ children, times }: Props) => {
  const keys = [...Array(times).keys()];

  return (
    <div>
      {keys.map((item) => (
        <div key={item}>{children}</div>
      ))}
    </div>
  );
};
