import CustomDropdown from 'src/components/CustimDropdown';
import { useNavigate } from 'react-router-dom';
import { usePathName } from 'src/router/hooks';
const Header = () => {
  const navigate = useNavigate();
  const pathname = usePathName();
  let title = 'Добро пожаловать';

  if (pathname.includes('posts')) {
    title = 'Мои объявления';
  } else if (pathname.includes('statistics')) {
    title = 'Статистика';
  }
  return (
    <div className="flex  ml-[250px] justify-between w-[calc(100vw-255px)] border-b  p-7">
      <h2 className="text-text text-[24px] font-[600]">{title}</h2>

      <div className="flex gap-5 items-center">
        <button
          onClick={() => navigate('/dashboard/agency/notifications')}
          className="p-3 rounded-[10px] bg-[#EDF2F6] text-text "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bell-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
          </svg>
        </button>

        <CustomDropdown />
      </div>
    </div>
  );
};

export default Header;
