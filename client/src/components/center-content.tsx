type CenterContentProps = {
  children: React.ReactNode;
};

const CenterContent = ({ children }: CenterContentProps) => {
  return (
    <div className="centerContent h-full flex items-center justify-center">
      <div className="space-y-10">{children}</div>
    </div>
  );
};

export { CenterContent };
