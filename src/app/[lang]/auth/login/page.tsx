import { ProvidersContainer } from '@/components/auth';

export const revalidate = 0;

const LoginPage = async () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-2/6">
        <ProvidersContainer />
      </div>
    </div>
  );
};

export default LoginPage;
