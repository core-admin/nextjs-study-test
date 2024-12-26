'use client';

interface RefreshButtonProps {
  onRefresh: () => void;
}

export const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
  const onClick = () => {
    onRefresh();
  };

  return (
    <button className="bg-blue-500 text-white p-2 rounded-md" onClick={onClick}>
      重新获取数据
    </button>
  );
};
