import CustomDropdown from 'src/components/CustomDropdown';
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

  const options = [
    {
      value: 'option1',
      label: 'Abduvasit',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
      ),
    },
    {
      value: 'option2',
      label: 'Option 2',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414 1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      value: 'option3',
      label: 'Option 3',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414 1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

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

        <CustomDropdown options={options} />
      </div>
    </div>
  );
};

export default Header;
