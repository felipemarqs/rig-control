interface HeaderProps {
  title: string;
  subtitle?: string;
}
export const Header = ({title, subtitle}: HeaderProps) => {
  return (
    <div className="m-4">
      <h1 className="text-xl font-bold text-primary-500">{title}</h1>
      <h2 className="text-lg text-secondary-500">{subtitle}</h2>
    </div>
  );
};
