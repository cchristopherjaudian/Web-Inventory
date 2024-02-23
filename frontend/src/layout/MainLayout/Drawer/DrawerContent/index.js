import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useSelector } from 'react-redux';
const DrawerContent = () => {
  const isadmin = useSelector((state) => state.token.isadmin.isadmin);
  return isadmin ? (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Navigation />
    </SimpleBar>
  ) : (
    <></>
  );
};

export default DrawerContent;
