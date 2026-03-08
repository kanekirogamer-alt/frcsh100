interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
  return (
    <div className="w-full px-1">
      {label && (
        <div className="flex justify-between items-center mb-1.5 text-sm text-muted-foreground">
          <span>{label}</span>
          <span className="font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
