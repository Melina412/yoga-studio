import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <section>
          <div>
            <h1
              className='text-6xl text-pink-500 text-center
            '>
              Landingpage Yoga Studio
            </h1>
          </div>
          <div className='flex justify-center flex-col items-center m-8'>
            <h2>ein Bild</h2>
            <div className=''>
              <img src='https://picsum.photos/id/237/600/400' alt='test image' />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
