interface HeaderProps {
  formattedDate: string;
  completed: number;
  total: number;
}

export default function Header({ formattedDate, completed, total }: HeaderProps) {
  return (
    <div className="top">
      <div className="top-left">
        <p>Today</p>
        <p>{formattedDate}</p>
      </div>
      <p>{completed} of {total}</p>
    </div>
  );
}
