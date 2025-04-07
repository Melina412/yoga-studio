import { useAuthStore } from '../store/store';
const Home = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  return (
    <>
      <main>
        <section>
          <div>
            <h1
              className='text-6xl text-pink-500 text-center
            '>
              Landingpage Yoga Studio
            </h1>
          </div>
        </section>
        <div className='flex justify-center'>
          <button onClick={() => setLogin(false)} className='btn btn-neutral'>
            Logout
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
