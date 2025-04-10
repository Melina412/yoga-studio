import Logout from '../components/Logout';
const Home = () => {
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
          <Logout />
        </div>
      </main>
    </>
  );
};

export default Home;
